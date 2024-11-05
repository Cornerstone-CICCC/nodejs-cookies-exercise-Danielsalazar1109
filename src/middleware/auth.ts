import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  if (req.cookies.username) {
    next();
  } else {
    res.redirect('/login');
  }
};