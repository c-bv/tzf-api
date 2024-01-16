import { authController } from '@controllers';
import { asyncRouter } from '@utils/asyncRouter';
import express from 'express';

export const router = express.Router();

router
    /**
     * Registers a new user.
     * @name POST /register
     * @function
     * @memberof module:authRouter
     * @inner
     * @param {Object} req - The HTTP request object.
     * @param {Object} res - The HTTP response object.
     * @param {Function} next - The next middleware function.
     */
    .post('/register', authController.register)

    /**
     * Logs in a user.
     * @name POST /login
     * @function
     * @memberof module:authRouter
     * @inner
     * @param {Object} req - The HTTP request object.
     * @param {Object} res - The HTTP response object.
     * @param {Function} next - The next middleware function.
     */
    .post('/login', authController.login);

export const authRouter = asyncRouter(router);
