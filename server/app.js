import express from 'express';
import helmet from 'helmet';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import routes from './routes';

const app = express();
require('dotenv').config();

// Helmet
app.use(helmet({
  contentSecurityPolicy: false,
}));

const port = process.env.PORT_NUM;

// Template/View engine using EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Port listener
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Logger Middleware
app.use(logger('dev'));

// Static files Middleware
app.use(express.static('public'));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session & Cookies - Session store method use in-memory storage for development env
// TODO : Change Session store for production env
app.use(cookieParser());

// Method Override
app.use(methodOverride('_method'));

// Routes
app.use(routes);
