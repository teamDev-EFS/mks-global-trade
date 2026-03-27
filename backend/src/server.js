import mongoose from 'mongoose';
import app from './app.js';
import { connectDb } from './config/db.js';
import { assertProductionConfig, env } from './config/env.js';

async function shutdown(signal) {
  console.log(`${signal} received, closing…`);
  try {
    await mongoose.connection.close();
  } finally {
    process.exit(0);
  }
}

async function main() {
  try {
    assertProductionConfig();
    await connectDb();
    console.log('MongoDB connected');
    const server = app.listen(env.port, () => {
      console.log(`API listening on http://localhost:${env.port}`);
    });
    process.once('SIGTERM', () => shutdown('SIGTERM'));
    process.once('SIGINT', () => shutdown('SIGINT'));
    server.on('error', (err) => {
      console.error(err);
      process.exit(1);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

main();
