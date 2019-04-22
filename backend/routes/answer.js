var express=require("express");
var answer=express.Router();
var AnswerModel=require("../model/AnswerSchema");


answer.get("/",async (req,res)=>{
    try {
     res.send("test successfull");
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