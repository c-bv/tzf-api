import { fileSchema, locationSchema } from '@schemas';
import mongoose, { Document, InferSchemaType, Model, Schema } from 'mongoose';

export type TProject = InferSchemaType<typeof projectShema>;
export type TProjectDocument = TProject & Document;
export type TProjectModel = Model<TProjectDocument>;

const projectImageSchema = new mongoose.Schema(
    {
        ...fileSchema.obj,
        orderIndex: { type: Number }
    },
    { _id: false }
);

const projectShema = new mongoose.Schema(
    {
        _id: { type: Schema.Types.ObjectId, auto: true },
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'User is required'] },
        companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: [true, 'Company is required'] },

        name: { type: String },
        description: {
            short: { type: String },
            long: { type: String }
        },
        story: { type: String },
        solution: { type: String },
        impact: { type: String },

        type: { type: String },
        url: { type: String },
        images: [projectImageSchema],
        sdgs: { type: [Number] },
        label: {
            _id: false,
            name: { type: String }
        },
        certifLabel: { type: String },
        audits: [
            {
                _id: false,
                name: { type: String }
            }
        ],

        commissionRate: { type: Number },
        carbon: {
            volume: { type: Number },
            forSaleVolume: { type: Number },
            offsettedVolume: { type: Number },
            unitPrice: { type: Number }
        },
        amountCollected: { type: Number },

        members: [
            {
                companyName: { type: String },
                representative: {
                    firstName: { type: String },
                    lastName: { type: String }
                },
                url: { type: String }, // Will be deleted in the future
                location: locationSchema,
                urls: { type: [String] },
                description: { type: String },
                images: [projectImageSchema]
            }
        ],
        dates: {
            started: { type: Date },
            ended: { type: Date },
            acceptation: { type: Date },
            delete: { type: Date }
        },

        nextBillNumber: { type: Number },
        certificateNumber: { type: String },
        nextCertificateSerial: { type: Number },
        invoicePrefix: { type: String },
        minimumAmountToBuy: { type: Number, default: 0 },

        canTakeTransactions: { type: Boolean, default: false },
        isPublished: { type: Boolean, default: false },
        isActive: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
        isWithoutCarbonCredit: { type: Boolean, default: false }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const ProjectModel = mongoose.model<TProjectDocument, TProjectModel>('Project', projectShema);
