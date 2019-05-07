var express = require("express");
var question = express.Router();
const UserSchema = require("../model/UserSchema");
var QuestionModel = require("../model/QuestionSchema");
var AnswerModel = require("../model/AnswerSchema");
var UserModel = require("../model/UserSchema");
var TopicModel = require("../model/TopicSchema");
var kafka = require("../kafka/client");
var client = require("../resources/redis");

//Follow a Question
question.post("/follow", async (req, res) => {
	console.log(req.body)
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

question.get("/allquestions",async (req,res)=>{
    try {
        let result=await QuestionModel.find({});       
        res.status(200).json(result); 
    } catch (error) {
        res.status(500).json({message:"error while processing request!"});
        console.log(error);
    }

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


// Question Details
//This will give questions and coreesponding answers
question.get("/:questionId/details", async (request, response) => {
	console.log(`\n\nInside Get /questions/:questionId/details`);

	try {
		let questions = await QuestionModel
			.find({_id: request.params.questionId})
			.populate({
				path: "answers",
				populate: {
					path: "upvotes downvotes bookmarks images userId comments.userId"
				}
			});

		if(questions) {
			console.log(`Fetched question details successfully - ${questions}`);
			for(const question of questions) {
				// console.log(`Question Answers - ${question.answers}`);
				if(question.answers !== undefined) {
					const answerWithViews = [];
					for(const answer of question.answers) {
						// console.log(`\n\n\n\n\n\nEach answer - ${answer}`);
						let answerView = await AnswerModel.findOneAndUpdate(
							{ _id: answer._id },
							{ $inc: { views : 1 } },
							{ new: true }
						);
						answerWithViews.push(answerView)
					}
					question.answers = answerWithViews;
				}
			}
			response.status(200).json(questions);
		} else {
			console.log(`Fetching Question details for question ${request.params.questionId} unsuccessful`);
			response.status(404).json({messgage: `Fetching Question details for question ${request.params.questionId} unsuccessful`});
		}
	} catch (error) {
		console.log(`Error while fetching Question details for question ${request.params.questionId}:\n ${error}`);
		response.status(500).json({ error: error, message: `Error while fetching Question details for question ${request.params.questionId}` });
	}
});


module.exports = question;
