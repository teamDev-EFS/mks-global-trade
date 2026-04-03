import mongoose from 'mongoose';
import { ZodError } from 'zod';

export function errorHandler(err, req, res, _next) {
  // Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation failed',
      details: err.flatten(),
    });
  }

  // Mongoose CastError (e.g. invalid ObjectId in URL params)
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      error: `Invalid ${err.path}: ${err.value}`,
    });
  }

  // Mongoose ValidationError (e.g. required field missing on save)
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      error: 'Validation failed',
      details: Object.fromEntries(
        Object.entries(err.errors).map(([k, v]) => [k, v.message])
      ),
    });
  }

  const status = err.status || err.statusCode || 500;
  const message = status === 500 ? 'Internal Server Error' : (err.message || 'Internal Server Error');

  // Always log server errors
  if (status >= 500) {
    console.error(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`, err);
  }

  res.status(status).json({ error: message });
}
