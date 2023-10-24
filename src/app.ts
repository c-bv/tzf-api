import config from '@config/config';
import error from '@middlewares/error';
import rateLimiter from '@middlewares/rateLimiter';
import router from '@routes/v1';
import ApiError from '@utils/ApiError';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use((req: Request, res: Response, next: NextFunction) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept',
    });
    next();
});

config.env === 'production' && app.use('/v1/auth', rateLimiter);

// v1 api routes
app.use('/v1', router);

app.get('/status', (req: Request, res: Response) => {
    res.status(200).send('OK');
});

app.use((req: Request, res: Response, next: any) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(error.converter);
app.use(error.handler);

export default app;