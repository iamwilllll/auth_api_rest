import { Server, Database } from './config/index.js';
import express from 'express';
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import { env } from './config/env.js';

(async () => {
    await Database.connect();
    await main();
})();

async function main() {
    const server = Server.init();
    server.set('trust proxy', 1);

    //* cors configuration
    const allowedOrigins: string[] = [env.baseUrl, 'http://localhost:5173', 'http://localhost:3000'];
    const corsOptions: CorsOptions = {
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);
            if (env.isDev) return callback(null, true);
            if (allowedOrigins.includes(origin)) return callback(null, true);

            return callback(new Error('Not allowed by CORS'));
        },
        credentials: true,
        optionsSuccessStatus: 200,
    };

    //* middlewares
    server.use(express.json());
    server.use(cookieParser());
    server.use(cors(corsOptions));

    //* routes
    server.use('/api', appRouter);
}
