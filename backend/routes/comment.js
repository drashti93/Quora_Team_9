var express = require("express");
var comment = express.Router();
var AnswerModel = require("../model/AnswerSchema");
var QuestionModel = require("../model/QuestionSchema");
var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({ extended: false });


//delete comment
comment.delete("/", async (req, res) => {
    try {
        let { commentId, answerId } = req.body;
        let result = await AnswerModel.updateOne({ _id: answerId }, {
            $pull: {
                comments: {
                    _id: commentId
                }
            }
        });
        res.status(200).json(result);
    } catch (error) {
        res.send(error);
    }
});


module.exports = comment;