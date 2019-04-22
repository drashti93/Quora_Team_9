var express=require("express");
var question=express.Router();
var QuestionModel=require("../model/QuestionSchema");


question.get("/",async (req,res)=>{
    try {
        res.send("test successfull");
       } catch (error) {
           res.send(error);
       }
});

module.exports=question;