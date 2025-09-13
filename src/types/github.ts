// GitHub API Response Types

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
  };
  html_url: string;
  description: string | null;
  fork: boolean;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  size: number;
  default_branch: string;
  open_issues_count: number;
  topics: string[];
  license: {
    key: string;
    name: string;
    spdx_id: string;
    url: string | null;
  } | null;
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

export interface GitHubRelease {
  id: number;
  tag_name: string;
  name: string | null;
  body: string | null;
  draft: boolean;
  prerelease: boolean;
  created_at: string;
  published_at: string | null;
  author: {
    login: string;
    id: number;
    avatar_url: string;
  };
  assets: GitHubReleaseAsset[];
}

export interface GitHubReleaseAsset {
  id: number;
  name: string;
  label: string | null;
  content_type: string;
  size: number;
  download_count: number;
  created_at: string;
  updated_at: string;
  browser_download_url: string;
}

export interface RepoStats {
  stars: number;
  forks: number;
  downloads: number;
  lastUpdated: string;
}

export interface GitHubApiError {
  message: string;
  status: number;
  documentation_url?: string;
  errors?: Array<{
    resource: string;
    field: string;
    code: string;
  }>;
}

export interface UseGitHubStatsReturn {
  stats: RepoStats | null;
  isLoading: boolean;
  error: GitHubApiError | null;
  mutate: () => void;
}