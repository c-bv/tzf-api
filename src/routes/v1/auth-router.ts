/**
 * @file This file defines the authentication routes for the API.
 * @summary This file contains the endpoints for user authentication, such as registering, logging in, and resetting passwords.
 */

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

// router.post('/logout', validate(authValidation.logout), authController.logout);
// router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
// router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
// router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);
// router.post('/send-verification-email', auth(), authController.sendVerificationEmail);
// router.post('/verify-email', validate(authValidation.verifyEmail), authController.verifyEmail);

export const authRouter = asyncRouter(router);
