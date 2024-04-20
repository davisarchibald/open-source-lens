import { type FormEvent } from "react";
import styles from './Repo.module.css';

interface RepoSearchProps {
	handleSubmit: (event: FormEvent) => Promise<void>;
}

export default function RepoSearch({ handleSubmit }: RepoSearchProps) {
  return (
    <form className={styles['org-form']} method="GET" action="/api/organizations" onSubmit={handleSubmit}>
      <label className={styles['org-input-label']}>
        <input
          className={styles['org-input']}
          type="text"
          id="org-search"
          name="organization"
          placeholder="Organization"
          required
        />
        <button>Search</button>
      </label>
    </form>
  );
}
