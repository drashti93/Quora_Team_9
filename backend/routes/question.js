var express = require("express");
var question = express.Router();
var QuestionModel = require("../model/QuestionSchema");
var kafka = require('../kafka/client');


question.post("/questions/:questionID/follow", async (req, res) => {

    kafka.make_request('follow_question', req.body, function (err, results) {
        console.log("In follow question - kafka make request")
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            });
            res.end();
        } else {
            console.log("Inside else");
            res.status(200).json(results);
        }
    })
});