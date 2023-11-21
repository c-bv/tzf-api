import { CompanyModel, TCompany, TCompanyDocument } from '@models';

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
