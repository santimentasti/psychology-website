import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ApiError, ApiResponse } from '../types/api.types.js';

export const errorHandler = (
  err: Error | ZodError | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Zod validation errors
  if (err instanceof ZodError) {
    const errors: Record<string, string[]> = {};
    err.errors.forEach((error) => {
      const path = error.path.join('.');
      if (!errors[path]) {
        errors[path] = [];
      }
      errors[path].push(error.message);
    });

    res.status(400).json({
      success: false,
      error: 'Validation failed',
      errors,
    } as ApiResponse<null>);
    return;
  }

  // Custom API errors
  if ('statusCode' in err && typeof err.statusCode === 'number') {
    const apiError = err as ApiError;
    res.status(apiError.statusCode).json({
      success: false,
      error: apiError.message,
      errors: apiError.errors,
    } as ApiResponse<null>);
    return;
  }

  // Default server error
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message,
  } as ApiResponse<null>);
};

