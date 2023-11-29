import { config } from '@config/config';
import bcrypt from 'bcrypt';
import mongoose, { Document, InferSchemaType, Model, Schema } from 'mongoose';

export type TUser = InferSchemaType<typeof userShema>;
export type TUserDocument = TUser &
    Document & {
        setPassword: (password: string) => Promise<void>;
        checkPassword: (password: string) => Promise<boolean>;
    };
export type TUserModel = Model<TUserDocument> & {
    isEmailTaken: (email: string) => Promise<boolean>;
};
export type TUserDocumentWithPassword = TUserDocument & { password: string };

const userShema = new mongoose.Schema(
    {
        _id: { type: Schema.Types.ObjectId, auto: true },
        firstName: { type: String, required: [true, 'First name is required'] },
        lastName: { type: String, required: [true, 'Last name is required'] },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true,
            validate: {
                validator: (email: string) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email),
                message: 'Email is not valid'
            }
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            validate: {
                validator: (password: string) => password.length >= 6,
                message: 'Password must be at least 6 characters long'
            },
            select: false
        },
        role: {
            type: String,
            required: [true, 'Role is required'],
            enum: {
                values: ['admin', 'buyer', 'seller', 'consultingBuyer', 'consultingSeller'],
                message: '{VALUE} is not supported'
            }
        },
        company: { type: Schema.Types.ObjectId, ref: 'Company' },
        isVerified: { type: Boolean, default: false },
        isActive: { type: Boolean, default: false }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

userShema.methods.setPassword = async function (password: string): Promise<void> {
    const salt: string = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    this.password = config.env !== 'production' ? password : hash;
};

userShema.methods.checkPassword = async function (password: string): Promise<boolean> {
    let result: boolean = false;
    if (config.env !== 'production') result = password === this.password;
    else result = await bcrypt.compare(password, this.password);
    return result;
};

userShema.statics.isEmailTaken = async function (email: string): Promise<boolean> {
    const user = await this.findOne({ email });
    return !!user;
};

userShema.pre('findOneAndUpdate', async function (this: any): Promise<void> {
    const queryConditions = this.getQuery();
    const documentBeingUpdated = await this.model.findOne(queryConditions);

    if (this._update.password) await documentBeingUpdated.setPassword(this._update.password);

    if (this._update.email && this._update.email !== documentBeingUpdated.email) {
        const isEmailTaken = await this.model.isEmailTaken(this._update.email);
        if (isEmailTaken) throw new Error('Email is already taken');
    }
});

userShema.pre('save', async function (this: TUserDocument): Promise<void> {
    if (!this.isModified('password')) return;
    await this.setPassword(this.password);
});

export const UserModel = mongoose.model<TUserDocument, TUserModel>('User', userShema);
