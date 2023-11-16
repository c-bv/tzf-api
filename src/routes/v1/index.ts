import { config } from '@config/config';
import express from 'express';
import { authRouter } from './auth-router';
import { docRouter } from './doc-router';
import { userRouter } from './user-router';
import { companyRouter } from './company-router';

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRouter
    },
    {
        path: '/users',
        route: userRouter
    },
    {
        path: '/companies',
        route: companyRouter
    }
];

const devRoutes = [
    {
        path: '/doc',
        route: docRouter
    }
];

defaultRoutes.forEach(route => {
    router.use(route.path, route.route);
});

config.env === 'development' &&
    devRoutes.forEach(route => {
        router.use(route.path, route.route);
    });

export { router };
