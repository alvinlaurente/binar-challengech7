import express from 'express';
import changePasswordValidation from '../middlewares/validation/changePasswordValidation';
import editProfileValidation from '../middlewares/validation/editProfileValidation';
import userController from '../controllers/ViewController/userController';

const profileRouter = express.Router();

profileRouter.get('/', userController.getProfile);
profileRouter.get('/edit', userController.getEditProfile);
profileRouter.get('/changePassword', userController.getChangePassword);
profileRouter.patch('/edit', editProfileValidation, userController.patchEditProfile);
profileRouter.patch('/changePassword', changePasswordValidation, userController.patchChangePassword);
profileRouter.delete('/deleteUser', userController.deleteUser);

export default profileRouter;
