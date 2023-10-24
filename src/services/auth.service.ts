import { IUserDocument } from '@models';
import ApiError from '@utils/ApiError';
import httpStatus from 'http-status';
import userService from './user.service';

const loginUserWithEmailAndPassword = async (email: string, password: string): Promise<IUserDocument> => {
    const user = await userService.getUserByEmail(email) as IUserDocument;
    if (!user || !(await user.checkPassword(password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }
    return user;
};

export default {
    loginUserWithEmailAndPassword,
};