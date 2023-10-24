declare const roles: readonly ['buyer', 'seller', 'consultingBuyer', 'consultingSeller'];

export type IRole = (typeof roles)[number];

export type IUser = {
    id?: any;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    role?: IRole;
    companyId?: any;
    consultedCompanies?: any[];
    verified?: boolean;
    active?: boolean;
};

export interface IRequestUser extends Request {
    user: IUser;
}

export type IAuthRequest = IRequestUser & {
    headers: { authorization: string };
};
