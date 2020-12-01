import express from 'express';
import authRoutes from './authRoutes';
import profileRouter from './profileRoutes';
import apiRouter from './apiRoutes';
import gameRouter from './gameRoutes';
import blockUnauthenticated from '../middlewares/authentication/blockUnauthenticated';
import controller from '../controllers/ViewController/controller';

const router = express.Router();

// Homepage router
router.get('/', controller.homeIndex);
router.get('/index', (req, res) => {
  res.redirect('/');
});
router.get('/home', (req, res) => {
  res.redirect('/');
});

router.use('/auth', authRoutes);
router.use('/profile', blockUnauthenticated, profileRouter);
router.use('/game', blockUnauthenticated, gameRouter);

router.use('/api', apiRouter);

export default router;
