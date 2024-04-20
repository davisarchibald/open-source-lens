export interface RepositoryData {
  id: number
  node_id: string
  name: string
  full_name: string
  owner: Owner
  private: boolean
  html_url: string
  description: string | null
  fork: boolean
  url: string
  archive_url: string
  assignees_url: string
  blobs_url: string
  branches_url: string
  collaborators_url: string
  comments_url: string
  commits_url: string
  compare_url: string
  contents_url: string
  contributors_url: string
  deployments_url: string
  downloads_url: string
  events_url: string
  forks_url: string
  git_commits_url: string
  git_refs_url: string
  git_tags_url: string
  git_url?: string
  issue_comment_url: string
  issue_events_url: string
  issues_url: string
  keys_url: string
  labels_url: string
  languages_url: string
  merges_url: string
  milestones_url: string
  notifications_url: string
  pulls_url: string
  releases_url: string
  ssh_url?: string
  stargazers_url: string
  statuses_url: string
  subscribers_url: string
  subscription_url: string
  tags_url: string
  teams_url: string
  trees_url: string
  clone_url?: string
  mirror_url?: string | null
  hooks_url: string
  svn_url?: string
  homepage?: string | null
  language?: string | null
  forks_count?: number
  stargazers_count?: number
  watchers_count?: number
  size?: number
  default_branch?: string
  open_issues_count?: number
  is_template?: boolean
  topics?: string[]
  has_issues?: boolean
  has_projects?: boolean
  has_wiki?: boolean
  has_pages?: boolean
  has_downloads?: boolean
  has_discussions?: boolean
  archived?: boolean
  disabled?: boolean
  visibility?: string
  pushed_at?: string | null
  created_at?: string | null
  updated_at?: string | null
  permissions?: {
    admin?: boolean
    maintain?: boolean
    push?: boolean
    triage?: boolean
    pull?: boolean
    [k: string]: unknown
  }
  role_name?: string
  temp_clone_token?: string
  delete_branch_on_merge?: boolean
  subscribers_count?: number
  network_count?: number
  code_of_conduct?: CodeOfConduct
  license?: {
    key?: string
    name?: string
    spdx_id?: string
    url?: string
    node_id?: string
    [k: string]: unknown
  } | null
  forks?: number
  open_issues?: number
  watchers?: number
  allow_forking?: boolean
  web_commit_signoff_required?: boolean
  security_and_analysis?: {
    advanced_security?: {
      status?: "enabled" | "disabled"
      [k: string]: unknown
    }
    /**
     * Enable or disable Dependabot security updates for the repository.
     */
    dependabot_security_updates?: {
      /**
       * The enablement status of Dependabot security updates for the repository.
       */
      status?: "enabled" | "disabled"
      [k: string]: unknown
    }
    secret_scanning?: {
      status?: "enabled" | "disabled"
      [k: string]: unknown
    }
    secret_scanning_push_protection?: {
      status?: "enabled" | "disabled"
      [k: string]: unknown
    }
    [k: string]: unknown
  } | null
  [k: string]: unknown
}
interface Owner {
  name?: string | null
  email?: string | null
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string | null
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  starred_at?: string
  [k: string]: unknown
}
interface CodeOfConduct {
  key: string
  name: string
  url: string
  body?: string
  html_url: string | null
  [k: string]: unknown
}



export type RepoList = RepositoryData[];

export interface Commit {
  url: string
  sha: string
  node_id: string
  html_url: string
  comments_url: string
  commit: {
    url: string
    author: null | GitUser
    committer: null | GitUser1
    message: string
    comment_count: number
    tree: {
      sha: string
      url: string
      [k: string]: unknown
    }
    verification?: Verification
    [k: string]: unknown
  }
  author: null | GitHubUser
  committer: null | GitHubUser1
  parents: {
    sha: string
    url: string
    html_url?: string
    [k: string]: unknown
  }[]
  stats?: {
    additions?: number
    deletions?: number
    total?: number
    [k: string]: unknown
  }
  files?: DiffEntry[]
  [k: string]: unknown
}
interface GitUser {
  name?: string
  email?: string
  date?: string
  [k: string]: unknown
}
interface GitUser1 {
  name?: string
  email?: string
  date?: string
  [k: string]: unknown
}
interface Verification {
  verified: boolean
  reason: string
  payload: string | null
  signature: string | null
  [k: string]: unknown
}
interface GitHubUser {
  name?: string | null
  email?: string | null
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string | null
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  starred_at?: string
  [k: string]: unknown
}
interface GitHubUser1 {
  name?: string | null
  email?: string | null
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string | null
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  starred_at?: string
  [k: string]: unknown
}
interface DiffEntry {
  sha: string
  filename: string
  status:
    | "added"
    | "removed"
    | "modified"
    | "renamed"
    | "copied"
    | "changed"
    | "unchanged"
  additions: number
  deletions: number
  changes: number
  blob_url: string
  raw_url: string
  contents_url: string
  patch?: string
  previous_filename?: string
  [k: string]: unknown
}

export type CommitList = Commit[]
