import { config } from '@config/config';
import winston from 'winston';

const enumerateErrorFormat = winston.format((info: any) => {
    if (info instanceof Error) {
        Object.assign(info, { message: info.message, stack: info.stack });
    }
    return info;
});

export const logger = winston.createLogger({
    level: config.env === 'development' ? 'debug' : 'info',
    format: winston.format.combine(
        enumerateErrorFormat(),
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.printf((info: any) => `${info.timestamp} ${info.level}: ${info.stack || info.message}`)
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

if (config.env !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf((info: any) => `${info.timestamp} ${info.level}: ${info.message}`)
            )
        })
    );
}
