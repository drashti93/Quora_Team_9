var AnswersModel = require('../../model/AnswerSchema');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

function  handle_request(msg, callback){
AnswersModel.aggregate(
    { $match: {userId:  ObjectId(msg)} },
    {$project:{keysize:{$size:"$downvotes"},downvotes:1,'userId':msg,'answerText':1}},
    {$sort: {keysize:-1} },
    {$limit: 5 }, function(err,result){
    // AnswersModel.find({'userId': msg}).sort({ downvotes: -1 }).limit(5).exec(function(err,result){

        if(err){
            console.log(err);
            callback(null, {
                status  : 400,
                message : "Failed while fetching"
            })
            throw err;

        }else{
            console.log("After fetching",result);
            callback(null, result)

        }

})

}

exports.handle_request = handle_request;