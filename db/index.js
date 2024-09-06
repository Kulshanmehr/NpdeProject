import mongoose from "mongoose";

import {DB_NAME} from "../src/constracts.js";

const connectDB = ( async () => {
    try {
        const connectionresponse  = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected !! DB HOST : ${connectionresponse.connection.host}`);
        
    } catch (error) {
        console.log("ERROR:",error);
        
    }
})

export default connectDB;