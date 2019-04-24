var express = require("express");
var question = express.Router();
var QuestionModel = require("../model/QuestionSchema");


// question.get("/",async (req,res)=>{
//     try {
//         res.send("test successfull");
//        } catch (error) {
//            res.send(error);
//        }
// });

question.post("/", async (req, res) => {
    try {
        let { userId, questionText } = req.body;
        let questionInstance = new QuestionModel({
            questionText,
            userId
        });
        let result = await questionInstance.save();
        res.status(200).json(result);
    } catch (error) {

    }
});
question.post("/edit", async (req, res) => {
    try {
        console.log("here");
        let { _id, questionText } = req.body;
        let result = await QuestionModel.updateOne({ _id }, { questionText });
        res.status(200).json(result);
    } catch (error) {

    }
});
question.delete("/", async (req, res) => {
    try {
        let { _id } = req.body;
        let result = await QuestionModel.remove({ _id });
        res.status(200).json(result);
    } catch (error) {

    }
});

module.exports = question;