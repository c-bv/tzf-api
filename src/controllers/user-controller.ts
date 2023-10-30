import { TAuthRequest } from '@custom-types/custom-types';
import { userService } from '@services';
import { ApiError } from '@utils/ApiError';
import { Response } from 'express';
import httpStatus from 'http-status';

export const getUser = async (req: TAuthRequest, res: Response) => {
    if (!req.params._id) throw new ApiError(httpStatus.BAD_REQUEST, 'User id is required');

    const user = await userService.getUserById(req.params._id);
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

    res.status(httpStatus.OK).send(user);
};

export const checkUser = async (req: TAuthRequest, res: Response) => {
    if (!req.user || !req.user._id) throw new ApiError(httpStatus.BAD_REQUEST, 'User id is required');

    const user = await userService.getUserById(req.user._id.toString());
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

    res.status(httpStatus.OK).send(user);
};
