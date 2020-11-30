import express from 'express';
import blockUnauthenticated from '../middlewares/authentication/blockUnauthenticated';
import changePasswordValidation from '../middlewares/validation/changePasswordValidation';
import editProfileValidation from '../middlewares/validation/editProfileValidation';
import userController from '../controllers/ViewController/userController';

const profileRouter = express.Router();

profileRouter.get('/', blockUnauthenticated, userController.getProfile);
profileRouter.get('/edit', blockUnauthenticated, userController.getEditProfile);
profileRouter.get('/changePassword', blockUnauthenticated, userController.getChangePassword);
profileRouter.patch('/edit', [blockUnauthenticated, editProfileValidation], userController.patchEditProfile);
profileRouter.patch('/changePassword', [blockUnauthenticated, changePasswordValidation], userController.patchChangePassword);
profileRouter.delete('/deleteUser', blockUnauthenticated, userController.deleteUser);

export default profileRouter;
