import { userController } from '@controllers';
import { restrictToRoles, restrictToSelf, ROLES_GROUPS } from '@middlewares/auth';
import { asyncRouter } from '@utils/asyncRouter';
import express from 'express';

const router = express.Router();

router
    .route('/')
    /**
     * GET all users.
     * @name GET /v1/users
     * @function
     * @memberof module:userRouter
     */
    .get(restrictToRoles(...ROLES_GROUPS.admin), userController.getUsers);

router
    .route('/me')
    /**
     * Refreshes the user data based on the user id in the request object.
     * @name GET /v1/users/me
     * @function
     * @memberof module:userRouter
     */
    .get(userController.refreshUser);

router
    .route('/:_id')
    /**
     * GET user by ID.
     * @name GET /v1/users/:_id
     * @function
     * @memberof module:userRouter
     * @param {string} _id - The ID of the user to retrieve.
     */
    .get(restrictToSelf, userController.getUser)

    /**
     * DELETE user by ID.
     * @name DELETE /v1/users/:_id
     * @function
     * @memberof module:userRouter
     * @param {string} _id - The ID of the user to delete.
     */
    .delete(restrictToRoles(...ROLES_GROUPS.admin), userController.deleteUser)

    /**
     * PATCH user by ID.
     * @name PATCH /v1/users/:_id
     * @function
     * @memberof module:userRouter
     * @param {string} _id - The ID of the user to update.
     */
    .patch(restrictToSelf, userController.updateUser);

router
    .route('/:_id/activate')
    /**
     * PATCH user activation status by ID.
     * @name PATCH /v1/users/:_id/activate
     * @function
     * @memberof module:userRouter
     * @param {string} _id - The ID of the user to toggle activation status.
     */
    .patch(restrictToRoles(...ROLES_GROUPS.admin), userController.toggleUserActive);

router
    .route('/:_id/verify')
    /**
     * PATCH user verification status by ID.
     * @name PATCH /v1/users/:_id/verify
     * @function
     * @memberof module:userRouter
     * @param {string} _id - The ID of the user to toggle verification status.
     */
    .patch(restrictToRoles(...ROLES_GROUPS.admin), userController.toggleUserVerified);

router
    .route('/company/:companyId')
    /**
     * GET users by company ID.
     * @name GET /v1/users/company/:companyId
     * @function
     * @memberof module:userRouter
     * @param {string} companyId - The ID of the company.
     */
    .get(restrictToRoles(...ROLES_GROUPS.admin), userController.getUsersByCompany);

export const userRouter = asyncRouter(router);
