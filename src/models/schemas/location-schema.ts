import mongoose from 'mongoose';

export const locationSchema = new mongoose.Schema(
    {
        address: { type: String },
        country: { type: String },
        city: { type: String },
        postalCode: { type: String },
        region: { type: String },
        coordinates: {
            latitude: { type: Number },
            longitude: { type: Number }
        }
    },
    { _id: false }
);
