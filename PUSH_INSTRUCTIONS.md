# Final Push Instructions

## ✅ What's Done

1. ✅ Backend repo created and committed locally at `/tmp/mks-global-trade-api`
2. ✅ Main repo (frontend) committed with deployment guide
3. ✅ All configurations ready for Railway and Netlify

## ⏳ What You Need To Do

### Step 1: Push Frontend Repo

```bash
cd d:/mks-global-trade
git push origin main
```

**Note:** If auth fails, use GitHub credentials or SSH key.

### Step 2: Create Backend Repository on GitHub

1. Go to [github.com/new](https://github.com/new)
2. Create new repository:
   - **Name:** `mks-global-trade-api`
   - **Description:** Express.js backend for MSK Global Trade
   - **Private:** Yes (same as frontend repo)
   - **Initialize:** Skip (we'll push existing repo)
3. Click **Create repository**

### Step 3: Copy Backend Files

Backend files are ready at: `/tmp/mks-global-trade-api`

Copy them to your local machine:

```bash
# On Windows, copy to a good location
cp -r /tmp/mks-global-trade-api C:/projects/mks-global-trade-api
# Or manually: copy folder from temp to your projects

cd C:/projects/mks-global-trade-api
```

### Step 4: Push Backend Repo

```bash
cd C:/projects/mks-global-trade-api

# Add the GitHub remote
git remote add origin https://github.com/teamDev-EFS/mks-global-trade-api.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 5: Deploy Backend to Railway

1. Go to [railway.app](https://railway.app)
2. Sign in or create account
3. Click **"New Project"** → **"Deploy from GitHub"**
4. Select `mks-global-trade-api` repo
5. Railway auto-detects Node.js app
6. **Add Environment Variables:**

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://mks_admin_user:hEvJqUY3qYdiypiN@cluster0.ex81qws.mongodb.net/mks-global-trade?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=YjIzOGFiMjMtMzE2ZC00Mzg4LWE4NDAtM2MwZWUxODgyMTRiYTNhNzJmYWYtNjEwNi00YjNmLWI0ZTktMGNkYTE5MDM5ZTdkMTE2MDE2
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://www.mskglobaltrade.com,https://mskglobaltrade.com
ADMIN_DEFAULT_EMAIL=operations@mskglobaltrade.com
ADMIN_DEFAULT_PASSWORD=MskVijay452010!
```

7. Click **Deploy**
8. Wait for deployment to complete
9. Copy the **Public Domain** URL (example: `https://mks-global-trade-api-prod-xxxx.up.railway.app`)

### Step 6: Update Frontend with Backend URL

Once Railway deployment is done:

```bash
cd d:/mks-global-trade

# Edit netlify.toml and replace YOUR_RAILWAY_BACKEND_URL
# Example: https://mks-global-trade-api-prod-xxxx.up.railway.app

git add netlify.toml
git commit -m "Update backend URL to Railway

Railway Backend URL: https://mks-global-trade-api-prod-xxxx.up.railway.app

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"

git push origin main
```

### Step 7: Test Everything

```bash
# Test health endpoint
curl https://YOUR_RAILWAY_URL/api/health
```

Expected response:
```json
{
  "ok": true,
  "db": true,
  "dbState": 1,
  "env": "production"
}
```

Test frontend at: https://www.mskglobaltrade.com

---

## 📋 Quick Checklist

- [ ] Pushed frontend repo (`mks-global-trade`)
- [ ] Created `mks-global-trade-api` repo on GitHub
- [ ] Copied backend files locally
- [ ] Pushed backend repo to GitHub
- [ ] Backend deployed on Railway
- [ ] Railway health check responds
- [ ] Updated netlify.toml with Railway URL
- [ ] Frontend repo pushed with updated URL
- [ ] Netlify frontend deployed successfully
- [ ] Frontend can call `/api/health`

---

## 🆘 Troubleshooting

### Backend repo push fails
- Check git remote: `git remote -v`
- Verify GitHub credentials/SSH key works

### Railway deployment fails
- Check Railway logs for errors
- Verify all env vars are set correctly
- Test local: `npm install && npm start`

### Frontend can't reach backend
- Verify Railway URL in netlify.toml
- Check MongoDB connection from Railway
- Test: `curl https://YOUR_RAILWAY_URL/api/health`

### Git push auth fails
- Use GitHub CLI: `gh auth login`
- Or generate personal access token and use as password
- Or set up SSH keys

---

## Files You Modified

**Frontend Repo (`mks-global-trade`):**
- ✅ `package.json` - Added `start` script
- ✅ `netlify.toml` - Added Railway backend proxy (needs URL update)
- ✅ `README.md` - Updated deployment info
- ✅ `DEPLOYMENT_GUIDE.md` - Complete setup guide

**Backend Repo (`mks-global-trade-api`):**
- ✅ All source files copied
- ✅ `railway.json` - Railway configuration
- ✅ `Procfile` - Process definition
- ✅ `.gitignore` - Ignore secrets
- ✅ `README.md` - Backend documentation
- ✅ `package.json` - Dependencies and scripts

---

**You're all set! Just follow the steps above to complete the deployment.** 🚀
