import { getPortfolio } from '../server/portfolio.js';

// Vercel serverless function for GET /api/portfolio.
export default async function handler(req, res) {
  // Let Vercel's CDN cache the response for an hour and refresh it in the background.
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  res.status(200).json(await getPortfolio());
}
