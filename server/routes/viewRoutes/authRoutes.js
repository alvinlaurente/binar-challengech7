import express from 'express';
import auth from '../../middlewares/authentication';
import validation from '../../middlewares/validation';
import authController from '../../controllers/ViewController/authController';

const authRouter = express.Router();

authRouter.get('/signup', [auth.blockAuthenticated], authController.getSignup);
authRouter.post('/signup', [auth.blockAuthenticated, validation.signupValidation], authController.postSignup);

authRouter.get('/login', [auth.blockAuthenticated], authController.getLogin);
authRouter.post('/login', [auth.blockAuthenticated, validation.loginValidation], authController.postLogin);

authRouter.delete('/logout', [auth.blockUnauthenticated], authController.logout);

export default authRouter;
