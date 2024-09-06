import dotenv from 'dotenv';
dotenv.config();
// import mongoose from "mongoose";
// import {DB_NAME} from './constracts.js';


// import express from "express";

// const app = express();

import connectDB from "../db/index.js";

connectDB()
















/*
( async() => {
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error)=>{
            console.log("Error:",error);
            throw error
        })
        app.listen(process.env.PORT,()=>{
            console.log(`App is listening at port${process.env.PORT}`);
        })
    } catch (error) {
        console.log("Error:", error)
    }
})()

*/