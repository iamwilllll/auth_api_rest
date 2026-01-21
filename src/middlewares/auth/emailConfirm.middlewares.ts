import { body } from 'express-validator';
import { handleInputErrors } from '../handleInputErrors.middleware.js';

export const emailConfirmMiddlewares = [
    body('email').trim().notEmpty().withMessage('Email is required.').isEmail().withMessage('Email is invalid.'),
    body('code')
        .trim()
        .notEmpty()
        .withMessage('OTP code is required')
        .custom((code) => (code.length <= 6 ? true : false))
        .withMessage('OTP code is invalid'),
    handleInputErrors,
];
