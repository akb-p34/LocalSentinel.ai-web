import useSWR from 'swr';
import type {
  GitHubRepository,
  GitHubRelease,
  RepoStats,
  UseGitHubStatsReturn,
  GitHubApiError
} from '../types/github';

// Configuration from environment variables
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const GITHUB_OWNER = import.meta.env.VITE_GITHUB_OWNER || 'HarrisHamid';
const GITHUB_REPO = import.meta.env.VITE_GITHUB_REPO || 'LocalSentinel.ai';
const API_BASE_URL = import.meta.env.VITE_GITHUB_API_BASE_URL || 'https://api.github.com';
const UPDATE_INTERVAL = parseInt(import.meta.env.VITE_UPDATE_INTERVAL_MS || '300000', 10);

/**
 * Fetcher function for SWR that handles GitHub API requests
 */
async function fetcher(url: string): Promise<any> {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'LocalSentinel-Website'
  };

  // Add authentication if token is provided
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    const error: GitHubApiError = {
      message: `GitHub API error: ${response.status} ${response.statusText}`,
      status: response.status
    };

    try {
      const errorBody = await response.json();
      error.message = errorBody.message || error.message;
      error.documentation_url = errorBody.documentation_url;
      error.errors = errorBody.errors;
    } catch {
      // If we can't parse the error body, use the default message
    }

    throw error;
  }

  return response.json();
}

/**
 * Fetches repository information from GitHub API
 */
async function fetchRepoStats(): Promise<RepoStats> {
  const repoUrl = `${API_BASE_URL}/repos/${GITHUB_OWNER}/${GITHUB_REPO}`;
  const releasesUrl = `${API_BASE_URL}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases/latest`;

  try {
    // Fetch repository data and latest release concurrently
    const [repoData, releaseData] = await Promise.allSettled([
      fetcher(repoUrl) as Promise<GitHubRepository>,
      fetcher(releasesUrl) as Promise<GitHubRelease>
    ]);

    // Extract repository stats
    let stars = 0;
    let forks = 0;

    if (repoData.status === 'fulfilled') {
      stars = repoData.value.stargazers_count;
      forks = repoData.value.forks_count;
    } else {
      console.warn('Failed to fetch repository data:', repoData.reason);
    }

    // Calculate total downloads from release assets
    let downloads = 0;

    if (releaseData.status === 'fulfilled') {
      downloads = releaseData.value.assets.reduce(
        (total, asset) => total + asset.download_count,
        0
      );
    } else {
      console.warn('Failed to fetch release data:', releaseData.reason);
      // If no releases exist, this is expected, so we don't throw an error
    }

    return {
      stars,
      forks,
      downloads,
      lastUpdated: new Date().toISOString()
    };

  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    throw error;
  }
}

/**
 * Custom hook to fetch and manage GitHub repository statistics
 *
 * Features:
 * - Automatic revalidation every 5 minutes (configurable)
 * - Background updates when tab becomes active
 * - Intelligent caching and error handling
 * - Loading states and error reporting
 *
 * @returns Object containing stats, loading state, error state, and mutate function
 */
export function useGitHubStats(): UseGitHubStatsReturn {
  const {
    data: stats,
    error,
    isLoading,
    mutate
  } = useSWR<RepoStats, GitHubApiError>(
    'github-stats',
    fetchRepoStats,
    {
      // Revalidate every 5 minutes (or configured interval)
      refreshInterval: UPDATE_INTERVAL,

      // Revalidate when window gains focus
      revalidateOnFocus: true,

      // Revalidate when network reconnects
      revalidateOnReconnect: true,

      // Don't revalidate on mount if data exists (use cache)
      revalidateOnMount: true,

      // Retry on error with exponential backoff
      errorRetryCount: 3,
      errorRetryInterval: 5000,

      // Show cached data while revalidating in background
      keepPreviousData: true,

      // Custom error handling
      onError: (error: GitHubApiError) => {
        console.error('GitHub Stats API Error:', error);

        // Don't spam console for rate limit errors
        if (error.status !== 403) {
          console.error('Full error details:', error);
        }
      },

      // Success callback
      onSuccess: (data: RepoStats) => {
        console.log('GitHub stats updated:', data);
      }
    }
  );

  return {
    stats: stats || null,
    isLoading,
    error: error || null,
    mutate
  };
}

// Fallback stats for when API fails completely
export const FALLBACK_STATS: RepoStats = {
  stars: 4,
  forks: 1,
  downloads: 2,
  lastUpdated: new Date().toISOString()
};