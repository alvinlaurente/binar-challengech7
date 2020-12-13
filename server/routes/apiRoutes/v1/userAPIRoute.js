import express from 'express';
import userAPIController from '../../../controllers/APIController/userAPIController';

const router = express.Router();

router.get('/:id', userAPIController.getProfile);
router.patch('/edit/:id', userAPIController.patchEditProfile);
router.patch('/changePassword/:id&:username', userAPIController.patchChangePassword);
router.delete('/deleteUser/:id', userAPIController.deleteUser);

export default router;
