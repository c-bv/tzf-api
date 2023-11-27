import mongoose from 'mongoose';

export const fileSchema = new mongoose.Schema(
    {
        name: { type: String },
        friendlyName: { type: String }
    },
    { _id: false }
);
