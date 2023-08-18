import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true,
        default:"India"
    },
    desc:{
        type:String,
        required:true
    },
    phNumber:{
        type:Number,
        required:true
    },
    totalRating:{
        type:Number,
        default:0
    },
    numRating:{
        type:Number,
        default:0,
    },
    avgRating:{
        type:Number,
        default:0
    },
    isEmployer:{
        type:Boolean,
        default:false
    }
    },
    {
        timestamps:true
    });

export default mongoose.model("Users",userSchema);

