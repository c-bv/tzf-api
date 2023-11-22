import { TAuthRequest } from '@custom-types/custom-types';
import { userService } from '@services';
import { ApiError } from '@utils/ApiError';
import { Response } from 'express';
import httpStatus from 'http-status';

/**
 * Refreshes the user data based on the user id in the request object.
 * @param {TAuthRequest} req - The request object containing the user id.
 * @param {Response} res - The response object to send the user data.
 * @returns A promise that resolves to void.
 * @throws {ApiError} If user id is not provided or user is not found.
 */
export const refreshUser = async (req: TAuthRequest, res: Response): Promise<void> => {
    if (!req.user || !req.user._id) throw new ApiError(httpStatus.BAD_REQUEST, 'User id is required');

    const user = await userService.getUserById(req.user._id.toString());
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

    res.status(httpStatus.OK).send(user);
};

/**
 * Get a user by id
 * @param {TAuthRequest} req - The request object containing the user id
 * @param {Response} res - The response object
 * @returns A promise that resolves to void.
 * @throws {ApiError} - If user id is not provided or user is not found
 */
export const getUser = async (req: TAuthRequest, res: Response): Promise<void> => {
    if (!req.params._id) throw new ApiError(httpStatus.BAD_REQUEST, 'User id is required');

    const user = await userService.getUserById(req.params._id);
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

    res.status(httpStatus.OK).send(user);
};

/**
 * Get all users.
 * @param {TAuthRequest} req - The request object.
 * @param {Response} res - The response object.
 * @returns A promise that resolves to void.
 */
export const getUsers = async (req: TAuthRequest, res: Response): Promise<void> => {
    const users = await userService.getUsers();

    res.status(httpStatus.OK).send(users);
};

/**
 * Retrieves users by company ID.
 * @param req - The request object.
 * @param res - The response object.
 * @returns A Promise that resolves to void.
 * @throws {ApiError} If the company ID is missing.
 */
export const getUsersByCompany = async (req: TAuthRequest, res: Response): Promise<void> => {
    if (!req.params.companyId) throw new ApiError(httpStatus.BAD_REQUEST, 'Company id is required');

    const users = await userService.getUsersByCompanyId(req.params.companyId);

    res.status(httpStatus.OK).send(users);
};

/**
 * Deletes a user.
 * @param req - The request object.
 * @param res - The response object.
 * @returns A promise that resolves to void.
 * @throws {ApiError} If the user id is missing or if the user is not found.
 */
export const deleteUser = async (req: TAuthRequest, res: Response): Promise<void> => {
    if (!req.params._id) throw new ApiError(httpStatus.BAD_REQUEST, 'User id is required');

    const user = await userService.deleteUser(req.params._id);
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

    res.status(httpStatus.OK).send(user);
};

/**
 * Updates a user.
 * @param req - The request object.
 * @param res - The response object.
 * @returns A promise that resolves to void.
 * @throws {ApiError} If the user id is missing or if the user is not found.
 */
export const updateUser = async (req: TAuthRequest, res: Response): Promise<void> => {
    if (!req.params._id) throw new ApiError(httpStatus.BAD_REQUEST, 'User id is required');

    const user = await userService.updateUser(req.params._id, req.body);
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

    res.status(httpStatus.OK).send(user);
};

/**
 * Toggles the active status of a user.
 * @param req - The request object.
 * @param res - The response object.
 * @returns A Promise that resolves to void.
 * @throws {ApiError} If the user id is missing or if the user is not found.
 */
export const toggleUserActive = async (req: TAuthRequest, res: Response): Promise<void> => {
    if (!req.params._id) throw new ApiError(httpStatus.BAD_REQUEST, 'User id is required');

    const user = await userService.getUserById(req.params._id);
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

    user.active = !user.active;
    await userService.updateUser(req.params._id, { active: user.active });

    res.status(httpStatus.OK).send(user);
};

/**
 * Toggles the verification status of a user.
 * @param req - The request object containing the user id in the params.
 * @param res - The response object to send the updated user.
 * @returns A Promise that resolves to void.
 * @throws {ApiError} If the user id is missing or the user is not found.
 */
export const toggleUserVerified = async (req: TAuthRequest, res: Response): Promise<void> => {
    if (!req.params._id) throw new ApiError(httpStatus.BAD_REQUEST, 'User id is required');

    const user = await userService.getUserById(req.params._id);
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

    user.verified = !user.verified;
    await userService.updateUser(req.params._id, { verified: user.verified });

    res.status(httpStatus.OK).send(user);
};
