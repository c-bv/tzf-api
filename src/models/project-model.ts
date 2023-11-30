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

export const projectShema = new mongoose.Schema(
    {
        _id: { type: Schema.Types.ObjectId, auto: true },
        company: { type: Schema.Types.ObjectId, ref: 'Company', required: [true, 'Company is required'] },

        name: { type: String },
        description: {
            short: { type: String },
            long: { type: String }
        },

        type: { type: String },
        website: { type: String },
        images: [projectImageSchema],
        sdgs: { type: [Number] },
        label: {
            name: { type: String },
            file: { type: String }
        },
        certifLabel: { type: String },
        audits: [fileSchema],
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
                website: { type: String },
                location: locationSchema,
                description: { type: String },
                images: [projectImageSchema]
            }
        ],
        dates: {
            // TODO: add date pub
            started: { type: Date },
            ended: { type: Date },
            acceptation: { type: Date },
            delete: { type: Date }
        },

        nextBillNumber: { type: Number },
        nextCertificateSerial: { type: Number },

        certificateNumber: { type: String },
        invoicePrefix: { type: String },

        minimumAmountToBuy: { type: Number, default: 0 },

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
