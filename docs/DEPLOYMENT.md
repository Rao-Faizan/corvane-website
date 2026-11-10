# Deployment Guide

> **Do not deploy publicly without explicit management approval.** Work through `LAUNCH_CHECKLIST.md` first.

The site builds to a **self-contained Node.js server** (`output: "standalone"`). It runs on any VPS, in a container, or on a managed Node host. It needs no Vercel-specific features.

## Requirements

- Node.js 20.9+ (developed and tested on Node 26)
- A reverse proxy with TLS (Nginx, Caddy or a cloud load balancer)
- Environment variables from `.env.example`

## Build

```bash
npm ci
npm run build          # next build + copies static assets into .next/standalone
```

The deployable artifact is the **`.next/standalone/`** folder. It contains `server.js`, the minimal `node_modules`, `.next/static` and `public`.

> Build where `NEXT_PUBLIC_*` variables are set. Their values are inlined at build time. Server-only variables (`RESEND_*`, `SANITY_*`, `INQUIRY_*`) are read at runtime.

## Run

```bash
cd .next/standalone
PORT=3000 HOSTNAME=127.0.0.1 node server.js
```

Or from the project root: `npm start`.

### Option A — VPS with systemd

`/etc/systemd/system/corvane-web.service`:

```ini
[Unit]
Description=Corvane website
After=network.target

[Service]
Type=simple
User=corvane
WorkingDirectory=/srv/corvane-web/.next/standalone
EnvironmentFile=/srv/corvane-web/.env.production
Environment=PORT=3000
Environment=HOSTNAME=127.0.0.1
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload && sudo systemctl enable --now corvane-web
```

PM2 works too: `pm2 start server.js --name corvane-web` from the standalone folder.

### Option B — Docker

```dockerfile
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_ALLOW_INDEXING=false
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0
COPY --from=build /app/.next/standalone ./
USER node
EXPOSE 3000
CMD ["node", "server.js"]
```

## Reverse proxy (Nginx example)

```nginx
limit_req_zone $binary_remote_addr zone=inquiry:10m rate=5r/m;

server {
  listen 443 ssl http2;
  server_name www.your-domain.com;
  # ssl_certificate ... (e.g. certbot)

  location /api/inquiry {
    limit_req zone=inquiry burst=3 nodelay;
    client_max_body_size 32k;
    proxy_pass http://127.0.0.1:3000;
    include /etc/nginx/proxy_params;
  }

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

**Important:** the inquiry API reads `X-Forwarded-For` for rate limiting. Only expose the Node server behind your own proxy (bind to `127.0.0.1`), or clients could spoof that header.

## Email (Resend)

1. Create a Resend account and **verify the sending domain** (DNS records).
2. Create an API key with "sending" permission only.
3. Set `RESEND_API_KEY`, `INQUIRY_TO_EMAIL` and `INQUIRY_FROM_EMAIL`.
4. Submit a test inquiry on staging and confirm it arrives. Replies go to the visitor via `reply_to`.

Using existing SMTP instead? Add an SMTP channel in `src/lib/inquiry/deliver.ts` (for example with `nodemailer`) next to the Resend and file channels. No other code changes are needed.

Recommended: also set `INQUIRY_LOG_FILE` (absolute path, outside the web root, readable only by the service user) as a backup in case email delivery fails.

## Sanity CMS (optional)

1. Create a Studio project: `npm create sanity@latest`.
2. Copy `sanity/schemas/` into it and register `schemaTypes` (see `sanity/schemas/index.ts`).
3. Import the current local content (products, solutions, industries) as starting documents.
4. Set `SANITY_PROJECT_ID` and `SANITY_DATASET` on the website server.
5. Content refreshes within about 1 hour (the `cacheLife('hours')` profile). For instant updates, add a Sanity webhook that calls a revalidation route using `revalidateTag('products')` and similar. This isn't implemented yet; see the progress doc.

If Sanity is unreachable, the site logs the error and serves the local content instead of failing.

## Scaling notes

- The inquiry rate limiter is in-memory and per-process. With more than one instance, rely on the Nginx `limit_req` above or a shared store.
- The Cache Components cache is in-memory by default. Multiple instances each warm their own cache, which is fine for this content volume.

## Post-deploy smoke test

```bash
curl -I https://www.your-domain.com/                 # 200 + security headers
curl https://www.your-domain.com/robots.txt          # Allow only when indexing enabled
curl -I https://www.your-domain.com/products/nope    # 404
```

Then submit one real test inquiry and confirm delivery.
