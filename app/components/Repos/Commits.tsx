import { CommitList } from "~/types";
import styles from './Repo.module.css';
import { useCallback, useEffect, useState } from "react";

interface CommmitProps {
	visible: boolean;
	endpoint: string;
}
export default function Commits({ visible, endpoint }: CommmitProps) {
  const [commits, setCommmits] = useState([] as CommitList);
  const fetchCommitData = useCallback(async () => {
    const fetchResult = await fetch(endpoint);
    if (fetchResult.ok) {
      const data = await fetchResult.json();
      setCommmits(data);
    }
  }, [endpoint]);
  useEffect(() => {
    if (visible && !commits.length) {
      fetchCommitData();
    }
  }, [visible, commits, fetchCommitData]);
  return (
    <section
      style={{
        height: visible ? 'auto' : '0',
      }}
      className={styles['commit-wrapper']} 
    >
      <h3> Recent commit history: </h3>
      {commits.length ? (
        <ol>
          {commits.map((commit) => {
            return (
              <li key={commit.sha}>
                <p className={styles['author-line']}>
                  <b>Author:</b>
                  {commit.commit.author?.name || ''}
                  <img
                    className={styles.avatar}
                    src={commit.committer?.avatar_url}
                    alt={`${commit.commit.author?.name || ''} avatar`}
                    width="28px"
                  />
                </p>
                <p>
                  <b>Message:</b> {commit.commit.message}
                </p>
                <a href={commit.html_url}>Get more details</a>
              </li>
            );
          })}
        </ol>
      ) : 'LOADING...'}
      
    </section>
  );
}
