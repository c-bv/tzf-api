import { CompanyModel, TCompanyDocument } from '@models';

/**
 * Retrieves a company by its ID.
 * @param id - The ID of the company to retrieve.
 * @returns A Promise that resolves to the retrieved company document, or null if not found.
 */
export const getCompanyById = async (id: string): Promise<TCompanyDocument | null> => {
    return await CompanyModel.findById(id);
};
