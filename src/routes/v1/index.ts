import { config } from '@config/config';
import express from 'express';
import { authRouter } from './auth-router';
import { docRouter } from './doc-router';
import { usersRouter } from './users-router';

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRouter
    },
    {
        path: '/users',
        route: usersRouter
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
