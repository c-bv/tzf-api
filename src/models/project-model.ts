import mongoose, { Document, InferSchemaType, Model, Schema } from 'mongoose';

export type TProject = InferSchemaType<typeof projectShema>;
export type TProjectDocument = TProject & Document;
export type TProjectModel = Model<TProjectDocument>;

const projectShema = new mongoose.Schema(
    {
        _id: { type: Schema.Types.ObjectId, auto: true },
        name: { type: String },
        userId: { type: String },
        companyId: { type: String },
        companyName: { type: String },
        shortDescription: { type: String },
        description: { type: String },
        type: { type: String },
        story: { type: String },
        solution: { type: String },
        impact: { type: String },
        url: { type: String },
        images: [
            {
                _id: false,
                orderIndex: { type: Number },
                path: { type: String },
                miniPath: { type: String },
                fileName: { type: String }
            }
        ],
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
        carbonVolumeTotal: { type: Number },
        carbonVolumeTotalForSale: { type: Number },
        carbonVolumeOffsetted: { type: Number },
        unitPriceCarbon: { type: Number },
        totalAmountCollected: { type: Number },
        members: [
            {
                companyName: { type: String },
                representative: {
                    firstName: { type: String },
                    lastName: { type: String }
                },
                url: { type: String }, // Will be deleted in the future
                address: { type: String },
                city: { type: String },
                postalCode: { type: String },
                region: { type: String },
                country: { type: String },
                gpsCoordinates: {
                    latitude: { type: Number },
                    longitude: { type: Number }
                },
                urls: { type: [String] },
                description: { type: String },
                images: [
                    {
                        _id: false,
                        orderIndex: { type: Number },
                        path: { type: String },
                        miniPath: { type: String },
                        fileName: { type: String }
                    }
                ]
            }
        ],
        startedDate: { type: Date },
        endedDate: { type: Date },
        acceptationDate: { type: Date },
        published: { type: Boolean, default: false },
        active: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
        deleteDate: { type: Date },
        nextBillNumber: { type: Number },
        certificateNumber: { type: String },
        nextCertificateSerial: { type: Number },
        invoicePrefix: { type: String },
        canTakeTransactions: { type: Boolean, default: false },
        minimumAmountToBuy: { type: Number, default: 0 },
        withoutCarbonCredit: { type: Boolean, default: false }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const ProjectModel = mongoose.model<TProjectDocument, TProjectModel>('Project', projectShema);
