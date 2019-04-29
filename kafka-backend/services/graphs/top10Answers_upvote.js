var AnswersModel = require('../../../backend/model/AnswerSchema');


function  handle_request(msg, callback){
AnswersModel.aggregate(
    
    {$project:{keysize:{$size:"$upvotes"},'userId':msg}},
    {$sort: {keysize:-1} },
    {$limit: 10 }, function(err,result){

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
