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
 * @param options - Additional options for selecting and populating fields.
 * @returns A Promise that resolves to the retrieved user document, or null if no user was found.
 */
export const getUserByEmail = async (
    email: string,
    options?: { select?: string; populate?: string }
): Promise<Partial<TUserDocument> | null> => {
    return await UserModel.findOne({ email })
        .select(options?.select || '')
        .populate(options?.populate || '');
};

/**
 * Retrieves a user document from the database by ID.
 * @param id - The ID of the user to retrieve.
 * @param options - Additional options for selecting and populating fields.
 * @returns A Promise that resolves to the retrieved user document, or null if no user was found.
 */
export const getUserById = async (
    id: string,
    options?: { select?: string; populate?: string }
): Promise<Partial<TUserDocument> | null> => {
    return await UserModel.findById(id)
        .select(options?.select || '')
        .populate(options?.populate || '');
};

/**
 * Retrieves users by company ID.
 * @param companyId - The ID of the company to retrieve users for.
 * @param options - Additional options for selecting and populating fields.
 * @returns A Promise that resolves to an array of TUserDocument or null if no users are found.
 */
export const getUsersByCompanyId = async (companyId: string, options?: { select?: string; populate?: string }) => {
    return await UserModel.find({ companyId })
        .select(options?.select || '')
        .populate(options?.populate || '');
};

/**
 * Retrieves all users.
 * @param options - Additional options for selecting and populating fields.
 * @returns A Promise that resolves to an array of TUserDocument or null if no users are found.
 */
export const getUsers = async (options?: { select?: string; populate?: string }): Promise<TUserDocument[]> => {
    return await UserModel.find()
        .select(options?.select || '')
        .populate(options?.populate || '');
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
