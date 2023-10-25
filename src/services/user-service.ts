import { TUser, TUserDocument } from '@/models';
import { UserModel } from '@models';
import { ApiError } from '@utils/ApiError';
import httpStatus from 'http-status';

export const createUser = async (userData: TUser) => {
    if (await UserModel.isEmailTaken(userData.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return await UserModel.create(userData);
};

export const getUserByEmail = async (email: string): Promise<TUserDocument | null> => {
    return await UserModel.findOne({ email });
};

export const getUserById = async (id: string, password?: boolean): Promise<TUserDocument | null> => {
    return await UserModel.findById(id).select(!password ? '-password' : '');
};

export const queryUsers = async (filter: object, options: object): Promise<TUserDocument[] | null> => {
    return await UserModel.find(filter, null, options);
};
