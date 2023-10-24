import { IRequestUser, IRole } from '@custom-types/custom-types';
import ApiError from '@utils/ApiError';
import { NextFunction, Response } from 'express';

const verifyRole = (role: IRole) => {
    return (req: IRequestUser, res: Response, next: NextFunction) => {
        // if (req.user.role !== role) throw new ApiError(403, 'Forbidden');
        next();
    };
};

export default {
    verifyRole,
};