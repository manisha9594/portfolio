# Manisha Anantharam — Portfolio

Personal portfolio site built with **React** (Vite) and a **Node.js** API.

The page content (profile, projects, repositories, skills) lives in
[`server/data/portfolio.json`](server/data/portfolio.json). The API serves it to the
React front end and refreshes repository star counts from the GitHub API, caching
them for an hour.

## Run locally

```bash
npm install
npm run dev
```

- Site: http://localhost:5180
- API: http://localhost:3001/api/portfolio

For a production build served by Express on one port:

```bash
npm run build
npm start        # http://localhost:3001
```

## Project structure

```
api/portfolio.js        Vercel serverless function (production API)
server/index.js         Express server (local development / self-hosting)
server/portfolio.js     Shared data + GitHub star-count logic
server/data/            Portfolio content
src/                    React app and components
```

## Deploy

Deployed on [Vercel](https://vercel.com): it builds the Vite app into `dist/` and turns
`api/portfolio.js` into a serverless function automatically — no extra configuration.
