import { projectController } from '@controllers';
import { asyncRouter } from '@utils/asyncRouter';
import express from 'express';

const router = express.Router();

router
    .route('/')
    /**
     * GET project by ID.
     * @name GET /v1/projects/:_id
     * @function
     * @memberof module:projectRouter
     * @param {string} _id - The ID of the project to retrieve.
     */
    .get(projectController.getProjects);

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

router
    .route('/:_id/activate')
    /**
     * PATCH project active status by ID.
     * @name PATCH /v1/projects/:_id/activate
     * @function
     * @memberof module:projectRouter
     * @param {string} _id - The ID of the project to update.
     */
    .patch(projectController.toggleProjectActive);

router
    .route('/:_id/publish')
    /**
     * PATCH project published status by ID.
     * @name PATCH /v1/projects/:_id/publish
     * @function
     * @memberof module:projectRouter
     * @param {string} _id - The ID of the project to update.
     */
    .patch(projectController.toggleProjectPublished);

export const projectRouter = asyncRouter(router);
