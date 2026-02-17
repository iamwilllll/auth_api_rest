import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../errors/appError.error.js';
import { UserModel } from '../../models/user.model.js';
import { ApiResponse } from '../../helpers/response.js';
import { UserWithOutPassT } from '../../types/index.js';
import { getUserWithOutPass } from '../../utils/getUserWithOutPass.js';

export async function emailConfirmController(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, otpCode } = req.body;

        const user = await UserModel.findOne({ email, otpCode });
        if (!user) return ApiResponse.error(res, 400, 'Invalid OTP code', 'CODE_INVALID');
        if (!user.otpCodeExpiration || new Date() > user.otpCodeExpiration) throw new AppError('OTP code was expired.', 409, 'CODE_EXPIRED');

        const updatedUser = await UserModel.findByIdAndUpdate(
            user._id,
            {
                verified: true,
                $unset: {
                    otpCode: '',
                    otpCodeExpiration: '',
                },
            },
            { new: true }
        );

        return ApiResponse.success<UserWithOutPassT>(res, 200, 'Email successfully verified', getUserWithOutPass(updatedUser!.toObject()));
    } catch (err) {
        next(err);
    }
}
