import { config } from '@config/config';
import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.max,
    standardHeaders: true,
    legacyHeaders: false,
    message: `Too many requests from this IP, please try again in ${config.rateLimit.windowMs / 1000} seconds.`
});
