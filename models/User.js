import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        min:2,
        max:50
    },
    lastName:{
        type:String,
        required:true,
        min:2,
        max:50
    },
    email:{
        type:String,
        required:true,
        unique:true,
        max:50
    },
    password:{
        type:String,
        required:true,
        min:5,
        max:30
    },
    friends:{
        type:Array,
        default:[],
    },
    picturePath:{
        type:String,
        default:"",
    },
    impressions:Number,
    viewedProfile:Number,
    occupation:String,
    location:String,
},{timestamps:true});

const User=mongoose.model("User",UserSchema);

export default User;