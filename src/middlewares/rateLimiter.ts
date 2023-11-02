import { config } from '@config/config';
import rateLimit from 'express-rate-limit';
import httpStatus from 'http-status';

export const rateLimiter = rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.max,
    standardHeaders: true,
    legacyHeaders: false,
    message: `${httpStatus.TOO_MANY_REQUESTS} - ${httpStatus[429]} - ${httpStatus['429_MESSAGE']} Try again in ${
        config.rateLimit.windowMs / 1000 / 60
    } minutes.`
});
