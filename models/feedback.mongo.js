import mongoose from 'mongoose';

const userFeedbackSchema = new mongoose.Schema({
  feedbackText: { 
    type: String, 
    required: true 
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true }, // User who posts the feedback
  targetUser: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true }, // User receiving the feedback
}, { timestamps: true });

const UserFeedback = mongoose.model('UserFeedback', userFeedbackSchema);
export default UserFeedback;
