var express = require("express");
var question = express.Router();
var QuestionModel = require("../model/QuestionSchema");
var UserModel = require("../model/UserSchema");
var kafka = require("../kafka/client");
var client = require('../resources/redis');

//Follow a Question

question.post("/questions/follow", async (req, res) => {
	try {
		let { userId, questionId } = req.body;
		let result = await QuestionModel.update(
			{ _id: questionId },
			{
				$push: { followers: userId }
			}
		);
		res.status(200).json({});
	} catch (error) {
		res.send(error);
	}
});

//GET QUESTIONS FROM TOPICS & FOLLOWING - FOR FEED

// question.get("/feed", async (req, res) => {
// 	try {
		// let { userId } = req.body;
		// Model.QuestionModel.find((err, result) => {
        //     if (err) {
        //         console.log("Error in retrieving courses ALL data", err);
        //         res.writeHead(400, {
        //             "Content-type": "text/plain"
        //         });
        //         res.end("Error in retrieving courses All data");
        //     } else {
        //         console.log("courses ALL jason Data: ", JSON.stringify(result));

        //         res.writeHead(200, {
        //             "Content-type": "application/json"
        //         });
        //         res.end(JSON.stringify(result));
        //     }
        // });

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

