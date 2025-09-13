/**
 * Formats a number for display with appropriate suffixes (k, M, B)
 * @param num The number to format
 * @param decimals Number of decimal places to show (default: 1)
 * @returns Formatted string (e.g., "1.2k", "5.7M", "12")
 */
export function formatNumber(num: number, decimals: number = 1): string {
  if (num === 0) return '0';

  const absNum = Math.abs(num);
  const sign = num < 0 ? '-' : '';

  if (absNum < 1000) {
    return sign + absNum.toString();
  }

  if (absNum < 1000000) {
    const formatted = (absNum / 1000).toFixed(decimals);
    const cleaned = parseFloat(formatted).toString(); // Remove unnecessary trailing zeros
    return sign + cleaned + 'k';
  }

  if (absNum < 1000000000) {
    const formatted = (absNum / 1000000).toFixed(decimals);
    const cleaned = parseFloat(formatted).toString();
    return sign + cleaned + 'M';
  }

  const formatted = (absNum / 1000000000).toFixed(decimals);
  const cleaned = parseFloat(formatted).toString();
  return sign + cleaned + 'B';
}

/**
 * Formats a number specifically for GitHub stats display
 * @param num The number to format
 * @param suffix The suffix to append (e.g., "stars", "forks", "downloads")
 * @returns Formatted string (e.g., "1.2k stars", "247 forks")
 */
export function formatGitHubStat(num: number, suffix: string): string {
  const formattedNum = formatNumber(num);
  return `${formattedNum} ${suffix}`;
}

/**
 * Gets a human-readable time ago string
 * @param date The date to compare to now
 * @returns Human-readable time string (e.g., "2 minutes ago", "1 hour ago")
 */
export function getTimeAgo(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return 'just now';
  if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? '' : 's'} ago`;
  if (diffHour < 24) return `${diffHour} hour${diffHour === 1 ? '' : 's'} ago`;
  if (diffDay < 7) return `${diffDay} day${diffDay === 1 ? '' : 's'} ago`;
  if (diffDay < 30) {
    const weeks = Math.floor(diffDay / 7);
    return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
  }
  if (diffDay < 365) {
    const months = Math.floor(diffDay / 30);
    return `${months} month${months === 1 ? '' : 's'} ago`;
  }

  const years = Math.floor(diffDay / 365);
  return `${years} year${years === 1 ? '' : 's'} ago`;
}

/**
 * Creates a loading placeholder that mimics the expected format
 * @param suffix The suffix to append
 * @returns Loading placeholder string
 */
export function createLoadingPlaceholder(suffix: string): string {
  return `-- ${suffix}`;
}