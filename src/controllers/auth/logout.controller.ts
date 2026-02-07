import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../errors/appError.error.js';
import { ApiResponse } from '../../helpers/response.js';
import { SessionModel } from '../../models/session.model.js';

export async function logoutController(req: Request, res: Response, next: NextFunction) {
    try {
        const sessionId = req.sessionId;
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
