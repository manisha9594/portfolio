import data from './data/portfolio.json' with { type: 'json' };

const CACHE_MS = 60 * 60 * 1000; // GitHub allows 60 unauthenticated requests/hour
let repoCache = { at: 0, repos: data.repos };

// The curated list in portfolio.json decides which repos appear and how they are
// described; GitHub only refreshes live numbers such as star counts.
async function getRepos() {
  if (Date.now() - repoCache.at < CACHE_MS) return repoCache.repos;
  let repos = data.repos;
  try {
    const res = await fetch(`https://api.github.com/users/${data.profile.githubUser}/repos?per_page=100`, {
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-react' },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`GitHub responded ${res.status}`);
    const live = new Map((await res.json()).map((repo) => [repo.name.toLowerCase(), repo]));
    repos = data.repos.map((repo) => {
      const match = live.get(repo.name.toLowerCase());
      return match ? { ...repo, stars: match.stargazers_count } : repo;
    });
  } catch (err) {
    console.warn(`Using saved repo data: ${err.message}`);
  }
  repoCache = { at: Date.now(), repos };
  return repos;
}

export async function getPortfolio() {
  return { ...data, repos: await getRepos() };
}
