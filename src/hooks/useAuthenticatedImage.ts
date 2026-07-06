import { useState, useEffect } from 'react';
import { getCookie } from '../app/service/baseQuery';
import { getAvatarUrl } from '../app/service/crudsetting';

/**
 * Fetches an image via an authenticated request (Bearer token) and
 * returns a local blob URL safe to use in <img src=...>.
 * Falls back to the original URL if fetch fails (e.g. public image).
 */
export const useAuthenticatedImage = (url?: string | null): string | null => {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    const resolvedUrl = getAvatarUrl(url);
    if (!resolvedUrl) {
      setBlobUrl(null);
      return;
    }

    if (resolvedUrl.startsWith('blob:') || resolvedUrl.startsWith('data:')) {
      setBlobUrl(resolvedUrl);
      return;
    }

    let objectUrl: string | null = null;
    let cancelled = false;

    const fetchImage = async () => {
      try {
        const token = getCookie('token');
        const headers: HeadersInit = {
          'ngrok-skip-browser-warning': 'true'
        };
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        const response = await fetch(resolvedUrl, { headers, credentials: 'include' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const blob = await response.blob();
        if (!cancelled) {
          objectUrl = URL.createObjectURL(blob);
          setBlobUrl(objectUrl);
        }
      } catch {
        // Fallback: try loading image directly (may work for public assets)
        if (!cancelled) setBlobUrl(resolvedUrl);
      }
    };

    fetchImage();

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [url]);

  return blobUrl;
};
