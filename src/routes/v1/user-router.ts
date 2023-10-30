import { TUser } from '@/models';
import { userController } from '@controllers';
import { verifyAuth, verifyRole } from '@middlewares/auth';
import { asyncRouter } from '@utils/asyncRouter';
import express from 'express';

const router = express.Router();

const autorizedRoles: TUser['role'][] = ['seller'];

router.get('get/:_id', verifyAuth, verifyRole('seller'), userController.getUser);

router.get('/current', verifyAuth, verifyRole(autorizedRoles), userController.checkUser);

export const userRouter = asyncRouter(router);
