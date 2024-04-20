import { RepoList } from "~/types";

export default function sortByForkCount(list: RepoList) {
  return list.sort((a, b) => {
    const aForksCount = a?.forks_count || 0;
    const bForksCount = b?.forks_count || 0;
    return bForksCount - aForksCount;
  });
}
