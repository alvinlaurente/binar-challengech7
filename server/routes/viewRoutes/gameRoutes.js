import express from 'express';
import gameController from '../../controllers/ViewController/gameController';
import roomController from '../../controllers/ViewController/roomController';

const router = express.Router();

router.get('/', gameController.getRoom);

router.get('/room', roomController.getRoom);
router.post('/create-room', roomController.createRoom);
router.post('/join-room', roomController.joinRoom);

// Game History
router.get('/history', gameController.getGameHistory);
router.post('/history', gameController.postGameHistory);
router.delete('/history', gameController.deleteGameHistory);

export default router;
