import { TProject, projectShema } from '@models';
import mongoose, { Document, InferSchemaType, Model, Schema } from 'mongoose';

export type TTransaction = InferSchemaType<typeof transactionShema>;
export type TTransactionDocument = TTransaction & Document;
export type TTransactionModel = Model<TTransactionDocument>;
export type TProjectInTransaction = InferSchemaType<typeof projectInTransactionSchema> & TProject;

const projectInTransactionSchema = new mongoose.Schema(
    {
        ...projectShema.obj,
        quantity: { type: Number },
        certificate: { type: String },
        invoice: { type: String }
    },
    { _id: false }
);

const transactionShema = new mongoose.Schema(
    {
        _id: { type: Schema.Types.ObjectId, auto: true },
        user: { type: Schema.Types.ObjectId, ref: 'User' },

        projects: [projectInTransactionSchema],

        status: {
            type: String,
            enum: ['IN PROGRESS', 'SUCCEEDED', 'FAILED', 'CANCELED'],
            default: 'IN PROGRESS'
        },
        origin: {
            source: {
                type: String,
                enum: ['website', 'storefront', 'apiKey']
            },
            id: { type: String }
        },

        amount: { type: Number },
        transactionHash: { type: String },

        dates: {
            creation: { type: Date, default: Date.now },
            validation: { type: Date }
        },

        stripe: {
            clientSecret: { type: String },
            transferGroup: { type: String }
        },

        keyTransactions: { type: [String] },
        paymentInstructionsUrl: { type: String }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const TransactionModel = mongoose.model<TTransactionDocument, TTransactionModel>(
    'Transaction',
    transactionShema
);
