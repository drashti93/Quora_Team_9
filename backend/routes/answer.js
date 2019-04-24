var express = require("express");
var answer = express.Router();
var AnswerModel = require("../model/AnswerSchema");
var QuestionModel = require("../model/QuestionSchema");
var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({ extended: false });

answer.get("/", async (req, res) => {
    try {
        res.send("test successfull");
    } catch (error) {
        res.send(error);
    }
});

answer.get("/:question_id/answers", urlencodedParser, function (req, res) {
    var question_id = req.params.question_id;
    console.log("Inside get all answers request. Question id: " + question_id);
    kafka.make_request('answer', question_id, function (err, results) {
        console.log("In get all answers - kafka make request")
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else");
            res.json({
                answers: results
            });

            res.end();
        }
    })
})

//to add an answer
answer.post("/", async (req, res) => {
    try {
        let { answerText, userId, isAnonymous, credentials, questionId } = req.body;
        let answerInstance = new AnswerModel({ answerText, userId, isAnonymous, credentials });
        //add answer to answer collection
        let result = await answerInstance.save();
        //add answerid to answer array in question collection
        let result2 = await QuestionModel.updateOne({ _id: questionId }, {
            $push: {
                answers: result.id
            }
        })
        res.status(200).json(result2);
    } catch (error) {
        res.send(error);
    }
});

//edit an answer
answer.post("/edit", async (req, res) => {
    try {
        let { answerText, isAnonymous, credentials, questionId, answerId } = req.body;
        let result = await AnswerModel.updateOne({ _id: answerId }, {
            $set:
                { answerText, isAnonymous, credentials }
        });
        res.status(200).json(result);
    } catch (error) {
        res.send(error);
    }
});

//delete an answer
answer.delete("/", async (req, res) => {
    try {
        let { answerId, questionId } = req.body;
        //remove answerid from answer array in question collection
        let result1 = await QuestionModel.updateOne({ _id: questionId }, {
            $pull: {
                answers: answerId
            }
        })
        //delete the answer from answer collection
        let result2 = await AnswerModel.remove({ _id: answerId });
        res.status(200).json(result2);
    } catch (error) {
        res.send(error);
    }
});

answer.post("/answer/upvote", async (req, res) => {
    try {
        let { userId, questionId, answerId } = req.body;
        let result = await AnswerModel.update({ _id: answerId }, {
            $push:
                { upvotes: userId }
        });
        res.status(200).json({});
    } catch (error) {
        res.send(error);
    }
});

answer.post("/answer/downvote", async (req, res) => {
    try {
        let { userId, questionId, answerId } = req.body;
        let result = await AnswerModel.update({ _id: answerId }, {
            $push:
                { downvotes: userId }
        });
        res.status(200).json({});
    } catch (error) {
        res.send(error);
    }
});

answer.post("/answer/bookmark", async (req, res) => {
    try {
        let { userId, questionId, answerId } = req.body;
        let result = await AnswerModel.update({ _id: answerId }, {
            $push:
                { bookmarks: userId }
        });
        res.status(200).json({});
    } catch (error) {
        res.send(error);
    }
});
module.exports = answer;