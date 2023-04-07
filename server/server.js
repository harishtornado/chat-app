import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { messageRoutes } from "./routes/messageRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";


const app = express();
app.use(express.json(),cors());
app.use('/messages',messageRoutes);
app.use('/auth',userRoutes)
dotenv.config()

const connect_DB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("MongoDB Connected")
    }
    catch(e) {
        console.log(e)
    }
}
connect_DB()

app.listen(process.env.PORT , () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})
