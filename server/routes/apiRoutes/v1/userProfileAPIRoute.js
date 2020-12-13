import express from 'express';
import userProfileAPIController from '../../../controllers/APIController/userProfileAPIController';

const router = express.Router();

router.get('/', userProfileAPIController.getProfile);
router.get('/edit', userProfileAPIController.getEditProfile);
router.get('/changePassword', userProfileAPIController.getChangePassword);
router.patch('/edit', userProfileAPIController.patchEditProfile);
router.patch('/changePassword', userProfileAPIController.patchChangePassword);
router.delete('/deleteUser', userProfileAPIController.deleteUser);

export default router;
