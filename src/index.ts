import 'module-alias/register';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import createCSM from 'docify-api';

import { appRouter } from '@/routes/index.js';
import { Server, Database, env } from '@/config/index.js';
import { errorMiddleware } from '@/middlewares/index.js';

(async () => {
    await Database.connect();
    await main();
})();

async function main() {
    // * server initialization
    const server = Server.init();

    // * proxy
    server.set('trust proxy', 1);
    server.use(cookieParser());

    // * api documentation
    server.use(createCSM({ mode: env.isDev ? 'development' : 'production' }));

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
    server.use(cors(corsOptions));

    //* routes
    server.use('/api', appRouter);

    //* error handling middleware
    server.use(errorMiddleware);
}
