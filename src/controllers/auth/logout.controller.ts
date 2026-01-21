import { Request, Response, NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { env } from '../../config/env.js';
import { AppError } from '../../errors/appError.error.js';
import { ApiResponse } from '../../helpers/response.js';
import { SessionModel } from '../../models/session.model.js';

interface SessionPayload extends JwtPayload {
    data: {
        sessionId: string;
        userId: string;
    };
}

export async function logoutController(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies?.sessionId;
        if (!token) throw new AppError('No session token', 401, 'AUTH_ERROR');

        const { decoded } = jwt.verify(token, env.JWT.KEY) as SessionPayload;
        const sessionId = decoded.data;

        const findSession = await SessionModel.findById(sessionId);
        if (!findSession) throw new AppError('Session not found.', 404, 'SESSION_ERROR');

        findSession.isValid = false;
        findSession.save();

        res.clearCookie('sessionId');
        ApiResponse.success(res, 200, 'Logged out was successful');
    } catch (err) {
        next(err);
    }
}
