var express = require("express");
var question = express.Router();
var QuestionModel = require("../model/QuestionSchema");
var kafka = require('../kafka/client');

// question.get("/",async (req,res)=>{
//     try {
//         res.send("test successfull");
//        } catch (error) {
//            res.send(error);
//        }
// });

question.post("/", async (req, res) => {

    kafka.make_request('post_question', req.body, function (err, results) {
        console.log("In post question - kafka make request")
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
question.post("/edit", async (req, res) => {

    kafka.make_request('edit_question', req.body, function (err, results) {
        console.log("In edit question - kafka make request")
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
question.delete("/", async (req, res) => {


    kafka.make_request('delete_question', req.body, function (err, results) {
        console.log("In delete question - kafka make request")
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

module.exports = question;