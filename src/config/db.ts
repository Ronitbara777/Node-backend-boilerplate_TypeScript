import mongoose from "mongoose";

const connectDB=async()=>{
  try{
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Mongodb Connected");
  }catch(err:unknown){
    console.error(err);
    process.exit(1)
  }
}

export default connectDB;