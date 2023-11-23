import { ProjectModel, TProject, TProjectDocument } from '@models';

/**
 * Retrieves a project by its ID.
 * @param id - The ID of the project.
 * @returns A Promise that resolves to the project document or null if not found.
 */
export const getProjectById = async (id: string, select?: string[]): Promise<Partial<TProjectDocument> | null> => {
    return await ProjectModel.findById(id).select(select || '');
};

/**
 * Retrieves all projects.
 * @returns A promise that resolves to an array of TProjectDocument or null if no projects are found.
 */
export const getProjects = async (): Promise<TProjectDocument[] | null> => {
    return await ProjectModel.find();
};

/**
 * Updates a project by their ID.
 * @param id - The ID of the project to update.
 * @param update - The partial update object containing the fields to update.
 * @returns A promise that resolves to the updated project document, or null if not found.
 */
export const updateProject = async (id: string, update: Partial<TProject>): Promise<TProjectDocument | null> => {
    return await ProjectModel.findByIdAndUpdate(id, update, { new: true });
};

/**
 * Deletes a project by its ID.
 * @param id - The ID of the project to delete.
 * @returns A promise that resolves to the deleted project document, or null if the project was not found.
 */
export const deleteProject = async (id: string): Promise<TProjectDocument | null> => {
    return await ProjectModel.findByIdAndDelete(id);
};

/**
 * Archives a project by setting the isDeleted flag to true and updating the deleteDate.
 * @param id - The ID of the project to be archived.
 * @returns A Promise that resolves to the updated project document, or null if the project was not found.
 */
export const archiveProject = async (id: string): Promise<TProjectDocument | null> => {
    return await ProjectModel.findByIdAndUpdate(id, { isDeleted: true, deleteDate: Date.now() }, { new: true });
};
