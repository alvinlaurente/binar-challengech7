import express from 'express';
import auth from '../../middlewares/authentication';
import authRoutes from './authRoutes';
import adminRoutes from './adminRoutes';
import userRoutes from './userRoutes';
import gameRoutes from './gameRoutes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/admin', [auth.verifyToken, auth.onlyAdmin], adminRoutes);
router.use('/profile', [auth.verifyToken], userRoutes);
router.use('/game', [auth.verifyToken], gameRoutes);

export default router;
