import mongoose from "mongoose";

export const questionSchema = new mongoose.Schema({
  qustionId: {
    type: Number,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: [{
    type: String,
    required: true,
  }]
});

export default mongoose.model('qustion', questionSchema);