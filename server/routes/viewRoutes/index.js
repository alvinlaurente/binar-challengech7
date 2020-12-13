import express from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import gameRoutes from './gameRoutes';
import blockUnauthenticated from '../../middlewares/authentication/blockUnauthenticated';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/profile', blockUnauthenticated, userRoutes);
router.use('/game', blockUnauthenticated, gameRoutes);

export default router;
