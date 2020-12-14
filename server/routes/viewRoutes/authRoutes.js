import express from 'express';
import auth from '../../middlewares/authentication';
import validation from '../../middlewares/validation';
import authController from '../../controllers/ViewController/authController';

const authRouter = express.Router();

authRouter.get('/signup', authController.getSignup);
authRouter.post('/signup', [validation.signupValidation], authController.postSignup);

authRouter.get('/login', authController.getLogin);
authRouter.post('/login', [validation.loginValidation], authController.postLogin);

authRouter.delete('/logout', [auth.blockUnauthenticated], authController.logout);

export default authRouter;
