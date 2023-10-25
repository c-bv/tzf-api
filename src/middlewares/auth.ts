import { IRequestUser, TRole } from '@custom-types/custom-types';
import { ApiError } from '@utils/ApiError';
import { NextFunction, Response } from 'express';

export const verifyRole = (role: TRole) => {
    return (req: IRequestUser, res: Response, next: NextFunction) => {
        if (req.user.role !== role) throw new ApiError(403, 'Forbidden');
        next();
    };
};
