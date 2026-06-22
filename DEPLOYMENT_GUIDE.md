# Deployment Guide

This project is split into **two separate repositories**:

## 1. Frontend Repository (This Repo)
- **Platform:** Netlify
- **URL:** https://www.mskglobaltrade.com
- **Framework:** Vite + React
- **Built from:** `npm run build` → `dist/`

## 2. Backend Repository (Separate)
- **Repository:** `mks-global-trade-api` (on GitHub)
- **Platform:** Railway
- **URL:** To be set in `netlify.toml` VITE_API_URL
- **Framework:** Express.js + MongoDB

---

## Setup Instructions

### Step 1: Clone Both Repositories

```bash
# Frontend (this repo)
git clone https://github.com/teamDev-EFS/mks-global-trade.git
cd mks-global-trade
npm install

# Backend (separate repo)
cd ../
git clone https://github.com/teamDev-EFS/mks-global-trade-api.git
cd mks-global-trade-api
npm install
```

### Step 2: Set Up Backend on Railway

1. Go to [railway.app](https://railway.app)
2. Create new project
3. Connect `mks-global-trade-api` GitHub repo
4. Set environment variables:
   ```
   NODE_ENV=production
   MONGODB_URI=<your-mongodb-atlas-url>
   JWT_SECRET=<32-char-random-string>
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=https://www.mskglobaltrade.com,https://mskglobaltrade.com
   ```
5. Deploy
6. Copy the public domain URL

### Step 3: Update Frontend Configuration

In `netlify.toml`, replace `YOUR_RAILWAY_BACKEND_URL`:

```toml
[[redirects]]
  from = "/api/*"
  to = "https://YOUR_RAILWAY_BACKEND_URL/api/:splat"
  status = 200
  force = true
```

Example:
```toml
[[redirects]]
  from = "/api/*"
  to = "https://mks-global-trade-api-prod-xxxx.up.railway.app/api/:splat"
  status = 200
  force = true
```

### Step 4: Deploy Frontend

```bash
git add netlify.toml
git commit -m "Update backend URL to Railway"
git push origin main
```

Netlify auto-deploys on push.

---

## Development

### Run Both Locally

```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend
cd ../mks-global-trade-api
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:3001
API Proxy: http://localhost:5173/api/*

---

## Troubleshooting

### Backend Not Responding
1. Check Railway logs for errors
2. Verify MongoDB connection string
3. Test health endpoint: `https://YOUR_RAILWAY_URL/api/health`

### Frontend Can't Reach API
1. Check `netlify.toml` backend URL
2. Verify FRONTEND_URL in Railway includes your domain
3. Check browser Network tab for CORS errors

### Environment Variable Issues
- Railway variables are case-sensitive
- Don't include quotes in values
- Redeploy after changing variables

---

## Important Notes

⚠️ **Never commit `.env` files** - they contain secrets
⚠️ **MongoDB connection string** - add Railway IP to Atlas Network Access
⚠️ **JWT_SECRET** - must be 32+ characters in production
⚠️ **Frontend URL** - must exactly match browser origin (no trailing slash)

---

## File Structure

```
mks-global-trade/                 (Frontend - this repo)
├── src/                          # React components
├── public/                        # Static assets
├── netlify.toml                   # Netlify config (API proxy)
├── vite.config.js
├── package.json
└── tsconfig.json

mks-global-trade-api/             (Backend - separate repo)
├── src/
│   ├── server.js                 # App entry
│   ├── app.js                    # Express config
│   ├── config/                   # DB, env, auth
│   ├── routes/                   # API routes
│   ├── models/                   # MongoDB schemas
│   ├── controllers/              # Business logic
│   └── middleware/               # Auth, errors
├── railway.json                  # Railway config
├── Procfile                       # Process definition
├── package.json
└── .env.example                  # Example env vars
```

---

## Next Steps

1. ✅ Backend repo created and committed
2. ⏳ Push backend to GitHub
3. ⏳ Deploy backend to Railway
4. ⏳ Get Railway URL
5. ⏳ Update netlify.toml
6. ⏳ Push frontend to Netlify

Questions? Check the README.md in each repo.
