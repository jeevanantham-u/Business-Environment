import express from 'express';

import { postUserFeedback, getUserFeedback } from '../../models/feedback.model.js';

const feedbacksRouter = express.Router();

// Route to post feedback
feedbacksRouter.post('/', postUserFeedback);

// Route to get feedback for a user
feedbacksRouter.get('/:userId', getUserFeedback);

export default feedbacksRouter;
