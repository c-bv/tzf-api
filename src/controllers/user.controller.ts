import { tokenService, userService } from '@services';
import ApiError from '@utils/ApiError';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

const getUser = async (req: Request, res: Response) => {
    const user = await userService.getUserById(req.params.id);
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    res.send(user);
};

const checkUser = async (req: Request, res: Response) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer '))
        throw new ApiError(401, 'Unauthorized - no token provided');

    const token = req.headers.authorization.split(' ')[1];

    const decoded = tokenService.verifyAuthToken(token) as any;
    if (!decoded) throw new ApiError(401, 'Unauthorized - invalid token');

    const user = await userService.getUserById(decoded.id);
    if (!user) throw new ApiError(404, 'User not found');

    res.status(httpStatus.OK).send(user);
};

export default {
    getUser,
    checkUser
};
