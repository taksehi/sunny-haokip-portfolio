/**
 * Helper utility for handling video embeds, aspect ratios, and media formats.
 */

// Converts various video links (YouTube watch URLs, youtu.be, Vimeo) to standard responsive iframe embed URLs
export function formatVideoEmbedUrl(url) {
  if (!url) return '';

  // Already an embed URL
  if (url.includes('/embed/')) return url;

  // YouTube watch format: youtube.com/watch?v=ID
  const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  }

  // Vimeo format: vimeo.com/ID
  const vimeoMatch = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)/);
  if (vimeoMatch && vimeoMatch[3]) {
    return `https://player.vimeo.com/video/${vimeoMatch[3]}`;
  }

  // Google Drive format: drive.google.com/file/d/ID/...
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch && driveMatch[1]) {
    return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
  }

  return url;
}

// Determines whether an aspect ratio or title indicates a vertical video (9:16, Reel, Shorts, Portrait)
export function isVerticalAspectRatio(aspectRatioStr) {
  if (!aspectRatioStr) return false;
  const s = String(aspectRatioStr).toLowerCase();
  return (
    s.includes('9:16') ||
    s.includes('9 / 16') ||
    s.includes('vertical') ||
    s.includes('portrait') ||
    s.includes('reel') ||
    s.includes('short') ||
    s.includes('4:5') ||
    s.includes('4 / 5')
  );
}

// Map aspect ratio string to CSS aspect-ratio value
export function getCssAspectRatio(aspectRatioStr) {
  if (!aspectRatioStr) return '16 / 9';
  const s = String(aspectRatioStr).toLowerCase();
  if (s.includes('2.39:1') || s.includes('anamorphic') || s.includes('cinemascope')) return '2.39 / 1';
  if (s.includes('9:16') || s.includes('vertical') || s.includes('reel')) return '9 / 16';
  if (s.includes('4:5')) return '4 / 5';
  if (s.includes('4:3')) return '4 / 3';
  if (s.includes('1:1')) return '1 / 1';
  if (s.includes('16:9') || s.includes('16 / 9')) return '16 / 9';
  if (s.includes('16:10') || s.includes('16 / 10')) return '16 / 10';
  return '16 / 9';
}

