import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import surveyRouter from './routes/survey/survey.router.js';
import mongoDbConnect from './services/mongo.js';
import { loadSurveys } from './models/survey.model.js';
import feedbacksRouter from './routes/feedback/feedback.router.js';
import { createDummyFeedback, createDummyUsers } from './models/feedback.model.js';

const corsOptions = {
    origin: true, // Allows all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, sessions)
};

dotenv.config();

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello');
} );

app.use('/survey', surveyRouter);
app.use('/feedback', feedbacksRouter)

async function startServer() {
    await mongoDbConnect();
    await loadSurveys();
    // await createDummyUsers();
    // await createDummyFeedback();

    app.listen(4000 , () => {
        console.log('server is running on port 4000');
    });
}

startServer();









