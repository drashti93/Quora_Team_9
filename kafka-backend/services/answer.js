var Users = require('../../backend/model/UserSchema');
var AnswerModel = require('../model/AnswerSchema');
var QuestionModel = require('../model/QuestionSchema');

async function handle_request_getanswers(msg, callback) {
  console.log("Handle request - get all answers");
  console.log(msg);
  try {
    let result = await QuestionModel.findOne({
      _id: msg
    }).populate({
      path:'answers',
     populate:{
        path:"userId",
        select:["firstName","lastName","email"]
     }
    }).exec();
    callback(null, result.answers)
  } catch (error) {
    callback(error, null);
  }

}

async function handle_request_postanswers(msg, callback) {
  console.log("posting answers");
  try {
    let { answerText, userId, isAnonymous, credentials, questionId } = msg;
    let answerInstance = new AnswerModel({ answerText, userId, isAnonymous, credentials });
    //add answer to answer collection
    let result = await answerInstance.save();
    //add answerid to answer array in question collection
    let result2 = await QuestionModel.updateOne({ _id: questionId }, {
      $push: {
        answers: result.id
      }
    })
    callback(null, result2)
  } catch (error) {
    callback(error, null);
  }
}

module.exports = {
  getanswers: { handle_request: handle_request_getanswers },
  postanswers: { handle_request: handle_request_postanswers }
};
