import { ProjectModel, TProjectDocument } from '@models';

/**
 * Retrieves a project by its ID.
 * @param id - The ID of the project.
 * @returns A Promise that resolves to the project document or null if not found.
 */
export const getProjectById = async (id: string): Promise<TProjectDocument | null> => {
    return await ProjectModel.findById(id);
};

/**
 * Retrieves all projects.
 * @returns A promise that resolves to an array of TProjectDocument or null if no projects are found.
 */
export const getProjects = async (): Promise<TProjectDocument[] | null> => {
    return await ProjectModel.find();
};
