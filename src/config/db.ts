import config from '@config/config';
import mongoose, { ConnectOptions } from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(config.db.uri, config.db.config as ConnectOptions);
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    };
};

export default connectDB;