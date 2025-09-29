import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectDb } from "./config/db.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config()
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:false}))
app.use(errorHandler);

app.listen(process.env.PORT , ()=>{
    console.log("keys" , process.env.CLOUDINARY_API_KEY);
    console.log("Server is running on port");
})

connectDb();

app.use('/api' , router)
