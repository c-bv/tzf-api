import { TUser } from '@models';
import { TAuthRequest } from '@custom-types/custom-types';
import { tokenService } from '@services';
import { ApiError } from '@utils/ApiError';
import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';

type RoleGroups = {
    admin: ['admin'];
    buyer: ['buyer', 'consultingBuyer'];
    seller: ['seller', 'consultingSeller'];
    all: ['admin', 'buyer', 'seller', 'consultingBuyer', 'consultingSeller'];
};

export const ROLES_GROUPS = {
    admin: ['admin'] as RoleGroups['admin'],
    buyer: ['buyer', 'consultingBuyer'] as RoleGroups['buyer'],
    seller: ['seller', 'consultingSeller'] as RoleGroups['seller'],
    all: ['admin', 'buyer', 'seller', 'consultingBuyer', 'consultingSeller'] as RoleGroups['all']
};

export const loadUser = async (req: TAuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return next(new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized. No token provided.'));

    const decoded = tokenService.verifyAuthToken(token);
    if (!decoded) return next(new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized. Invalid token.'));

    req.user = {
        _id: decoded._id,
        role: decoded.role
    } as TUser;

    next();
};

export const restrictToSelf = (req: TAuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !req.user._id) return next(new ApiError(httpStatus.BAD_REQUEST, 'User id is required'));
    if (req.params._id !== req.user._id.toString())
        return next(new ApiError(httpStatus.FORBIDDEN, 'Access denied. This is not your resource.'));
    next();
};

export const restrictToRoles = (...roles: TUser['role'][]) => {
    return async (req: TAuthRequest, res: Response, next: NextFunction) => {
        if (!req.user || !req.user.role) return next(new ApiError(httpStatus.BAD_REQUEST, 'User role is required'));
        if (!roles.includes(req.user.role))
            return next(new ApiError(httpStatus.FORBIDDEN, 'Access denied. Insufficient permissions.'));
        next();
    };
};
