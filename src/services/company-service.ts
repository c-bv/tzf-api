import { CompanyModel, TCompany, TCompanyDocument } from '@models';

/**
 * Retrieves all companies.
 * @param options - Additional options for selecting and populating fields.
 * @returns A promise that resolves to an array of company documents.
 */
export const getCompanies = async (options?: { select?: string; populate?: string }): Promise<TCompanyDocument[]> => {
    return await CompanyModel.find()
        .select(options?.select || '')
        .populate(options?.populate || '');
};

/**
 * Retrieves a company by its ID.
 * @param id - The ID of the company.
 * @param options - Additional options for selecting and populating fields.
 * @returns A promise that resolves to a partial company document or null if not found.
 */
export const getCompanyById = async (
    id: string,
    options?: { select?: string; populate?: string }
): Promise<Partial<TCompanyDocument> | null> => {
    return await CompanyModel.findById(id)
        .select(options?.select || '')
        .populate(options?.populate || '');
};

/**
 * Retrieves a company by its user ID.
 * @param userId - The ID of the user.
 * @param options - Additional options for selecting and populating fields.
 * @returns A promise that resolves to a partial company document or null if not found.
 */
export const getCompanyByUserId = async (
    userId: string,
    options?: { select?: string; populate?: string }
): Promise<Partial<TCompanyDocument> | null> => {
    return await CompanyModel.findOne({ users: userId })
        .select(options?.select || '')
        .populate(options?.populate || '');
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
export const createCompany = async (company: Partial<TCompany>): Promise<TCompanyDocument> => {
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
