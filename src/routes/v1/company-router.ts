import { companyController } from '@controllers';
import { ROLES_GROUPS, restrictToRoles } from '@middlewares/auth';
import { asyncRouter } from '@utils/asyncRouter';
import express from 'express';

const router = express.Router();

router
    .route('/new')
    /**
     * Route for creating a new company.
     * @name POST /v1/companies/new
     * @function
     * @memberof module:companyRouter
     */
    .post(restrictToRoles(...ROLES_GROUPS.all), companyController.createCompany);

router
    .route('/:_id')
    /**
     * Route for getting a company by its ID.
     * @name GET /v1/companies/:_id
     * @function
     * @memberof module:companyRouter
     * @param {string} _id - The ID of the company to retrieve.
     */
    .get(restrictToRoles(...ROLES_GROUPS.all), companyController.getCompany)

    /**
     * Route for updating a company by its ID.
     * @name PATCH /v1/companies/:_id
     * @function
     * @memberof module:companyRouter
     * @param {string} _id - The ID of the company to update.
     */
    .patch(restrictToRoles(...ROLES_GROUPS.all), companyController.updateCompany)

    /**
     * Route for deleting a company by its ID.
     * @name DELETE /v1/companies/:_id
     * @function
     * @memberof module:companyRouter
     * @param {string} _id - The ID of the company to delete.
     */
    .delete(restrictToRoles(...ROLES_GROUPS.admin), companyController.deleteCompany);

router
    .route('/:id/white-label')
    /**
     * Route for toggling the white label status of a company.
     * @name PATCH /v1/companies/:id/white-label
     * @function
     * @memberof module:companyRouter
     * @param {string} id - The ID of the company to update.
     */
    .patch(restrictToRoles(...ROLES_GROUPS.admin), companyController.toggleWhiteLabel);

export const companyRouter = asyncRouter(router);
