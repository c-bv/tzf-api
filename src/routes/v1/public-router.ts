import { asyncRouter } from '@utils/asyncRouter';
import express from 'express';

export const router = express.Router();

export const publicRouter = asyncRouter(router);
