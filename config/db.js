import mongoose from "mongoose"

export const connectDb = ()=>{
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("Databse connected 😎");
    }).catch((err)=>{
        console.error("Db Error" , err);
    })
}
