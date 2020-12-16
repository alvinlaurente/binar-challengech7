import express from 'express';
import adminAPIRoute from './adminAPIRoute';
import authAPIRoute from './authAPIRoute';
import userAPIRoute from './userAPIRoute';
import gameHistoryAPIRoute from './gameHistoryAPIRoute';

const router = express.Router();

router.use('/admin', adminAPIRoute);
router.use('/auth', authAPIRoute);
router.use('/profile', userAPIRoute);
router.use('/game', gameHistoryAPIRoute);

export default router;
