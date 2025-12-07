// apps/backend/src/middleware/requestLogger.ts

import type { Request, Response, NextFunction } from 'express';

export function requestLogger(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  console.log(`[REQ] ${req.method} ${req.originalUrl}`);
  next();
}
