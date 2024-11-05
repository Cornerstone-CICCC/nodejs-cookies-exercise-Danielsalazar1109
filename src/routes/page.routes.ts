import { Router, Request, Response } from 'express';
import { isAuthenticated } from '../middleware/auth';
import { User } from '../types/user';

const router = Router();

const users: User[] = [
  { username: 'Daniel1209', password: 'daniel123' },
];

router.get('/', (req: Request, res: Response) => {
  res.render('home');
});

router.get('/login', (req: Request, res: Response) => {
  if (req.cookies.username) {
    return res.redirect('/profile');
  }
  res.render('login', { error: null });
});

router.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    res.cookie('username', user.username);
    res.redirect('/profile');
  } else {
    res.render('login', { error: 'User or password is incorrect' });
  }
});

router.get('/profile', isAuthenticated, (req: Request, res: Response) => {
  res.render('profile', { username: req.cookies.username });
});

router.get('/logout', (req: Request, res: Response) => {
  res.clearCookie('username');
  res.redirect('/login');
});

export default router;