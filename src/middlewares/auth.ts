import { TUser } from '@/models';
import { TAuthRequest } from '@custom-types/custom-types';
import { tokenService } from '@services';
import { ApiError } from '@utils/ApiError';
import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';

export const roleGroupsByAccessLevel = {
    all: ['admin', 'buyer', 'seller', 'consultingBuyer', 'consultingSeller'] as TUser['role'][],
    high: ['admin'] as TUser['role'][],
    medium: ['buyer', 'seller', 'consultingBuyer', 'consultingSeller'] as TUser['role'][]
};

/**
 * Verify authentication and role of the user.
 * @param roles - User role(s) to verify.
 * @returns Express middleware function.
 * @throws ApiError with status code 401 if no token is provided or token is invalid.
 * @throws ApiError with status code 403 if user role is not authorized to access the resource.
 */
export const verifyAuthAndRole = (roles: TUser['role'] | TUser['role'][]) => {
    return async (req: TAuthRequest, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized. No token provided.');
        const decoded = tokenService.verifyAuthToken(token);
        if (!decoded) throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized. Invalid token.');

        if (!roles.includes(decoded.role))
            throw new ApiError(httpStatus.FORBIDDEN, 'Access denied. Insufficient permissions.');
        req.user = {
            _id: decoded._id,
            role: decoded.role
        } as TUser;

        next();
    };
};

/**
 * Verify if the authenticated user is the owner of the requested resource.
 * @param {TAuthRequest} req - The authenticated request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @throws {ApiError} - If the user id is missing or if the requested resource does not belong to the authenticated user.
 */
export const verifyOwner = (req: TAuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !req.user._id) throw new ApiError(httpStatus.BAD_REQUEST, 'User id is required');
    if (req.params._id !== req.user._id.toString())
        throw new ApiError(httpStatus.FORBIDDEN, 'Access denied. This is not your resource.');
    next();
};
