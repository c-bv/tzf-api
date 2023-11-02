import { config } from '@config/config';
import { TUser } from '@models';
import jwt, { JwtPayload } from 'jsonwebtoken';

export type TDecodedToken = JwtPayload & {
    _id: TUser['_id'];
    role: TUser['role'];
};

/**
 * Generates an authentication token for the given user.
 * @param user - The user object to generate the token for.
 * @returns The generated authentication token.
 */
export const generateAuthToken = (user: Partial<TUser>): string => {
    return jwt.sign({ _id: user._id, role: user.role }, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
};

/**
 * Verifies the authenticity of a JWT token.
 * @param token - The JWT token to verify.
 * @returns The decoded token if it is valid, otherwise false.
 */
export const verifyAuthToken = (token: string): TDecodedToken | false => {
    try {
        return jwt.verify(token, config.jwt.secret) as TDecodedToken;
    } catch (err) {
        return false;
    }
};
