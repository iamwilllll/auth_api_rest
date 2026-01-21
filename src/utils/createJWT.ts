import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function createJWT(sessionId: string, exp?: number): string {
    const secret = env.JWT.KEY;
    return jwt.sign({ sessionId }, secret, { expiresIn: exp });
}
