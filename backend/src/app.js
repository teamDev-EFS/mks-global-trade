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
      // Allow requests with no origin (server-to-server, Netlify proxy, curl, health checks)
      if (!origin) return callback(null, true);
      if (env.frontendUrls.includes(origin)) return callback(null, true);
      // Reject unknown browser origins
      callback(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
app.use(cookieParser());
app.use(express.json({ limit: '512kb' }));

/** Root URL — prevents "Cannot GET /" on direct Vercel visits. */
app.get('/', (_req, res) => {
  res.json({
    name: 'MSK Global Trade API',
    status: 'ok',
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
