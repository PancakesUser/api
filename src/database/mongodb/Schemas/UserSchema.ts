import {Schema, model, Document} from "mongoose";

interface IUserSchema extends Document {
    _id: string,
    name: string,
    last_name: string,
    avatar: string | null,
    email: string,
    password: string,
    created_at: Date,
    verifyPassword: (account_password: string, provided_password: string) => Promise<boolean>
}


const User: Schema = new Schema<IUserSchema>({
    name: {type: String, required: true, minLength: 1, maxLength: 252},
    last_name: {type: String, required: true, minLength: 1, maxLength: 252},
    avatar: {type: String, required: false, default: null},
    email: {type: String, required: true, unique: true, minLength: 5, maxLength: 254},
    password: {type: String, required: true, minLength: 8, maxLength: 24},
    created_at: {type: Date, required: true, default: Date.now}
});

User.methods.verifyPassword = function(account_password: string, provided_password: string): boolean {
    return account_password === provided_password;
}; 

export const UserSchema = model<IUserSchema>("User", User);