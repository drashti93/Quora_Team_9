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

comment.post('/comment', async (req, res) => {
    try {
        let { answerId, userId, comment } = req.body;
        let result = await AnswerModel.updateOne({_id: answerId}, {
            $push: {
                comments: {
                userId: userId,
                comment: comment
                }
            }
        });
        res.status(200).json({});
    } catch(error) {
        res.send(error);
    }
})

comment.get('/:answerId/comment', async (req, res) => {
    client.get('commentsKey', async (err, results) => {
        if (results){
            res.status(200).json(result);
        }
        else {
            try {
                let { answerId } = req.params;
                let result = await AnswerModel.find({_id: answeId}, {comments: 1});
                client.set('commentsKey', results);
                res.status(200).json(result);
            } catch (error) {
                res.send(error);
            }
        }
    })
    
})

comment.put('/comment', async (req, res) => {
    try {
        let { answerId, commentId, comment } = req.body;
        let result = await AnswerModel.updateOne({_id: answerId, comments: {_id: commentId}}, {
            $set: {
                "comments.$.comment": comment
            }
        });
        res.status(200).json({});
    } catch(error) {
        res.send(error);
    }
})

module.exports = comment;