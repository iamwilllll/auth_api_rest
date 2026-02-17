import { body } from 'express-validator';
import { handleInputErrors } from '../handleInputErrors.middleware.js';

export const refreshEmailVerificationCodeMiddlewares = [
    body('email').trim().notEmpty().withMessage('E-mail is required.').isEmail().withMessage('E-mail is not valid.'),
    handleInputErrors,
];
