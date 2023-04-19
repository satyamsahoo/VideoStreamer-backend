import mongoose, { Document, Schema } from "mongoose";

export interface IUser {
    name: string,
    email: string,
    username: string,
    password: string
}

export interface IUserModel extends IUser, Document { }

const UserSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    }
);

export default mongoose.model<IUserModel>('User', UserSchema);