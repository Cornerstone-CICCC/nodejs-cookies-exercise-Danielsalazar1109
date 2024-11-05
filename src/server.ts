import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/page.routes';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
const COOKIE_NAME = process.env.COOKIE_NAME || 'session';
const COOKIE_MAX_AGE = parseInt(process.env.COOKIE_MAX_AGE || '3600000');

app.use('/', authRoutes);

app.get('/set-cookie', (req, res) => {
  res.cookie(COOKIE_NAME, 'userValue', {
    maxAge: COOKIE_MAX_AGE,
    httpOnly: true,
    signed: true,
  });
  res.send('Cookie set');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});