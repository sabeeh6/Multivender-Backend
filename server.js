import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectDb } from "./config/db.js";
import { router } from "./routes/auth/authRoutes.js";

dotenv.config()
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:false}))

app.listen(process.env.PORT , ()=>{
    console.log("Server is running on port");
})

connectDb();

app.use('/api' , router)
