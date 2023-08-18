import mongoose from "mongoose";

const {Schema} = mongoose;

const projectSchema = new Schema({
    projectId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        require:true
    },
    desc:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    postedBy:{
        type:String,
        required:true
    },
    DeliveryTime:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    requests:{
        type:[String]
    }
    
},{timestamps:true});

export default mongoose.model("Projects", projectSchema);