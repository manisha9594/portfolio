import express from 'express';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getPortfolio } from './portfolio.js';

// Local server. On Vercel, api/portfolio.js serves the same data instead.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, '..', 'dist');
const PORT = Number(process.env.PORT) || 3001;

const app = express();

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.get('/api/portfolio', async (req, res) => {
  res.json(await getPortfolio());
});

// In production, the same server also hosts the built React app.
if (existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
}

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
