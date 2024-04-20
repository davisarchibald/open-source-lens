import {  ReactElement } from "react";
import type { RepoList } from "~/types";
import styles from './Repo.module.css';
import Repo from "./Repo";

interface ResultListProps {
	results: RepoList;
	orgName: string;
}

export default function RepoList({ results, orgName }: ResultListProps): ReactElement | null{
  if (!results || !results.length) {
    return null;
  }
  return (
    <section className={styles['result-list-wrapper']}>
      <h3>{orgName}</h3>
      <ul className={styles['result-list']}>
        {results.map((result) => <Repo key={result.full_name} result={result} />)}
      </ul>
    </section>
  );
  
}
