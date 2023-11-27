import mongoose from 'mongoose';

export const locationSchema = new mongoose.Schema(
    {
        address: { type: String },
        country: { type: String },
        city: { type: String },
        postalCode: { type: String },
        region: { type: String }
    },
    { _id: false }
);
