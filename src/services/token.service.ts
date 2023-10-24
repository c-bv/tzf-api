import config from '@config/config';
import { IUser } from '@custom-types/custom-types';
import jwt from 'jsonwebtoken';

const generateAuthToken = (user: IUser) => {
    return jwt.sign({ _id: user.id }, config.jwt.secret as string, { expiresIn: config.jwt.expiresIn });
};

const verifyAuthToken = (token: string) => {
    try {
        return jwt.verify(token, config.jwt.secret);
    } catch (err) {
        return false;
    }
};

export default {
    generateAuthToken,
    verifyAuthToken,
};