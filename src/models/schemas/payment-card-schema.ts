import mongoose from 'mongoose';

export const paymentCardSchema = new mongoose.Schema(
    {
        number: { type: String },
        expiration: { type: String },
        cvc: { type: String }
    },
    { _id: false }
);
