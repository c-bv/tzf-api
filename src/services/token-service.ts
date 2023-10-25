import { config } from '@config/config';
import { TUser } from '@models';
import jwt from 'jsonwebtoken';

export const generateAuthToken = (user: TUser) => {
    return jwt.sign({ _id: user._id }, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
};

export const verifyAuthToken = (token: string) => {
    try {
        return jwt.verify(token, config.jwt.secret);
    } catch (err) {
        return false;
    }
};
