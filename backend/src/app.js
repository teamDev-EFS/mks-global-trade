import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './config/env.js';
import publicRoutes from './routes/publicRoutes.js';
import adminRoutes from './routes/admin/index.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

if (env.nodeEnv === 'production') {
  app.set('trust proxy', 1);
}

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || env.frontendUrls.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
app.use(cookieParser());
app.use(express.json({ limit: '512kb' }));

/** Root URL — Vercel/browser visits to https://…vercel.app/ otherwise get Express default "Cannot GET /". */
app.get('/', (req, res) => {
  res.json({
    name: 'MSK Global Trade API',
    message:
      'Backend only. The marketing site is deployed separately (e.g. Netlify); point VITE_API_URL to this origin.',
    endpoints: {
      health: 'GET /api/health',
      enquiry: 'POST /api/enquiries',
      admin: '/api/admin/*',
    },
  });
});

app.use('/api', publicRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorHandler);

export default app;
