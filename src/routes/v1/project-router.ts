import { projectController } from '@controllers';
import { restrictToProjectOwner, restrictToRoles, ROLES_GROUPS } from '@middlewares/auth';
import { asyncRouter } from '@utils/asyncRouter';
import express from 'express';

const router = express.Router();

router
    .route('/')
    /**
     * GET all projects.
     * @name GET /v1/projects
     * @function
     * @memberof module:projectRouter
     */
    .get(restrictToRoles(...ROLES_GROUPS.all), projectController.getProjects)

    /**
     * POST a new project.
     * @name POST /v1/projects
     * @function
     * @memberof module:projectRouter
     */
    .post(restrictToRoles(...ROLES_GROUPS.seller), projectController.createProject);

router
    .route('/:_id')
    /**
     * GET project by ID.
     * @name GET /v1/projects/:_id
     * @function
     * @memberof module:projectRouter
     * @param {string} _id - The ID of the project to retrieve.
     */
    .get(restrictToRoles(...ROLES_GROUPS.all), projectController.getProject)

    /**
     * PATCH project by ID.
     * @name PATCH /v1/projects/:_id
     * @function
     * @memberof module:projectRouter
     * @param {string} _id - The ID of the project to update.
     */
    .patch(restrictToRoles(...ROLES_GROUPS.seller), restrictToProjectOwner, projectController.updateProject)

    /**
     * DELETE project by ID.
     * @name DELETE /v1/projects/:_id
     * @function
     * @memberof module:projectRouter
     * @param {string} _id - The ID of the project to delete.
     */
    .delete(restrictToRoles(...ROLES_GROUPS.seller), restrictToProjectOwner, projectController.deleteProject);

router
    .route('/:_id/activate')
    /**
     * PATCH project active status by ID.
     * @name PATCH /v1/projects/:_id/activate
     * @function
     * @memberof module:projectRouter
     * @param {string} _id - The ID of the project to update.
     */
    .patch(restrictToRoles(...ROLES_GROUPS.admin), projectController.toggleProjectActive);

router
    .route('/:_id/publish')
    /**
     * PATCH project published status by ID.
     * @name PATCH /v1/projects/:_id/publish
     * @function
     * @memberof module:projectRouter
     * @param {string} _id - The ID of the project to update.
     */
    .patch(restrictToRoles(...ROLES_GROUPS.admin), projectController.toggleProjectPublished);

export const projectRouter = asyncRouter(router);
