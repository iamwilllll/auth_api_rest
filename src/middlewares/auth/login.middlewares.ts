import { body } from 'express-validator';
import { handleInputErrors } from '../handleInputErrors.middleware.js';

export const loginMiddlewares = [
    body('email').trim().notEmpty().withMessage('E-mail is required.').toLowerCase().isEmail().withMessage('E-mail is not valid.'),
    body('password').trim().notEmpty().withMessage('Password is required.'),
    body('rememberMe').isBoolean().withMessage('Remember me value is invalid.'),
    handleInputErrors,
];
