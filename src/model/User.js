const mongoose=require("mongoose");
const bcryptjs=require("bcryptjs");

const userSchema=new mongoose.Schema({
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

userSchema.pre('save',async function(next){
  if(!this.isModified('password')){
    return next();
  }
  const salt=await bcryptjs.genSalt(10);
  const hashedPassword=await bcryptjs.hash(this.password,salt);
  this.password=hashedPassword
  next();
})

userSchema.methods.matchPassword=async function(enteredPassword){
  return await bcryptjs.compare(enteredPassword,this.password);
};

module.exports=mongoose.model("User",userSchema);