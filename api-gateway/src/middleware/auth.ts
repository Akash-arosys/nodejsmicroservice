import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  let token = authHeader?.startsWith('Bearer ') 
    ? authHeader.slice(7) 
    : authHeader;

  // Public routes - No auth needed
  const publicPaths = ['/users/register', '/users/login'];
  const isPublic = publicPaths.some(path => req.path.includes(path));

  if (!token && !isPublic) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  if (token) {
    try {
      const secret = process.env.JWT_SECRET || 'eb97d3c5366dd35a6e3028b6546ef7f03b0aaf7c';
      const decoded = jwt.verify(token, secret) as any;
      (req as any).user = decoded; // User info attached
    } catch (error) {
      return res.status(401).json({ success: false, error: 'Invalid token' });
    }
  }
  next();
};
