import { Router } from 'express';
import { registerController } from '../controllers/index.js';
import { handleInputErrors, registerMiddlewares, loginMiddlewares } from '../middlewares/index.js';
import { errorMiddleware } from '../middlewares/errorMiddleware.middleware.js';
import { loginController } from '../controllers/auth/login.controller.js';

const authRouter: Router = Router();

authRouter.post('/register', registerMiddlewares, handleInputErrors, registerController, errorMiddleware);
authRouter.post('/login', loginMiddlewares, handleInputErrors, loginController, errorMiddleware);

export default authRouter;
