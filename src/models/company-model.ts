import mongoose, { Document, InferSchemaType, Model, Schema } from 'mongoose';

export type TCompany = InferSchemaType<typeof companyShema>;
export type TCompanyDocument = TCompany & Document;
export type TCompanyModel = Model<TCompanyDocument>;

const companyShema = new mongoose.Schema(
    {
        _id: { type: Schema.Types.ObjectId, auto: true },
        apiKeyCalculator: { type: String },
        apiKeyOffset: { type: String },
        buttonIntegration: [
            {
                url: { type: String },
                lastUse: { type: Date },
                service: { type: String }
            }
        ],
        certificateTemplateId: { type: String },
        consultantList: { type: [String] }, // Liste des consultants
        consultedCompanies: { type: [String] }, // Liste des "clients"
        currency: { type: String },
        dateCreation: { type: Date, default: Date.now },
        description: { type: String },
        employeesNumber: { type: Number },
        industry: { type: [String] },
        invoiceInfos: { type: String },
        invoiceTemplateId: { type: String },
        legalRepresentative: { type: String },
        location: {
            address: { type: String },
            country: { type: String },
            city: { type: String },
            postalCode: { type: String },
            region: { type: String }
        },
        logo: {
            name: { type: String },
            path: { type: String },
            miniPath: { type: String },
            fileName: { type: String }
        },
        paymentCards: [
            {
                cardNumber: { type: String },
                expiration: { type: String },
                cvc: { type: String }
            }
        ],
        name: { type: String },
        phone: { type: String },
        selectedProjects: { type: [String] },
        site: { type: String },
        siret: { type: String },
        type: { type: String },
        vatRate: { type: Number },
        isSharingImpact: { type: Boolean, default: false },
        stripeAccountId: { type: String },
        canTakeTransfers: { type: Boolean, default: false },
        canUseWhiteLabel: { type: Boolean, default: false },
        whiteLabelId: { type: String },
        stripeCustomerId: { type: String },
        stripeSubscriptionId: { type: String },
        subscriptionId: { type: String },
        apiKeyValidateDays: { type: [Number] },
        apiKeyValidateAmount: { type: Number },
        stats: [
            {
                _id: false,
                date: { type: Date, default: Date.now },
                projects: { type: Number, default: 0 },
                transactions: {
                    origin: {
                        website: { type: Number, default: 0 },
                        storefront: { type: Number, default: 0 },
                        apiKey: { type: Number, default: 0 }
                    },
                    amount: {
                        carbon: { type: Number, default: 0 },
                        currency: { type: Number, default: 0 }
                    }
                }
            }
        ],
        images: [
            {
                _id: false,
                originalName: { type: String },
                fileName: { type: String },
                path: { type: String },
                miniPath: { type: String },
                destination: { type: String }
            }
        ],
        fonts: [
            {
                _id: false,
                originalName: { type: String },
                fileName: { type: String },
                path: { type: String },
                destination: { type: String },
                fontName: { type: String }
            }
        ]
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const CompanyModel = mongoose.model<TCompanyDocument, TCompanyModel>('Company', companyShema);
