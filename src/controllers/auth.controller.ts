import { authService, tokenService, userService } from '@services';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

const register = async (req: Request, res: Response) => {
    const user = await userService.createUser(req.body);
    const token = tokenService.generateAuthToken(user);
    res.status(httpStatus.CREATED).send({ user, token });
};

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body as { email: string; password: string };
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    const token = tokenService.generateAuthToken(user);
    res.send({ user, token });
};

export default {
    register,
    login
};
