var UserModel = require('../../../backend/model/UserSchema');


function  handle_request(msg, callback){
UserModel.find({'userId': msg, 'Profile_views': true}, function(err,result){

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