var express = require("express");
var question = express.Router();
const UserSchema = require("../model/UserSchema");
var QuestionModel = require("../model/QuestionSchema");
var UserModel = require("../model/UserSchema");
var TopicModel = require("../model/TopicSchema");
var kafka = require("../kafka/client");
var client = require("../resources/redis");

//Follow a Question
question.post("/follow", async (req, res) => {
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



//GET ALL QUESTIONS FROM A PARTICULAR TOPIC (FOR FEED)

question.post("/", async (req, res) => {
	kafka.make_request("post_question", req.body, function(err, results) {
		console.log("In post question - kafka make request");
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
	});
});

question.post("/edit", async (req, res) => {
	kafka.make_request("edit_question", req.body, function(err, results) {
		console.log("In edit question - kafka make request");
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
	});
});

question.delete("/", async (req, res) => {
	kafka.make_request("delete_question", req.body, function(err, results) {
		console.log("In delete question - kafka make request");
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
	});
});

// Search question
question.get("/:questionId", (request, response) => {
	console.log(`\n\nInside Get /questions/:questionId`);
	QuestionModel.find({}, (error, questionDocument) => {
		if (error) {
			console.log(
				`Error while getting questions ${
					request.params.userId
				}:\n ${error}`
			);
			response.status(500).json({
				error: error,
				message: `Error while getting questions ${
					request.params.userId
				}`
			});
		} else if (questionDocument) {
			console.log(
				`Successfully got all questions ${
					request.params.userId
				}:\n ${questionDocument}`
			);
			let result = questionDocument;
			response.status(200).json(result);
		} else {
			response.status(404).json({ message: `Question not found` });
		}
	});
});
module.exports = question;
