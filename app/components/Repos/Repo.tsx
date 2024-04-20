import { RepositoryData } from "~/types";
import styles from './Repo.module.css';
import { useState } from "react";
import Commits from "./Commits";

interface ResultProps {
	result: RepositoryData;
}

export default function Result({result}: ResultProps) {
  const [expanded, setExpanded] = useState(false);
  const handleSeeMoreClick = () => {
    setExpanded(!expanded);
  };
  const className = `${styles['see-more']} ${expanded ? styles.expanded : ''}`;
  return (
    <li key={result.full_name} className={styles.item}>
      <section className={styles['repo-info']}>
        <a className={styles['repo-link']} href={result.html_url}>{result.name}</a>
        <p className={styles.description}>{result.description}</p>
        <span className={styles['data-blocks']}>Forks: {result.forks_count} </span>
        <span className={styles['data-blocks']}>Stars: {result.stargazers_count}</span>
      </section>
      <button data-testid="see-more" onClick={handleSeeMoreClick} className={className}>&#94;</button>
      <Commits
        visible={expanded}
        endpoint={`/api/repos/${result.full_name}`}
      />
    </li>
  );
}
