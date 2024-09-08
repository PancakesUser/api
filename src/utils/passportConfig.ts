import passport from "passport";
import passportLocal from "passport-local";
import {Request} from "express";
// Schemas
import { UserSchema } from "../database/mongodb/Schemas/UserSchema";


interface reqUser extends Request {
    name: string,
    last_name: string,
    avatar: string | null,
    email: string,
    password: string,
    created_at: Date
}

// LOCAL STRATEGY
const local_register = new passportLocal.Strategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async function(req: reqUser, email, password, done) {
    try{
        const {name, last_name, avatar} = req.body;

        // Check if the provided email is already-in-use.
        const user = await UserSchema.findOne({email}).exec();
        if(user) return done("email-in-use", false);
        if(!name || !last_name || !email || !password) return done("invalid_credentials", false);

        // Create a new user.
        await new UserSchema({
            name,
            last_name,
            avatar,
            email,
            password,
            created_at: Date.now()
        }).save();
        return done(null, true, {message: "success"});
    }catch(error: unknown) {
        console.error("Something went wrong while trying to register user:", error);
        return done("internal-server-error", false);
    }
});


const local_login = new passportLocal.Strategy({
    usernameField: "email",
    passwordField: "password",
}, async (email, password, done) => {
    try{
        if(!email || !password) return done("invalid-credentials", false);

        const user = await UserSchema.findOne({email}).exec();
        if(!user) return done("user-not-found", false);

        const passwordVerify = user.verifyPassword(user.password, password);
        if(!passwordVerify) return done("invalid-credentials", false);

        const payload = {
            name: user.name,
            last_name: user.last_name,
            avatar: user.avatar,
            email: user.email,
            password: user.password,
            created_at: user.created_at
        }

        return done(null, payload);
    }catch(error: unknown) {
        console.error("Something went wrong while logIn an user: ", error);
        return done("internal-server-error", false);
    }
})

// Register the local-register strategy.
passport.use("local_register", local_register);
// Register the local-login strategy.
passport.use("local_login", local_login);

// Serialization and deserialization
passport.serializeUser((req: any, user: {_id: string}, done: Function) => {
    return done(null, user._id);
});
passport.deserializeUser(async(err: any, user_id: string, done: Function) => {
    const user = await UserSchema.findById(user_id).exec();
    if(!user) return done("user_not_found", false);
    return done(null, user);
});

export {passport as mainPassport};
