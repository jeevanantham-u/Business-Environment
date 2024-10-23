import surveyDb from "./survey.mongo.js";

async function loadSurveys() {
  let survey = {
    surveyId: 1,
    surveyTitle: "checking health",
    survey: [
      {
        question: 'Do you have any health issue currently?', 
        options: ['yes', 'no'],
      },
      {
        question: 'Do you have any health issue in the past?', 
        options: ['yes', 'no'],
      },
      {
        question: 'Do you think you will have any health issue in the future?', 
        options: ['yes', 'no'],
      },
    ]
  };

  await saveSurvey(survey);
}


async function saveSurvey(survey) {
  return await surveyDb.findOneAndUpdate(
    { surveyId: survey.surveyId },
    survey,
    { upsert: true }
  );
}

async function addNewSurvey(survey) {
  if (!survey) {
    throw new Error('Survey object is required');
  }

  await saveSurvey(survey);
}

async function getAllSurvey() {
  try {
    return await surveyDb.find();
  } catch (error) {
    console.error('Error retrieving surveys:', error);
    throw new Error('Could not retrieve surveys'); 
  }
}

export {
  loadSurveys,
  saveSurvey,
  addNewSurvey,
  getAllSurvey,
};
