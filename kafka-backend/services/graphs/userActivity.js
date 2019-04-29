var QuestionModel = require('../../../backend/model/QuestionSchema');


function  handle_request(msg, callback){
    QuestionModel.find({'userId': msg}.sort({$natural:1})

    , function(err,result){

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