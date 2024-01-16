import { transactionController } from '@controllers';
import { ROLES_GROUPS, restrictToRoles } from '@middlewares/auth';
import { asyncRouter } from '@utils/asyncRouter';
import express from 'express';

const router = express.Router();

router
    .route('/')
    /**
     * Creates a new transaction.
     * @name POST /v1/transactions
     * @function
     * @memberof module:transactionRouter
     */
    .post(restrictToRoles(...ROLES_GROUPS.all), transactionController.createTransaction);

export const transactionRouter = asyncRouter(router);
