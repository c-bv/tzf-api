import { TAuthRequest } from '@custom-types/custom-types';
import { companyService } from '@services';
import { ApiError } from '@utils/ApiError';
import { Response } from 'express';
import httpStatus from 'http-status';

/**
 * Retrieves a company by its ID.
 * @param req - The request object.
 * @param res - The response object.
 * @throws {ApiError} If the company ID is missing or if the company is not found.
 */
export const getCompany = async (req: TAuthRequest, res: Response) => {
    if (!req.params._id) throw new ApiError(httpStatus.BAD_REQUEST, 'Company id is required');

    const company = await companyService.getCompanyById(req.params._id);
    if (!company) throw new ApiError(httpStatus.NOT_FOUND, 'Company not found');

    res.status(httpStatus.OK).send(company);
};
