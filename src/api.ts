const DEFAULT_API_URL = 'https://bloomtheorysalon.onrender.com';

// Override this at build time with VITE_API_URL when using another backend.
const apiBaseUrl = (import.meta.env.VITE_API_URL || DEFAULT_API_URL).replace(/\/$/, '');

export const apiUrl = (path: string) => `${apiBaseUrl}${path}`;
