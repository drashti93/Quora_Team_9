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
    }).populate('answers').exec(function(err, results){
      if(err){
        callback(err,"Error");
      }
      else if(results.length > 0){
        callback(null,result);
      }
    })                 
    }  
    exports.handle_request = handle_request;
