/**
 * @file This file defines the user routes for the API.
 * @summary This file contains the endpoints for user data, such as retrieving user data.
 */

import { usersController } from '@controllers';
import { roleGroupsByAccessLevel, verifyAuthAndRole, verifyOwner } from '@middlewares/auth';
import { asyncRouter } from '@utils/asyncRouter';
import express from 'express';

const router = express.Router();

router
    /**
     * Refreshes the user data based on the user id in the request object.
     * @name GET /v1/users/me
     * @function
     * @memberof module:userRouter
     * @inner
     * @param {Function} verifyAuthAndRole - Middleware function to verify user authentication and role.
     * @param {Function} userController.refreshUser - Controller function to retrieve user data.
     */
    .get('/me', verifyAuthAndRole(roleGroupsByAccessLevel.all), usersController.refreshUser)

    /**
     * GET user by ID.
     * @name GET /v1/users/:_id
     * @function
     * @memberof module:userRouter
     * @inner
     * @param {string} _id - The ID of the user to retrieve.
     * @param {Function} verifyAuthAndRole - Middleware function to verify user authentication and role.
     * @param {Function} verifyOwner - Middleware function to verify user ownership.
     * @param {Function} userController.getUser - Controller function to retrieve user data.
     */
    .get('/:_id', verifyAuthAndRole(roleGroupsByAccessLevel.all), verifyOwner, usersController.getUser);

export const usersRouter = asyncRouter(router);
