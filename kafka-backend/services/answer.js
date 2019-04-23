var Users = require('../../backend/model/UserSchema');
var Answers = require('../../backend/model/AnswerSchema');
var Questions = require('../../backend/model/QuestionSchema');
function  handle_request(msg, callback){
    console.log("Handle request - get all answers");
    console.log(msg);
    var res = {};
    var question_id = parseInt(msg.question_id, 10);
    Questions.find({
      question_id: question_id
    }, {answers: 1})                 
    }  
    exports.handle_request = handle_request;
