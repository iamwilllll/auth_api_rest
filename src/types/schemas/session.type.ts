import { Types } from 'mongoose';

export type SessionT = {
    userId: Types.ObjectId;
    isValid: boolean;
    rememberMe: boolean;
    expiresAt: Date;
};
