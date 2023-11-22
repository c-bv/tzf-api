import { TAuthRequest } from '@custom-types/custom-types';
import { projectService } from '@services';
import { ApiError } from '@utils/ApiError';
import { Response } from 'express';
import httpStatus from 'http-status';

/**
 * Retrieves a project by its ID.
 * @param req - The request object.
 * @param res - The response object.
 * @returns A Promise that resolves to void.
 * @throws {ApiError} If the project ID is missing or if the project is not found.
 */
export const getProject = async (req: TAuthRequest, res: Response): Promise<void> => {
    if (!req.params._id) throw new ApiError(httpStatus.BAD_REQUEST, 'Project id is required');

    const project = await projectService.getProjectById(req.params._id);
    if (!project) throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');

    res.status(httpStatus.OK).send(project);
};

/**
 * Retrieves the list of projects.
 * @param req - The request object.
 * @param res - The response object.
 * @returns A promise that resolves to void.
 * @throws {ApiError} If the projects are not found.
 */
export const getProjects = async (req: TAuthRequest, res: Response): Promise<void> => {
    const projects = await projectService.getProjects();
    if (!projects) throw new ApiError(httpStatus.NOT_FOUND, 'Projects not found');

    res.status(httpStatus.OK).send(projects);
};
