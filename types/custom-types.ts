declare const roles: readonly ['buyer', 'seller', 'consultingBuyer', 'consultingSeller'];

export type TRole = (typeof roles)[number];

export type TUser = {
    id?: any;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    role?: TRole;
    companyId?: any;
    consultedCompanies?: any[];
    verified?: boolean;
    active?: boolean;
};

export interface IRequestUser extends Request {
    user: TUser;
}

export type IAuthRequest = IRequestUser & {
    headers: { authorization: string };
};
