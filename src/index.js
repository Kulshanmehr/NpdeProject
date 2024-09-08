import dotenv from 'dotenv';
dotenv.config();
// import mongoose from "mongoose";
// import {DB_NAME} from './constracts.js';


// import express from "express";

// const app = express(); 

import connectDB from "../db/index.js";

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`o | Server is running at port : ${process.env.PORT}`);
        
    })
})
.catch((err) => {
    console.log("MONGO db connected failed :",err);
    
}


)















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