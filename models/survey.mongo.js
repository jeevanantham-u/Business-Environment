import mongoose from 'mongoose';
import { questionSchema } from './question.mongo.js';

const surveySchema = mongoose.Schema({
    surveyId: {
      type: Number,
      required: true,
    },
    surveyTitle: {
      type: String,
      required: true,
    },
    survey: [questionSchema],
});

export default mongoose.model('survey', surveySchema);
