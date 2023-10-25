import { asyncRouter } from '@utils/asyncRouter';
import express from 'express';

const router = express.Router();

export const docRouter = asyncRouter(router);
