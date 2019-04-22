var express=require("express");
var question=express.Router();
var QuestionModel=require("../model/QuestionSchema");


question.post("/",async (req,res)=>{
    try {
    let {userId}=req.body; 
    let questionInstance=new QuestionModel({
        
    });
    let result=await QuestionModel
    } catch (error) {
        res.send(error);
    }
});
// answer.get("/:id",async (req,res)=>{
//     try {
//      let result=await AnswerModel.find({_id:req.params.id})
//     res.status(200).json(result);
//     } catch (error) {
//         res.send(error);
//     }
// });

module.exports=answer;