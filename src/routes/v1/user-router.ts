import { userController } from '@controllers';
import { roleGroupsByAccessLevel, verifyAuthAndRole, verifyOwner } from '@middlewares/auth';
import { asyncRouter } from '@utils/asyncRouter';
import express from 'express';

const router = express.Router();

router
    .route('/me')
    /**
     * Refreshes the user data based on the user id in the request object.
     * @name GET /v1/users/me
     * @function
     * @memberof module:userRouter
     */
    .get(verifyAuthAndRole(roleGroupsByAccessLevel.all), userController.refreshUser);

router
    .route('/:_id')
    /**
     * GET user by ID.
     * @name GET /v1/users/:_id
     * @function
     * @memberof module:userRouter
     * @param {string} _id - The ID of the user to retrieve.
     */
    .get(verifyAuthAndRole(roleGroupsByAccessLevel.all), verifyOwner, userController.getUser);

export const userRouter = asyncRouter(router);
