import { LoaderFunctionArgs, json } from "react-router";
import octokit from "~/.server/github-client";
import catchify from "~/utils/catchify";

export const loader  = async ({ params }: LoaderFunctionArgs) => {
  const { owner, repo } = params;
  if (owner && repo) {
    const [error, result] = await catchify(octokit.request('GET /repos/{owner}/{repo}/commits', {
      owner,
      repo,
      per_page: 30,
    }));
    if (error || (result && result.status > 299)) {
      console.log(error || `Request to the Github API came back with this status code: ${result?.status}`);
      return new Response('Something went wrong', {
        status: 500,
      });
    }
    return json(result?.data || {});
  }
  return new Response('Missing owner or repo information', {
    status: 404,
  });
};
