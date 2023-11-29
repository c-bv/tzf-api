import { fileSchema, locationSchema, paymentCardSchema } from '@schemas';
import mongoose, { Document, InferSchemaType, Model, Schema } from 'mongoose';

export type TCompany = InferSchemaType<typeof companyShema>;
export type TCompanyDocument = TCompany & Document;
export type TCompanyModel = Model<TCompanyDocument>;

const companyShema = new mongoose.Schema(
    {
        _id: { type: Schema.Types.ObjectId, auto: true },

        name: { type: String, required: [true, 'Company name is required'] },
        description: { type: String },
        logo: { type: String },
        website: { type: String },
        phone: { type: String },
        location: locationSchema,
        users: [{ type: Schema.Types.ObjectId, ref: 'User' }],

        siret: { type: String },
        vatRate: { type: Number },

        invoiceTemplate: { type: Schema.Types.ObjectId, ref: 'InvoiceTemplate' },
        certificateTemplate: { type: Schema.Types.ObjectId, ref: 'CertificateTemplate' },

        paymentCards: [paymentCardSchema],

        stripe: {
            accountId: { type: String },
            customerId: { type: String }
        },

        subscription: {
            _id: { type: Schema.Types.ObjectId, ref: 'Subscription' },
            stripeId: { type: String }
        },

        whiteLabel: { type: Schema.Types.ObjectId, ref: 'WhiteLabel' },

        assets: {
            images: [fileSchema],
            fonts: [fileSchema]
        },

        isSharingImpact: { type: Boolean, default: false },
        canTakeTransfers: { type: Boolean, default: false },
        canUseWhiteLabel: { type: Boolean, default: false }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const CompanyModel = mongoose.model<TCompanyDocument, TCompanyModel>('Company', companyShema);
