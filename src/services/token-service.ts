import { config } from '@config/config';
import { TUser } from '@custom-types/custom-types';
import jwt from 'jsonwebtoken';

export const generateAuthToken = (user: TUser) => {
    return jwt.sign({ _id: user.id }, config.jwt.secret as string, { expiresIn: config.jwt.expiresIn });
};

export const verifyAuthToken = (token: string) => {
    try {
        return jwt.verify(token, config.jwt.secret);
    } catch (err) {
        return false;
    }
};
