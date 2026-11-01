/**
 * Netlify build entry point with a pause switch.
 *
 *   SITE_PAUSED=true   every URL answers HTTP 503 with a neutral "temporarily unavailable" page:
 *                      no pages, files, API proxies or functions are served, and the normal
 *                      build is skipped
 *   anything else      run the normal production build
 *
 * The switch lives in netlify.toml ([build.environment] SITE_PAUSED), which overrides the
 * Netlify UI. Builds run outside Netlify (local, Hostinger) use the normal build command and
 * are never affected.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** The site's normal build command and output folder. Keep in sync with package.json. */
const BUILD_COMMAND = 'npm run build';
const PUBLISH_DIR = 'dist';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// Netlify deploys edge functions that a build writes here (Frameworks API). Edge functions run
// before redirects, static files and serverless functions.
const edgeFunction = path.join(root, '.netlify', 'v1', 'edge-functions', 'site-paused.js');
const paused = /^(1|true|yes|on)$/i.test((process.env.SITE_PAUSED ?? '').trim());

if (!paused) {
  await fs.rm(edgeFunction, { force: true });
  const result = spawnSync(BUILD_COMMAND, { stdio: 'inherit', shell: true });
  process.exit(result.status ?? 1);
}

const out = path.join(root, PUBLISH_DIR);

const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<title>Temporarily unavailable</title>
<style>
  html, body { height: 100%; margin: 0; }
  body { display: flex; align-items: center; justify-content: center; padding: 24px; box-sizing: border-box;
         background: #f4f5f7; color: #1f2933; font: 16px/1.6 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; text-align: center; }
  main { max-width: 420px; }
  h1 { font-size: 1.5rem; font-weight: 600; margin: 0 0 8px; }
  p { margin: 0; color: #52606d; }
</style>
</head>
<body>
<main>
  <h1>This website is temporarily unavailable</h1>
  <p>Please check back later.</p>
</main>
</body>
</html>
`;

// Every URL, including /, assets, robots.txt and /api/*, gets the page with HTTP 503 so search
// engines treat the outage as temporary.
await fs.mkdir(path.dirname(edgeFunction), { recursive: true });
await fs.writeFile(
  edgeFunction,
  `const page = ${JSON.stringify(page)};

export default () =>
  new Response(page, {
    status: 503,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
      'retry-after': '86400',
      'x-robots-tag': 'noindex, nofollow',
    },
  });

export const config = { path: '/*' };
`,
  'utf8',
);

// Static fallback with the same page, used only if the edge function is ever skipped.
await fs.rm(out, { recursive: true, force: true });
await fs.mkdir(out, { recursive: true });
await fs.writeFile(path.join(out, 'index.html'), page, 'utf8');
await fs.writeFile(path.join(out, '404.html'), page, 'utf8');
await fs.writeFile(path.join(out, 'robots.txt'), 'User-agent: *\nDisallow: /\n', 'utf8');
// _redirects rules run before netlify.toml rules, so this also blocks API and sitemap proxies.
await fs.writeFile(path.join(out, '_redirects'), '/*  /index.html  200!\n', 'utf8');
await fs.writeFile(
  path.join(out, '_headers'),
  '/*\n  X-Robots-Tag: noindex, nofollow\n  Cache-Control: public, max-age=0, must-revalidate\n',
  'utf8',
);

// Deploy no serverless functions while paused. Runs only on Netlify's build machine, so local
// sources are never touched.
const functionsDir = path.join(root, 'netlify', 'functions');
if (process.env.NETLIFY === 'true' && (await fs.stat(functionsDir).catch(() => null))) {
  await fs.rm(functionsDir, { recursive: true, force: true });
  await fs.mkdir(functionsDir, { recursive: true });
}

console.log('SITE_PAUSED is set: every URL now answers 503 with the "temporarily unavailable" page.');
