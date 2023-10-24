import { authController } from '@controllers';
import asyncRouter from '@utils/asyncRouter';
import express from 'express';

const router = express.Router();

router.route('/register')
    .post(authController.register);

router.route('/login')
    .post(authController.login);

// router.post('/logout', validate(authValidation.logout), authController.logout);
// router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
// router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
// router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);
// router.post('/send-verification-email', auth(), authController.sendVerificationEmail);
// router.post('/verify-email', validate(authValidation.verifyEmail), authController.verifyEmail);

export default asyncRouter(router);