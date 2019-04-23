var express=require("express");
var answer=express.Router();
var AnswerModel=require("../model/AnswerSchema");
var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({extended: false});

answer.get("/",async (req,res)=>{
    try {
     res.send("test successfull");
    } catch (error) {
        res.send(error);
    }
});

answer.get("/:question_id/answers", urlencodedParser, function(req, res){
    var question_id = req.params.question_id;
    console.log("Inside get all answers request. Question id: "+question_id);
    kafka.make_request('answer', question_id, function(err, results){
        console.log("In get all answers - kafka make request")
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
                res.json({
                    answers: results
                });

                res.end();
            }
    })
})
// answer.get("/:id",async (req,res)=>{
//     try {
//      let result=await AnswerModel.find({_id:req.params.id})
//     res.status(200).json(result);
//     } catch (error) {
//         res.send(error);
//     }
// });

module.exports=answer;