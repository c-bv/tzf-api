import { TUser, TUserDocument, UserModel } from '@models';
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
export const createUser = async (userData: RegisterUserData): Promise<Partial<TUserDocument>> => {
    if (await UserModel.isEmailTaken(userData.email)) throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
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
export const getUserById = async (id: string, password?: boolean): Promise<Partial<TUserDocument> | null> => {
    return await UserModel.findById(id).select(!password ? '-password' : '');
};

/**
 * Retrieves users by company ID.
 * @param companyId - The ID of the company.
 * @returns A promise that resolves to an array of user documents or null.
 */
export const getUsersByCompanyId = async (companyId: string): Promise<TUserDocument[] | null> => {
    return await UserModel.find({ companyId }).select('-password');
};

/**
 * Retrieves all users from the database.
 * @returns A Promise that resolves to an array of TUserDocument or null if no users are found.
 */
export const getUsers = async (): Promise<TUserDocument[] | null> => {
    return await UserModel.find();
};

/**
 * Deletes a user by their ID.
 * @param id The ID of the user to delete.
 * @returns A promise that resolves to the deleted user document, or null if the user was not found.
 */
export const deleteUser = async (id: string): Promise<TUserDocument | null> => {
    return await UserModel.findByIdAndDelete(id);
};

/**
 * Updates a user by their ID.
 * @param id The ID of the user to update.
 * @param update The update object.
 * @returns A promise that resolves to the updated user document, or null if the user was not found.
 */
export const updateUser = async (id: string, update: Partial<TUser>): Promise<Partial<TUserDocument> | null> => {
    return await UserModel.findByIdAndUpdate(id, update, { new: true }).select('-password');
};
