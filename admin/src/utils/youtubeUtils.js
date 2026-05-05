/**
 * Extract YouTube video ID from various URL formats.
 * Supports: watch, youtu.be, shorts, embed
 * @param {string} url - YouTube URL
 * @returns {string|null} - 11-char video ID or null
 */
export const extractYoutubeId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};
