import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../../helpers/response.js';
import { UserModel } from '../../models/user.model.js';
import { AppError } from '../../errors/appError.error.js';
import { comparePassword, getUserWithOutPass } from '../../utils/index.js';
import { SessionModel } from '../../models/session.model.js';
import { env } from '../../config/env.js';
import jwt from 'jsonwebtoken';

export async function loginController(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password, rememberMe } = req.body;
        const credentialError = new AppError('Credential error.', 400, 'CREDENTIAL_ERROR');

        const existingUser = await UserModel.findOne({ email }).select('+password');

        if (!existingUser) throw credentialError;
        if (existingUser?.verified === false) throw new AppError('Authentication error.', 401, 'AUTH_ERROR');

        const passMatch = await comparePassword(password, existingUser.password);
        if (!passMatch) throw credentialError;

        await SessionModel.updateMany({ userId: existingUser._id, isValid: true }, { isValid: false });

        const duration = rememberMe ? env.TIMES.THREE_DAYS : env.TIMES.THREE_HOURS;
        const jwtDuration = rememberMe ? '3d' : '1h';

        const newSession = new SessionModel({
            userId: existingUser._id,
            isValid: true,
            rememberMe,
            expiresAt: new Date(Date.now() + duration),
        });

        const currentSession = await newSession.save();
        const JWT = jwt.sign({ sessionId: currentSession._id.toString() }, env.JWT.KEY, { expiresIn: jwtDuration });

        res.cookie('sessionId', JWT, {
            httpOnly: true,
            secure: true,
            maxAge: duration,
            sameSite: 'none',
        });

        return ApiResponse.success(res, 200, 'Login was successful', { user: getUserWithOutPass(existingUser.toObject()) });
    } catch (err) {
        next(err);
    }
}
