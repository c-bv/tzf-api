import { bodySanitizer, loadUser } from '@middlewares/auth';
import express from 'express';
import { authRouter } from './auth-router';
import { companyRouter } from './company-router';
import { docRouter } from './doc-router';
import { projectRouter } from './project-router';
import { publicRouter } from './public-router';
import { transactionRouter } from './transaction-router';
import { userRouter } from './user-router';

const router = express.Router();

const authRoutes = [
    {
        path: '/users',
        route: userRouter
    },
    {
        path: '/companies',
        route: companyRouter
    },
    {
        path: '/projects',
        route: projectRouter
    },
    {
        path: '/transactions',
        route: transactionRouter
    }
];

const publicRoutes = [
    {
        path: '/auth',
        route: authRouter
    },
    {
        path: '/public',
        route: publicRouter
    },
    {
        path: '/doc',
        route: docRouter
    }
];

authRoutes.forEach(route => router.use(route.path, loadUser, bodySanitizer, route.route));

publicRoutes.forEach(route => router.use(route.path, route.route));

export { router };
