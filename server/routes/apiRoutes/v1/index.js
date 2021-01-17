import express from 'express';
import adminAPIRoute from './adminAPIRoute';
import authAPIRoute from './authAPIRoute';
import userAPIRoute from './userAPIRoute';
import gameAPIRoute from './gameAPIRoute';

const router = express.Router();

router.use('/admin', adminAPIRoute);
router.use('/auth', authAPIRoute);
router.use('/profile', userAPIRoute);
router.use('/game', gameAPIRoute);

export default router;
