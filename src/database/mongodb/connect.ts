import {connect} from "mongoose";

try{
    (async() => {
        await connect(process.env.MONGOURI)
        .finally(() => {
            console.log("Database has been successfully connected! ✅");
        })
    })();
}catch(error: unknown) {
    console.error("Something went wrong while trying to connect to database: ", error);
}