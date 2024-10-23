import express from 'express';
import { httpGetSurvey, httpPostSurvey } from './survey.controller.js';

const surveyRouter = express.Router();

surveyRouter.get('/', httpGetSurvey);
surveyRouter.post('/', httpPostSurvey);

export default surveyRouter;
