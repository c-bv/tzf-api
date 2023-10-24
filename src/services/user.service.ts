import { IUser } from '@custom-types/custom-types';
import { IUserDocument, UserModel } from '@models';
import ApiError from '@utils/ApiError';
import httpStatus from 'http-status';

const createUser = async (userData: IUser) => {
    if (await UserModel.isEmailTaken(userData.email as string)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return await UserModel.create(userData);
};

const getUserByEmail = async (email: string): Promise<IUser | null> => {
    return await UserModel.findOne({ email });
};

const getUserById = async (id: string, password?: boolean): Promise<IUserDocument | null> => {
    return await UserModel.findById(id).select(!password ? '-password' : '');
};

const queryUsers = async (filter: object, options: object): Promise<IUser[]> => {
    return await UserModel.find(filter, null, options);
};

export default {
    createUser,
    getUserByEmail,
    queryUsers,
    getUserById
};