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
    },
    empId:{
        type:String,
        required:true
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Conversation", ConversationSchema);