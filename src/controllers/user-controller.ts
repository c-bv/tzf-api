import { TAuthRequest } from '@custom-types/custom-types';
import { userService } from '@services';
import { ApiError } from '@utils/ApiError';
import { Response } from 'express';
import httpStatus from 'http-status';

/**
 * Refreshes the user data based on the user id in the request object.
 * @param {TAuthRequest} req - The request object containing the user id.
 * @param {Response} res - The response object to send the user data.
 * @throws {ApiError} If user id is not provided or user is not found.
 * @returns {Promise<void>}
 */
export const refreshUser = async (req: TAuthRequest, res: Response): Promise<void> => {
    if (!req.user || !req.user._id) throw new ApiError(httpStatus.BAD_REQUEST, 'User id is required');

    const user = await userService.getUserById(req.user._id.toString());
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

    res.status(httpStatus.OK).send(user);
};

/**
 * Get all users.
 * @param {TAuthRequest} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>}
 */
export const getUsers = async (req: TAuthRequest, res: Response): Promise<void> => {
    const users = await userService.getUsers();
    res.status(httpStatus.OK).send(users);
};

/**
 * Get a user by id
 * @param {TAuthRequest} req - The request object containing the user id
 * @param {Response} res - The response object
 * @returns {Promise<void>}
 * @throws {ApiError} - If user id is not provided or user is not found
 */
export const getUser = async (req: TAuthRequest, res: Response): Promise<void> => {
    if (!req.params._id) throw new ApiError(httpStatus.BAD_REQUEST, 'User id is required');

    const user = await userService.getUserById(req.params._id);
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

    res.status(httpStatus.OK).send(user);
};
