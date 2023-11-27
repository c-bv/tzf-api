import mongoose from 'mongoose';

export const withTransaction = async (operations: (session: mongoose.ClientSession) => Promise<any>) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const result = await operations(session);
        await session.commitTransaction();
        session.endSession();
        return result;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(error);
        throw error;
    } finally {
        session.endSession();
    }
};
