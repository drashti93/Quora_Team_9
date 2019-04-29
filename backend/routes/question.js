var express = require("express");
var question = express.Router();
const UserSchema = require("../model/UserSchema");
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

// Search question
question.get("/questions/:questionId", (request, response) => {
    console.log(`\n\nInside Get /questions/:questionId`);
    let keyword = request.body.keyword;
    QuestionModel.find(
        {},
        (error,questionDocument) => {
            if(error) {
                console.log(
					`Error while getting questions ${
						request.params.userId
					}:\n ${error}`
                );
                response
                .status(500)
                .json({
                    error: error,
                    message: `Error while getting questions ${
                        request.params.userId
                    }`
                });
            } else {
                console.log(
					`Successfully got User Profile details ${
						request.params.userId
					}:\n ${questionDocument}`
                );
                let result = questionDocument;
                response.status(200).json(result);                
            }             
        }
    )
});
module.exports = question;