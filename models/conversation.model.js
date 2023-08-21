import mongoose from "mongoose";
const { Schema } = mongoose;

const ConversationSchema = new Schema(
  {
    room: {
      type: String,
      required: true,
      unique: true,
    },
    devId:{
        type:String,
        required:true,
        unique:true
    },
    empId:{
        type:String,
        required:true,
        unique:true
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Conversation", ConversationSchema);