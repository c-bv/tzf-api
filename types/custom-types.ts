import { TUser } from '@models';

export interface IRequestUser extends Request {
    user: TUser;
}

export type IAuthRequest = IRequestUser & {
    headers: { authorization: string };
};
