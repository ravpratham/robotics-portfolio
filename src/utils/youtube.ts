/**
 * Extracts YouTube video ID from various YouTube URL formats
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/v/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID (YouTube Shorts)
 */
export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null;

  // Remove whitespace
  url = url.trim();

  // Pattern 1: youtube.com/shorts/VIDEO_ID (YouTube Shorts)
  const shortsMatch = url.match(/youtube\.com\/shorts\/([^&\n?#]+)/);
  if (shortsMatch && shortsMatch[1]) {
    return shortsMatch[1];
  }

  // Pattern 2: youtube.com/watch?v=VIDEO_ID, youtu.be/VIDEO_ID, embed, or v/
  const watchMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)/);
  if (watchMatch && watchMatch[1]) {
    return watchMatch[1];
  }

  // Pattern 3: youtube.com/embed/VIDEO_ID (explicit check)
  const embedMatch = url.match(/youtube\.com\/embed\/([^&\n?#]+)/);
  if (embedMatch && embedMatch[1]) {
    return embedMatch[1];
  }

  // Pattern 4: Just the video ID (11 characters, alphanumeric, hyphens, underscores)
  const videoIdPattern = /^[a-zA-Z0-9_-]{11}$/;
  if (videoIdPattern.test(url)) {
    return url;
  }

  return null;
}

/**
 * Generates YouTube embed URL from video ID
 */
export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}
