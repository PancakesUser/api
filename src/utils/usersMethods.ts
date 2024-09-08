import {NextFunction, Response} from "express";
import { UserSchema } from "../database/mongodb/Schemas/UserSchema";

export async function registerUser(name: string, last_name: string, avatar: string | null, email: string, password: string, created_at: string, res: Response, next: NextFunction): Promise<Response> {
    try{
        // Check if the provided email is already in-use.
        const user = await UserSchema.findOne({email: email}).exec();
        if(user) return res.status(409).send("email-in-use");

        await new UserSchema({
            name,
            last_name,
            avatar,
            email,
            password,
            created_at: Date.now()
        }).save();

        return res.status(201).send("User successfully created!");
    }catch(error: unknown) {
        console.error("Something went wrong trying to register user:", error);
        return res.status(500).send("Internal Server Error.");
    }
    next();
}
