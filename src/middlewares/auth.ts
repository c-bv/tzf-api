import { TUser } from '@/models';
import { TAuthRequest } from '@custom-types/custom-types';
import { tokenService } from '@services';
import { ApiError } from '@utils/ApiError';
import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';

export const verifyAuth = (req: TAuthRequest, res: Response, next: NextFunction) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer '))
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized. No token provided.');

    const token = req.headers.authorization.split(' ')[1];

    const decoded = tokenService.verifyAuthToken(token);
    if (!decoded) throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized. Invalid token.');

    req.user = {
        _id: decoded.id,
        role: decoded.role
    } as TUser;
    next();
};

export const verifyRole = (role: TUser['role'] | TUser['role'][]) => {
    return (req: TAuthRequest, res: Response, next: NextFunction) => {
        if (!req.user || !role.includes(req.user.role)) {
            throw new ApiError(httpStatus.FORBIDDEN, 'Access denied. Insufficient permissions.');
        }
        next();
    };
};
