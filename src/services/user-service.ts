import { TUser } from '@custom-types/custom-types';
import { IUserDocument, UserModel } from '@models';
import { ApiError } from '@utils/ApiError';
import httpStatus from 'http-status';

export const createUser = async (userData: TUser) => {
    if (await UserModel.isEmailTaken(userData.email as string)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return await UserModel.create(userData);
};

export const getUserByEmail = async (email: string): Promise<TUser | null> => {
    return await UserModel.findOne({ email });
};

export const getUserById = async (id: string, password?: boolean): Promise<IUserDocument | null> => {
    return await UserModel.findById(id).select(!password ? '-password' : '');
};

export const queryUsers = async (filter: object, options: object): Promise<TUser[]> => {
    return await UserModel.find(filter, null, options);
};
