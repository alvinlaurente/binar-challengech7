import express from 'express';
import auth from '../../middlewares/authentication';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import gameRoutes from './gameRoutes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/profile', [auth.blockUnauthenticated], userRoutes);
router.use('/game', [auth.blockUnauthenticated], gameRoutes);

export default router;
