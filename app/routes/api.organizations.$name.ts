import { type LoaderFunctionArgs } from "@remix-run/node";
import octokit from "~/.server/github-client";
import catchify from "~/utils/catchify";
import sortByForkCount from "~/utils/sort-by-fork-count";

export const loader = async ({ params}: LoaderFunctionArgs) => {
  const { name } = params;

  if (!name) {
    return new Response('Missing organization name', {
      status: 404,
    });
  }

  const [error, result] = await catchify(octokit.request(`GET /orgs/{org}/repos`, {
    org: name,
    per_page: 30,
    type: "public",
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  }));
  if (error || (result && result?.status > 299)) {
    console.log(error || `Request to Github came back with a bad status: ${result?.status}`);
    return new Response('Something went gone wrong', {
      status:500,
    });
  }

  const list = result ?  sortByForkCount(result.data): {};
  const responseData = result ? {
    name,
    list,
  } : {};
  return new Response(JSON.stringify(responseData), {
    status: 200,
    headers: new Headers({
      'content-type': 'application/json',
    }),
  });
};
