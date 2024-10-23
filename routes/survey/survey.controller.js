import { addNewSurvey, getAllSurvey, } from "../../models/survey.model.js";

async function httpGetSurvey(req, res) {
  return res.status(200).json(await getAllSurvey());
}

async function httpPostSurvey(req, res) {
  const survey = req.body;
  await addNewSurvey(survey);
  return res.status(201).json({
    ok: "Your survey is submitted successfully!",
  });
}

export { 
  httpGetSurvey,
  httpPostSurvey,
};

