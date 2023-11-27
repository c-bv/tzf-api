import { CompanyModel, TCompany, TCompanyDocument } from '@models';

/**
 * Retrieves all companies.
 * @returns A Promise that resolves to an array of TCompanyDocument or null if no companies are found.
 * @throws {ApiError} If the company is not found.
 */
export const getCompanies = async (): Promise<TCompanyDocument[] | null> => {
    return await CompanyModel.find();
};

/**
 * Retrieves a company by its ID.
 * @param id - The ID of the company to retrieve.
 * @returns A Promise that resolves to the retrieved company document, or null if not found.
 */
export const getCompanyById = async (id: string): Promise<TCompanyDocument | null> => {
    return await CompanyModel.findById(id);
};

/**
 * Updates a company by its ID.
 * @param id - The ID of the company to update.
 * @param update - The partial update object containing the fields to update.
 * @returns A promise that resolves to the updated company document, or null if not found.
 */
export const updateCompany = async (id: string, update: Partial<TCompany>): Promise<TCompanyDocument | null> => {
    return await CompanyModel.findByIdAndUpdate(id, update, { new: true });
};

/**
 * Creates a new company.
 * @param company The company object to create.
 * @returns A promise that resolves to the created company document.
 */
export const createCompany = async (company: TCompany): Promise<TCompanyDocument> => {
    return await CompanyModel.create(company);
};

/**
 * Deletes a company by its ID.
 * @param id - The ID of the company to delete.
 * @returns A promise that resolves to the deleted company document.
 */
export const deleteCompany = async (id: string): Promise<TCompanyDocument | null> => {
    return await CompanyModel.findByIdAndDelete(id);
};
