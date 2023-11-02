import { config } from '@config/config';
import { logger } from '@config/logger';
import { ApiError } from '@utils/ApiError';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import mongoose from 'mongoose';

export const converter = (err: any, req: Request, res: Response, next: NextFunction) => {
    let error = err;
    if (!(err instanceof ApiError)) {
        error = new ApiError(
            err.status || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR,
            err.message || httpStatus[err.status],
            err.stack
        );
    }
    next(error);
};

export const handler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const response = {
        code: err.status,
        message: err.message || httpStatus[err.status],
        ...(config.env === 'development' && { stack: err.stack })
    };
    res.status(err.status).send(response);
    logger.error(err);
};
