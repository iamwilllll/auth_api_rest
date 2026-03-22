import { Router } from 'express';

import {
    registerController,
    loginController,
    refreshEmailVerificationCodeController,
    emailConfirmController,
    getCurrentUserController,
    forgotPasswordController,
    resetPasswordController,
} from '@/controllers/index.js';

import {
    registerMiddlewares,
    loginMiddlewares,
    refreshEmailVerificationCodeMiddlewares,
    emailConfirmMiddlewares,
    authenticate,
    loadUser,
    forgotPasswordMiddlewares,
    resetPasswordMiddlewares,
} from '@/middlewares/index.js';
import { logoutController } from '@/controllers/auth/logout.controller.js';

const authRouter: Router = Router();

authRouter.post('/register', registerMiddlewares, registerController);
authRouter.post('/email/confirm', emailConfirmMiddlewares, emailConfirmController);
authRouter.post('/email/refresh', refreshEmailVerificationCodeMiddlewares, refreshEmailVerificationCodeController);
authRouter.post('/login', loginMiddlewares, loginController);
authRouter.post('/logout', authenticate, logoutController);
authRouter.get('/me', authenticate, loadUser, getCurrentUserController);

authRouter.post('/password/forgot', forgotPasswordMiddlewares, forgotPasswordController);
authRouter.post('/password/reset', resetPasswordMiddlewares, resetPasswordController);

export default authRouter;
