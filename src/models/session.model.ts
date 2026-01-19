import mongoose, { Schema, Document, Types } from 'mongoose';
import { type SessionT } from '../types/index.js';

type SessionDocT = SessionT & Document;

const SessionSchema = new Schema<SessionDocT>(
    {
        userId: { type: Types.ObjectId, ref: 'User', required: true },
        isValid: { type: Boolean, required: true },
        rememberMe: { type: Boolean, required: true },
        expiresAt: { type: Date, required: true },
    },
    { timestamps: false, versionKey: false }
);

SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const SessionModel = mongoose.model<SessionDocT>('Session', SessionSchema);
