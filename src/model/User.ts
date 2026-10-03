import mongoose,{Document} from "mongoose";
import bcryptjs from "bcryptjs";
import { NextFunction } from "express";

export interface IUser extends Document{
  name: string;
  email: string;
  password: string;
  refreshToken?: string;
  matchPassword(enteredPassword:string):Promise<boolean>;
}

const userSchema=new mongoose.Schema<IUser>({
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true
  },
  refreshToken: {
    type: String,
    default: ""
  }
},{
  timestamps:true,
});

userSchema.pre('save',async function(next:any){
  if(!this.isModified('password')){
    return next();
  }
  const salt=await bcryptjs.genSalt(10);
  const hashedPassword=await bcryptjs.hash(this.password,salt);
  this.password=hashedPassword
  next();
})

userSchema.methods.matchPassword=async function(enteredPassword:string){
  return await bcryptjs.compare(enteredPassword,this.password);
};

export default mongoose.model("User",userSchema);