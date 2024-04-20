import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { FormEvent, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
// components
import Repos from "~/components/Repos/RepoList";
import RepoSearch from "~/components/Repos/RepoSearch";
// internal types
import { RepoList } from "~/types";
import catchify from "~/utils/catchify";

interface OrgData {
	list: RepoList;
	name: string;
}

export const meta: MetaFunction = () => {
  return [
    { title: "Open Source Lens" },
    { name: "description", content: "Welcome to Open Source Lens" },
    { name: "viewport", content: "width=device-width"},
  ];
};

export const loader = async ({request}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const org = url.searchParams.get('q');
  if (!org) {
    return new Response(undefined, {
      status: 404,
    });
  }
  // fetch api data
  const [error, result] = await catchify(fetch(`${url.origin}/api/organizations/${org}`));
  if (error || !result?.ok) {
    console.log(error || 'Something went wrong with the request');
    return new Response(undefined, {
      status: 500,
    });
  }
  const data = await result.json();
  return json(data);
};

export const formSubmit = async (event: FormEvent, currentOrg: string) => {
  const form = event.currentTarget as HTMLFormElement;
  if (form) {
    const formData = new FormData(form);
    if (!formData.has('organization')) {
      throw new Error('Missing organization!');
    }
    const orgName = formData.get('organization');
    if (orgName === currentOrg) {
      return;
    }
    const [error, request] = await catchify(fetch(`${form.action}/${orgName}`));

    if (error || !request?.ok) {
      throw error || new Error('Something went wrong with the request');
    }
    const data: OrgData = await request.json();
    return data;
  }
};

export default function Index() {
  const data = useLoaderData() as OrgData;
  const [results, setResults] = useState(data.list || []);
  const [currentOrg, setCurrentOrg] = useState(data.name || '');
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const [error, data] = await catchify(formSubmit(event, currentOrg));
    if (error) {
      console.error(error);
      return;
    }
    if (data) {
      setResults(data.list);
      setCurrentOrg(data.name);
    }
  };
  useEffect(() => {
    const input = document.querySelector('#org-search') as HTMLInputElement;
    if (input.value) {
      history.pushState(results, '', `/?q=${input.value}`);
      input.value = '';
    }
  }, [results]);
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1 style={{
        textAlign: 'center',
      }}>Open Source Lens</h1>
      <RepoSearch  handleSubmit={handleSubmit} />
      <Repos results={results} orgName={currentOrg} />
    </main>
  );
}
