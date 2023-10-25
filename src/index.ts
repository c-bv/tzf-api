import { config } from '@config/config';
import { connectDB } from '@config/db';
import { logger } from '@config/logger';
import { app } from './app';

const exitHandler = () => {
    if (!server) return process.exit(1);
    server.close(() => {
        logger.info('Server closed');
        process.exit(1);
    });
};

const unexpectedErrorHandler = (error: Error) => {
    logger.error(error);
    exitHandler();
};

const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

exitSignals.map(sig =>
    process.on(sig, () => {
        logger.info(`${sig} signal received.`);
        server && server.close();
    })
);

const server = app.listen(config.app.port, () => {
    logger.info(`Server is running on port ${config.app.port} in ${config.env} mode`);
    connectDB();
});
