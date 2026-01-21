import { Server, Database } from './config/index.js';
import express from 'express';
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';

(async () => {
    await Database.connect();
    await main();
})();

async function main() {
    const server = Server.init();

    //* middlewares
    server.use(express.json());
    server.use(cookieParser());

    //* routes
    server.use(appRouter);
}
