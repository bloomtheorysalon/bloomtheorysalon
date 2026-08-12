// On Vercel, relative /api requests are forwarded by vercel.json. For another
// host, VITE_API_URL can point directly to the backend at build time.
const apiBaseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export const apiUrl = (path: string) => `${apiBaseUrl}${path}`;
