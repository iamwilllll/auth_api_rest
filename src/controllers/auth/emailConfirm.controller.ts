import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../errors/appError.error.js';
import { UserModel } from '../../models/user.model.js';
import { ApiResponse } from '../../helpers/response.js';
import { UserWithOutPassT } from '../../types/index.js';
import { getUserWithOutPass } from '../../utils/getUserWithOutPass.js';

export async function emailConfirmController(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, code } = req.body;
        const findUser = await UserModel.findOne({ email });
        if (!findUser) throw new AppError('Credential error.', 400, 'CREDENTIAL_ERROR');

        const expiresAt = new Date(findUser.otpCodeExpiration);
        const now = new Date();

        if (now > expiresAt) throw new AppError('OTP code was expired.', 409, 'VALIDATION_EMAIL_ERROR');
        if (findUser.otpCode !== code) throw new AppError('OTP code is incorrect.', 400, 'VALIDATION_EMAIL_ERROR');

        findUser.verified = true;
        findUser.otpCode = '';
        const savedUser = await findUser.save();

        ApiResponse.success<UserWithOutPassT>(res, 201, 'User was created successful', getUserWithOutPass(savedUser.toObject()));
    } catch (err) {
        next(err);
    }
}
