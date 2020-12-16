import express from 'express';
import gameAPIController from '../../../controllers/APIController/gameAPIController';

const router = express.Router();

router.get('/room', gameAPIController.getRoom);
router.get('/room/create', gameAPIController.createRoom);
router.get('/room/:roomId', gameAPIController.getRoomById);

router.get('/history/:id', gameAPIController.getGameHistory);
router.post('/history/:id', gameAPIController.postGameHistory);
router.delete('/history/:id', gameAPIController.deleteGameHistory);

export default router;
