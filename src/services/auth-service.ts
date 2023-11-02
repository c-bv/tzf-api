import { TUserDocument } from '@models';
import { userService } from '@services';
import { ApiError } from '@utils/ApiError';
import httpStatus from 'http-status';

/**
 * Login user with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<TUserDocument>} - User document
 * @throws {ApiError} - Error if email or password is incorrect
 */
export const loginUserWithEmailAndPassword = async (
    email: string,
    password: string
): Promise<Partial<TUserDocument>> => {
    const user = await userService.getUserByEmail(email);
    if (!user || !(await user.checkPassword(password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }
    return {
        ...user.toJSON(),
        password: undefined
    };
};
