import { config } from '@config/config';
import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(config.db.uri);
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
