import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { AppError } from '../../errors/appError.error.js';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';

interface SessionPayload extends JwtPayload {
    sessionId: string
}


export function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies?.sessionId;
        if (!token) throw new AppError('No session token', 401, 'AUTH_ERROR');

        const { sessionId } = jwt.verify(token, env.JWT.KEY) as SessionPayload;
        req.sessionId = sessionId;

        return next();
    } catch (err) {
        next(err);
    }
}
