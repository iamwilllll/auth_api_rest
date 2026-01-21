import { body } from 'express-validator';
import { handleInputErrors } from '../handleInputErrors.middleware.js';

export const loginMiddlewares = [
    body('email').trim().notEmpty().withMessage('Email is required.').toLowerCase().isEmail().withMessage('Invalid email.'),
    body('password').trim().notEmpty().withMessage('Password is required.'),
    body('rememberMe').isBoolean().withMessage('Remember me value is invalid.'),
    handleInputErrors,
];
