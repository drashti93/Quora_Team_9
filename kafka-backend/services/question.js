// var UserModel = require('../../backend/model/UserSchema');
// var AnswerModel = require('../../backend/model/AnswerSchema');
var QuestionModel = require('../model/QuestionSchema');

//get answers
async function handle_request_postquestion(msg, callback) {
  try {
    console.log("Handle request -post a question");
    let { userId, questionText,topicsArray } = msg;
    let questionInstance = new QuestionModel({
      questionText,
      userId,
      topicsArray
    });
    let result = await questionInstance.save();
    console.log(result);
    callback(null, result);
  } catch (error) {
    console.log(error);
    callback(error, null);
  }
}
async function handle_request_editquestion(msg, callback) {
  try {
    console.log("Handle request -edit a question");
    let { _id, questionText } = msg;
    let result = await QuestionModel.updateOne({ _id }, { questionText });
    callback(null, result);
  } catch (error) {
    callback(error, null);
  }
}

async function handle_request_deletequestion(msg, callback) {
  try {
    console.log("Handle request -edit a question");

    let { _id } = msg;
    let result = await QuestionModel.remove({ _id });
    callback(null,result);
} catch (error) {
    callback(error,null);
}
}
module.exports = {
  postquestion: { handle_request: handle_request_postquestion },
  editquestion: { handle_request: handle_request_editquestion },
  deletequestion: { handle_request: handle_request_deletequestion }
};


