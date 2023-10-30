import { TUser } from '@models';
import { Request } from 'express';

export type TAuthRequest = Request & {
    user?: TUser;
    authorization?: string;
};
