import { config } from '@config/config';
import { TRole, TUser } from '@custom-types/custom-types';
import bcrypt from 'bcrypt';
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUserDocument extends TUser, Document {
    setPassword: (password: string) => Promise<void>;
    checkPassword: (password: string) => Promise<boolean>;
}

export interface IUserModel extends Model<IUserDocument> {
    isEmailTaken(email: string): Promise<boolean>;
}

const userShema: Schema<IUserDocument> = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: { message: 'Last name is required' } },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (email: string) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email),
                message: 'Email is not valid'
            }
        },
        password: {
            type: String,
            required: { message: 'Password is required' },
            validate: {
                validator: (password: string) => password.length >= 6,
                message: 'Password must be at least 6 characters long'
            }
        },
        role: {
            type: String,
            enum: [] as TRole[],
            required: { message: 'Role is required' }
        },
        companyId: {
            type: Schema.Types.ObjectId,
            ref: 'Company',
            default: null
        },
        consultedCompanies: [{ type: Schema.Types.ObjectId, ref: 'Company' }, { default: [] }],
        verified: { type: Boolean, default: false },
        active: { type: Boolean, default: false }
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

userShema.pre('save', async function (): Promise<void> {
    if (!this.isModified('password')) return;
    await this.setPassword(this.password as string);
});

export const UserModel = mongoose.model<IUserDocument, IUserModel>('User', userShema);
