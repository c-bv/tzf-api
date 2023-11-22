import { ProjectModel, TProjectDocument } from '@models';

/**
 * Retrieves a project by its ID.
 * @param id - The ID of the project.
 * @returns A Promise that resolves to the project document or null if not found.
 */
export const getProjectById = async (id: string): Promise<TProjectDocument | null> => {
    return await ProjectModel.findById(id);
};
