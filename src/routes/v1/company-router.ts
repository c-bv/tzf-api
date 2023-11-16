import { companyController } from '@controllers';
import { asyncRouter } from '@utils/asyncRouter';
import express from 'express';

const router = express.Router();

router
    .route('/:_id')
    /**
     * Route for getting a company by its ID.
     * @name GET /v1/companies/:_id
     * @function
     * @memberof module:companyRouter
     * @param {string} _id - The ID of the company to retrieve.
     */
    .get(companyController.getCompany);

export const companyRouter = asyncRouter(router);
