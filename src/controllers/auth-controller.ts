import { authService, tokenService, userService } from '@services';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

/**
 * Creates a new user and generates an authentication token.
 * @param req - The request object containing the user data.
 * @param res - The response object to send the user and token.
 * @returns A Promise that resolves to the created user and token.
 */
export const register = async (req: Request, res: Response): Promise<void> => {
    const user = await userService.createUser(req.body);
    const token = tokenService.generateAuthToken(user);

    res.status(httpStatus.CREATED).send({ user, token });
};

/**
 * Logs in a user with the provided email and password.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The logged in user and an authentication token.
 */
export const login = async (req: Request, res: Response): Promise<void> => {
    const user = await authService.loginUserWithEmailAndPassword(req.body.email, req.body.password);
    const token = tokenService.generateAuthToken(user);

    res.status(httpStatus.OK).send({ user, token });
};
