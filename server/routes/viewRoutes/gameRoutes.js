import express from 'express';
import gameController from '../../controllers/ViewController/gameController';

const router = express.Router();

router.get('/', gameController.getRoom);

// Game History
router.get('/history', gameController.getGameHistory);
router.post('/history', gameController.postGameHistory);
router.delete('/history', gameController.deleteGameHistory);

export default router;
