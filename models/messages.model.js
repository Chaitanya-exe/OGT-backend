import mongoose from "mongoose";
const { Schema } = mongoose;

const MessageSchema = new Schema({
  conversationId: {
    type: String,
    required: true,
  },
  sentBy: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
},{
  timestamps:true
});

export default mongoose.model("Messages", MessageSchema)