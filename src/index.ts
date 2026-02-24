import { Server, Database } from './config/index.js';
import express from 'express';
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import { env } from './config/env.js';
import path from 'node:path';
import { fileURLToPath } from 'url';

(async () => {
    await Database.connect();
    await main();
})();

async function main() {
    // * server initialization
    const server = Server.init();

    // * proxy
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

    // * static files
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    server.use(express.static(path.join(__dirname, 'public')));
    server.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
}
