import { TUser, TUserDocument } from '@/models';
import { UserModel } from '@models';
import { ApiError } from '@utils/ApiError';
import httpStatus from 'http-status';

type RegisterUserData = {
    email: TUser['email'];
    firstName: TUser['firstName'];
    lastName: TUser['lastName'];
    password: TUser['password'];
    role: TUser['role'];
};

/**
 * Creates a new user with the provided user data.
 * @param userData The user data to create the user with.
 * @returns A promise that resolves with the created user document.
 * @throws ApiError with status 400 if the email is already taken.
 */
export const createUser = async (userData: RegisterUserData): Promise<TUserDocument> => {
    if (await UserModel.isEmailTaken(userData.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return await UserModel.create(userData);
};

/**
 * Retrieves a user document from the database by email.
 * @param email - The email of the user to retrieve.
 * @returns A Promise that resolves with the retrieved user document, or null if no user was found.
 */
export const getUserByEmail = async (email: string): Promise<TUserDocument | null> => {
    return await UserModel.findOne({ email });
};

/**
 * Retrieves a user by their ID.
 * @param id - The ID of the user to retrieve.
 * @param password - Whether or not to include the user's password in the retrieved document.
 * @returns A Promise that resolves to the retrieved user document, or null if no user was found.
 */
export const getUserById = async (id: string, password?: boolean): Promise<TUserDocument | null> => {
    return await UserModel.findById(id).select(!password ? '-password' : '');
};

/**
 * Queries the database for users based on the provided filter and options.
 * @param filter - The filter object used to query the database.
 * @param options - The options object used to query the database.
 * @returns A Promise that resolves to an array of TUserDocument objects or null.
 */
export const queryUsers = async (filter: object, options: object): Promise<TUserDocument[] | null> => {
    return await UserModel.find(filter, null, options);
};
