import { TAuthRequest } from '@custom-types/custom-types';
import { companyService, projectService } from '@services';
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

    const project = await projectService.getProjectById(req.params._id, { populate: 'company' });
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

/**
 * Creates a new project.
 * @param req - The request object containing the project data.
 * @param res - The response object.
 * @returns A promise that resolves to void.
 * @throws {ApiError} If the user id is missing or if the company is not found.
 */
export const createProject = async (req: TAuthRequest, res: Response): Promise<void> => {
    if (!req.user || !req.user._id) throw new ApiError(httpStatus.BAD_REQUEST, 'User id is required');

    const userCompany = await companyService.getCompanyByUserId(req.user._id.toString());
    if (!userCompany) throw new ApiError(httpStatus.NOT_FOUND, 'Company not found');

    req.body.company = userCompany._id;

    const project = await projectService.createProject(req.body);

    res.status(httpStatus.CREATED).send(project);
};

/**
 * Toggles the active status of a project.
 * @param req - The request object containing the project id.
 * @param res - The response object.
 * @returns A Promise that resolves to void.
 * @throws {ApiError} If the project id is missing or the project is not found.
 */
export const toggleProjectActive = async (req: TAuthRequest, res: Response): Promise<void> => {
    if (!req.params._id) throw new ApiError(httpStatus.BAD_REQUEST, 'Project id is required');

    const project = await projectService.getProjectById(req.params._id);
    if (!project) throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');

    project.isActive = !project.isActive;

    await projectService.updateProject(req.params._id, { isActive: project.isActive });

    res.status(httpStatus.OK).send(project);
};

/**
 * Toggles the published status of a project.
 * @param req - The request object.
 * @param res - The response object.
 * @returns A Promise that resolves to void.
 * @throws {ApiError} If the project id is missing or if the project is not found.
 */
export const toggleProjectPublished = async (req: TAuthRequest, res: Response): Promise<void> => {
    if (!req.params._id) throw new ApiError(httpStatus.BAD_REQUEST, 'Project id is required');

    const project = await projectService.getProjectById(req.params._id);
    if (!project) throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');

    project.isPublished = !project.isPublished;

    await projectService.updateProject(req.params._id, { isPublished: project.isPublished });

    res.status(httpStatus.OK).send(project);
};

/**
 * Updates a project.
 * @param req - The request object.
 * @param res - The response object.
 * @returns A promise that resolves to void.
 * @throws {ApiError} If the project id is missing or if the project is not found.
 */
export const updateProject = async (req: TAuthRequest, res: Response): Promise<void> => {
    if (!req.params._id) throw new ApiError(httpStatus.BAD_REQUEST, 'Project id is required');

    const project = await projectService.updateProject(req.params._id, req.body);
    if (!project) throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');

    res.status(httpStatus.OK).send(project);
};

/**
 * Deletes a project.
 * @param req - The request object.
 * @param res - The response object.
 * @returns A Promise that resolves to void.
 * @throws {ApiError} If the project id is missing or if the project is not found.
 */
export const deleteProject = async (req: TAuthRequest, res: Response): Promise<void> => {
    if (!req.params._id) throw new ApiError(httpStatus.BAD_REQUEST, 'Project id is required');

    const project = await projectService.getProjectById(req.params._id);
    if (!project) throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');

    // TODO: Check if the project is in any transaction and archive it if so, otherwise delete it.

    // const projectsInTransactions = await Transaction.find({ projects: { $elemMatch: { _id: req.params.id } } });

    // if (projectsInTransactions.length > 0) projectService.archiveProject(req.params._id);
    // else projectService.deleteProject(req.params._id);

    res.status(httpStatus.OK).send('TODO');
};
