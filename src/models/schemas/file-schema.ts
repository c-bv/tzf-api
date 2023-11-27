import mongoose from 'mongoose';

export const fileSchema = new mongoose.Schema(
    {
        name: { type: String },
        fileName: { type: String, required: [true, 'File name is required'] },
        path: { type: String },
        destination: { type: String }
    },
    { _id: false }
);
