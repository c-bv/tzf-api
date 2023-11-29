import { TAuthRequest } from '@custom-types/custom-types';
import { TUser } from '@models';
import { companyService, projectService, tokenService } from '@services';
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

export const restrictToRoles = (...roles: TUser['role'][]) => {
    return async (req: TAuthRequest, res: Response, next: NextFunction) => {
        if (!req.user || !req.user.role) return next(new ApiError(httpStatus.BAD_REQUEST, 'User role is required'));

        if (ROLES_GROUPS.admin.includes(req.user.role as any)) return next();

        if (!roles.includes(req.user.role))
            return next(new ApiError(httpStatus.FORBIDDEN, 'Access denied. Insufficient permissions.'));

        next();
    };
};

export const restrictToSelf = (req: TAuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !req.user._id) return next(new ApiError(httpStatus.BAD_REQUEST, 'User id is required'));

    if (ROLES_GROUPS.admin.includes(req.user.role as any)) return next();

    if (req.params._id !== req.user._id.toString())
        return next(new ApiError(httpStatus.FORBIDDEN, 'Access denied. This is not your resource.'));

    next();
};

export const restrictToProjectOwner = async (req: TAuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !req.user._id) return next(new ApiError(httpStatus.BAD_REQUEST, 'User id is required'));

    if (ROLES_GROUPS.admin.includes(req.user.role as any)) return next();

    const project = await projectService.getProjectById(req.params._id, { select: 'company' });
    if (!project) return next(new ApiError(httpStatus.NOT_FOUND, 'Project not found.'));

    const company = await companyService.getCompanyByUserId(req.user._id.toString());
    if (!company) return next(new ApiError(httpStatus.NOT_FOUND, 'Company not found.'));

    const isOwner = project.company.toString() === company._id.toString();
    if (!isOwner) return next(new ApiError(httpStatus.FORBIDDEN, 'Access denied. This is not your resource.'));

    next();
};

export const restrictToCompanyMember = async (req: TAuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !req.user._id) return next(new ApiError(httpStatus.BAD_REQUEST, 'User id is required'));

    if (ROLES_GROUPS.admin.includes(req.user.role as any)) return next();

    const company = await companyService.getCompanyById(req.params._id, { select: 'users' });
    if (!company) return next(new ApiError(httpStatus.NOT_FOUND, 'Company not found.'));

    const isMember = company?.users?.includes(req.user._id);
    if (!isMember) return next(new ApiError(httpStatus.FORBIDDEN, 'Access denied. This is not your resource.'));

    next();
};

export const bodySanitizer = (req: TAuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.role) return next(new ApiError(httpStatus.BAD_REQUEST, 'User role is required'));

    if (ROLES_GROUPS.admin.includes(req.user.role as any)) return next();

    // common
    delete req.body._id;
    delete req.body.__v;
    delete req.body.createdAt;
    delete req.body.updatedAt;

    // user
    delete req.body.role;
    delete req.body.companyId;
    delete req.body.isVerified;
    delete req.body.isActive;

    next();
};
