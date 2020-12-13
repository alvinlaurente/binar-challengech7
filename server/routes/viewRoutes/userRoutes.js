import express from 'express';
import changePasswordValidation from '../../middlewares/validation/changePasswordValidation';
import editProfileValidation from '../../middlewares/validation/editProfileValidation';
import userController from '../../controllers/ViewController/userController';

const router = express.Router();

router.get('/', userController.getProfile);
router.get('/edit', userController.getEditProfile);
router.get('/changePassword', userController.getChangePassword);
router.patch('/edit', editProfileValidation, userController.patchEditProfile);
router.patch('/changePassword', changePasswordValidation, userController.patchChangePassword);
router.delete('/deleteUser', userController.deleteUser);

export default router;
