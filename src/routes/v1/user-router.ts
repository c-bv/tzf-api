import { userController } from '@controllers';
import { asyncRouter } from '@utils/asyncRouter';
import express from 'express';

const router = express.Router();

router.route('/:id').get(userController.getUser);

router.route('/check').post(userController.checkUser);

export const userRouter = asyncRouter(router);
