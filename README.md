# MSK Global Trade — Frontend

Premium agricultural export solutions platform. React + Vite frontend deployed on Netlify.

## Quick Start

```bash
npm install
npm run dev
```

**Frontend:** http://localhost:5173  
**Backend API:** http://localhost:3001

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **React Router** - Navigation
- **React Hook Form** - Form handling
- **Zod** - Validation

## Project Structure

```
mks-global-trade/          (Frontend - this repo)
├── src/
│   ├── pages/            # Route pages
│   ├── components/       # React components
│   ├── lib/              # Utilities
│   └── App.tsx           # Main app
├── public/               # Static assets
├── netlify.toml          # Netlify config (API proxy)
├── vite.config.ts
└── tailwind.config.js
```

## Deployment

### Frontend (Netlify)
- Automatic deploy on push to `main`
- Built with `npm run build`
- Served from `dist/` directory

### Backend (Separate Repository)
- Repository: [`mks-global-trade-api`](https://github.com/teamDev-EFS/mks-global-trade-api)
- Platform: Railway
- API proxied via `netlify.toml`

### Setup Guide

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete setup instructions including:
- Cloning both repos
- Backend Railway deployment
- Environment variable configuration
- API endpoint configuration

## Development

### Run Frontend Only
```bash
npm run dev
```

### Run Full Stack (Frontend + Backend)
```bash
npm run dev:full
```

This starts both frontend (port 5173) and backend API (port 3001) concurrently.

### Build
```bash
npm run build
```

## Environment Variables

Frontend uses `VITE_*` prefixed variables (inlined at build time):

```
VITE_SITE_URL=https://www.mskglobaltrade.com
VITE_API_URL=https://your-railway-backend.up.railway.app  # Set in netlify.toml
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX  # Optional
```

See `netlify.toml` for API proxy configuration.

## Backend API

The backend is in a separate repository: [`mks-global-trade-api`](https://github.com/teamDev-EFS/mks-global-trade-api)

Key endpoints:
- `GET /api/health` - Health check
- `POST /api/enquiries` - Submit enquiry
- `GET /api/admin/*` - Admin routes (protected)

## Troubleshooting

### API calls failing
1. Check `netlify.toml` backend URL is correct
2. Verify backend is running on Railway
3. Check browser console for CORS errors

### Build issues
1. Clear node_modules: `rm -rf node_modules && npm install`
2. Clear Vite cache: `rm -rf dist`
3. Check TypeScript: `npm run build`

## Contributing

1. Create feature branch from `main`
2. Make changes and test locally
3. Push to GitHub
4. Netlify auto-deploys on merge to `main`

## License

Private - MSK Global Trade
