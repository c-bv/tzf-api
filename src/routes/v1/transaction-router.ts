import { transactionController } from '@controllers';
import { ROLES_GROUPS, restrictToRoles } from '@middlewares/auth';
import { asyncRouter } from '@utils/asyncRouter';
import express from 'express';

const router = express.Router();

router.route('/').post(restrictToRoles(...ROLES_GROUPS.all), transactionController.createTransaction);

export const transactionRouter = asyncRouter(router);
