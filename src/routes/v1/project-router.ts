import { projectController } from '@controllers';
import { asyncRouter } from '@utils/asyncRouter';
import express from 'express';

const router = express.Router();

router
    .route('/:_id')
    /**
     * GET project by ID.
     * @name GET /v1/projects/:_id
     * @function
     * @memberof module:projectRouter
     * @param {string} _id - The ID of the project to retrieve.
     */
    .get(projectController.getProject);

export const projectRouter = asyncRouter(router);
