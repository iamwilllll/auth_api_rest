import { body } from 'express-validator';
import { handleInputErrors } from '../handleInputErrors.middleware.js';

export const emailConfirmMiddlewares = [
    body('email').trim().notEmpty().withMessage('E-mail is required.').isEmail().withMessage('E-mail is not valid.'),
    body('otpCode')
        .trim()
        .notEmpty()
        .withMessage('OTP code is required.')
        .custom((otpCode) => (otpCode.length <= 6 ? true : false))
        .withMessage('OTP code is invalid.'),
    handleInputErrors,
];
