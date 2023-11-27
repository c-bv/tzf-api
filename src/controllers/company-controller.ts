import { TAuthRequest } from '@custom-types/custom-types';
import { companyService, userService } from '@services';
import { ApiError } from '@utils/ApiError';
import { Response } from 'express';
import httpStatus from 'http-status';

/**
 * Get all companies.
 * @param req - The request object.
 * @param res - The response object.
 * @returns A list of companies.
 */
export const getCompanies = async (req: TAuthRequest, res: Response) => {
    const companies = await companyService.getCompanies();

    res.status(httpStatus.OK).send(companies);
};

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

/**
 * Toggles the white label status of a company.
 * @param req - The request object containing the company id.
 * @param res - The response object.
 * @returns A Promise that resolves to the updated company object.
 * @throws {ApiError} If the company id is missing or if the company is not found.
 */
export const toggleWhiteLabel = async (req: TAuthRequest, res: Response) => {
    if (!req.params.id) throw new ApiError(httpStatus.BAD_REQUEST, 'Company id is required');

    const company = await companyService.getCompanyById(req.params.id);
    if (!company) throw new ApiError(httpStatus.NOT_FOUND, 'Company not found');

    if (!company.whiteLabelId) {
        // TODO - add white label id to company
    }

    await companyService.updateCompany(req.params.id, {
        whiteLabelId: company.whiteLabelId,
        canUseWhiteLabel: !company.canUseWhiteLabel
    });

    res.status(httpStatus.OK).send(company);
};

/**
 * Creates a new company.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The created company.
 * @throws {ApiError} If the user id is missing or if the company is not created.
 */
export const createCompany = async (req: TAuthRequest, res: Response) => {
    if (!req.user || !req.user._id) throw new ApiError(httpStatus.BAD_REQUEST, 'User id is required');

    const user = await userService.getUserById(req.user._id.toString());
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

    if (user.companyId) throw new ApiError(httpStatus.BAD_REQUEST, 'User already has a company');

    const company = await companyService.createCompany({ ...req.body, members: [req.user._id] });
    if (!company) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Company not created');

    await userService.updateUser(req.user._id.toString(), { companyId: company._id });

    res.status(httpStatus.CREATED).send(company);
};

/**
 * Updates a company.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The updated company.
 * @throws {ApiError} If the company id is missing or if the company is not found.
 */
export const updateCompany = async (req: TAuthRequest, res: Response) => {
    if (!req.params._id) throw new ApiError(httpStatus.BAD_REQUEST, 'Company id is required');

    const company = await companyService.updateCompany(req.params._id, req.body);
    if (!company) throw new ApiError(httpStatus.NOT_FOUND, 'Company not found');

    res.status(httpStatus.OK).send(company);
};

/**
 * Deletes a company.
 * @param {TAuthRequest} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the company is deleted.
 * @throws {ApiError} - If the company id is missing or if the company is not found.
 */
export const deleteCompany = async (req: TAuthRequest, res: Response) => {
    if (!req.params._id) throw new ApiError(httpStatus.BAD_REQUEST, 'Company id is required');

    const company = await companyService.deleteCompany(req.params._id);
    if (!company) throw new ApiError(httpStatus.NOT_FOUND, 'Company not found');

    res.status(httpStatus.OK).send(company);
};
