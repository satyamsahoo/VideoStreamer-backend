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
            require: true
        },
        email: {
            type: String,
            require: true
        },
        username: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        }
    }
);

export default mongoose.model<IUserModel>('User', UserSchema);