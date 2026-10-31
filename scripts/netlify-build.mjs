/**
 * Netlify build entry point with a pause switch.
 *
 *   SITE_PAUSED=true   publish only a neutral "temporarily unavailable" page: no site content,
 *                      not indexed, API/sitemap proxies blocked, and no full build
 *   anything else      run the normal production build
 *
 * Set SITE_PAUSED in Netlify > Project configuration > Environment variables, then trigger a deploy.
 * Builds run outside Netlify (local, Hostinger) use the normal build command and are never affected.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** The site's normal build command and output folder. Keep in sync with package.json. */
const BUILD_COMMAND = 'npm run build';
const PUBLISH_DIR = 'dist';

const paused = /^(1|true|yes|on)$/i.test((process.env.SITE_PAUSED ?? '').trim());

if (!paused) {
  const result = spawnSync(BUILD_COMMAND, { stdio: 'inherit', shell: true });
  process.exit(result.status ?? 1);
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
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

await fs.rm(out, { recursive: true, force: true });
await fs.mkdir(out, { recursive: true });
await fs.writeFile(path.join(out, 'index.html'), page, 'utf8');
await fs.writeFile(path.join(out, '404.html'), page, 'utf8');
await fs.writeFile(path.join(out, 'robots.txt'), 'User-agent: *\nDisallow: /\n', 'utf8');
// _redirects rules run before netlify.toml rules, so this also blocks API and sitemap proxies.
await fs.writeFile(path.join(out, '_redirects'), '/*  /index.html  200\n', 'utf8');
await fs.writeFile(
  path.join(out, '_headers'),
  '/*\n  X-Robots-Tag: noindex, nofollow\n  Cache-Control: public, max-age=0, must-revalidate\n',
  'utf8',
);

console.log('SITE_PAUSED is set: published the "temporarily unavailable" page instead of the website.');
