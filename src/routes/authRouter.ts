import { Router } from 'express';
import { errorMiddleware } from '../middlewares/errorMiddleware.middleware.js';

import {
    registerController,
    loginController,
    refreshEmailVerificationCodeController,
    emailConfirmController,
} from '../controllers/index.js';

import {
    registerMiddlewares,
    loginMiddlewares,
    refreshEmailVerificationCodeMiddlewares,
    emailConfirmMiddlewares,
} from '../middlewares/index.js';

const authRouter: Router = Router();

authRouter.post('/register', registerMiddlewares, registerController, errorMiddleware);
authRouter.post(
    '/email/refresh',
    refreshEmailVerificationCodeMiddlewares,
    refreshEmailVerificationCodeController,
    errorMiddleware
);
authRouter.post('/email/confirm', emailConfirmMiddlewares, emailConfirmController, errorMiddleware);
authRouter.post('/login', loginMiddlewares, loginController, errorMiddleware);

export default authRouter;
