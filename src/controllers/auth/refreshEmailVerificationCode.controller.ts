import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../errors/appError.error.js';
import { UserModel } from '../../models/user.model.js';
import { createOtpCode } from '../../utils/createOtpCode.js';
import { env } from '../../config/env.js';
import { ApiResponse } from '../../helpers/response.js';
import { UserWithOutPassT } from '../../types/index.js';
import { getUserWithOutPass } from '../../utils/getUserWithOutPass.js';

export async function refreshEmailVerificationCodeController(req: Request, res: Response, next: NextFunction) {
    try {
        const email = req.body.email;
        const credentialError = new AppError('Credential error.', 400, 'CREDENTIAL_ERROR');
        const findUser = await UserModel.findOne({ email });
        if (!findUser) throw credentialError;

        if (findUser.verified) throw new AppError('User is already verified.', 409, 'USER_ALREADY_VERIFIED');

        const otpCode = createOtpCode();
        findUser.otpCode = otpCode;
        findUser.otpCodeExpiration = new Date(Date.now() + env.TIMES.TEN_MINUTES);

        const savedUser = await findUser.save();
        ApiResponse.success<UserWithOutPassT>(
            res,
            201,
            'OTP Code was refresh successful',
            getUserWithOutPass(savedUser.toObject())
        );
    } catch (err) {
        next(err);
    }
}
