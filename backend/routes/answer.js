var express = require("express");
var answer = express.Router();
var AnswerModel = require("../model/AnswerSchema");
var QuestionModel = require("../model/QuestionSchema");
var bodyparser = require("body-parser");
var urlencodedParser = bodyparser.urlencoded({ extended: false });
var kafka = require("../kafka/client");
var client = require("../resources/redis");

answer.get("/:question_id/answers", urlencodedParser, function(req, res) {
	client.get("answersKey", function(err, results) {
		if (results) {
			res.json({ answers: results });

			res.end();
		} else {
			var question_id = req.params.question_id;
			console.log(
				"Inside get all answers request. Question id: " + question_id
			);
			kafka.make_request("get_answers", question_id, function(
				err,
				results
			) {
				console.log("In get all answers - kafka make request");
				if (err) {
					console.log("Inside err");
					res.json({
						status: "error",
						msg: "System Error, Try Again."
					});
				} else {
					console.log("Inside else");
					client.set("answersKey", results);
					res.json({ answers: results });

					res.end();
				}
			});
		}
	});
});

//to add an answer
answer.post("/", async (req, res) => {
	kafka.make_request("post_answer", req.body, function(err, results) {
		console.log("In post answers - kafka make request");
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

//edit an answer
answer.post("/edit", async (req, res) => {
	try {
		let {
			answerText,
			isAnonymous,
			credentials,
			questionId,
			answerId
		} = req.body;
		let result = await AnswerModel.updateOne(
			{ _id: answerId },
			{
				$set: { answerText, isAnonymous, credentials }
			}
		);
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
		let result1 = await QuestionModel.updateOne(
			{ _id: questionId },
			{
				$pull: {
					answers: answerId
				}
			}
		);
		//delete the answer from answer collection
		let result2 = await AnswerModel.remove({ _id: answerId });
		res.status(200).json(result2);
	} catch (error) {
		res.send(error);
	}
});

answer.post("/:answerId/upvote", async (req, res) => {
	try {

		let checkUserInUpvotes = await AnswerModel.findOne({ _id: req.params.answerId, upvotes: req.body.userId });

		if(checkUserInUpvotes) {

			console.log(`User - ${req.body.userId} already Upvoted this answer - ${req.params.answerId} ! Cannot upvote again!`);
			res.status(500).json({"message": `User - ${req.body.userId} already Upvoted this answer - ${req.params.answerId}`});

		} else {

			let answer = await AnswerModel.findOneAndUpdate(
					{ _id: req.params.answerId },
					{ $push : { upvotes: req.body.userId } },
					{ new: true }
				);
			
			if(answer) {
				console.log(`Successfully Upvoted`);

				await AnswerModel
					.findOneAndUpdate(
						{ _id: req.params.answerId },
						{ $pull : { downvotes: req.body.userId } },
						{ new: true }
					);

				res.status(200).json({answer});

			} else {
				console.log(`Upvote failed`);
				res.status(500).json({"message": "Upvote failed"});
			}
		}
	} catch (error) {
		res.status(500).json({"error": error});
	}
});

answer.post("/:answerId/downvote", async (req, res) => {
	try {
		let checkUserInDownvotes = await AnswerModel.findOne({ _id: req.params.answerId, downvotes: req.body.userId });

		if(checkUserInDownvotes) {

			console.log(`User - ${req.body.userId} already Upvoted this answer - ${req.params.answerId} ! Cannot downvote again!`);
			res.status(500).json({"message": `User - ${req.body.userId} already Upvoted this answer - ${req.params.answerId}`});

		} else {

			let answer = await AnswerModel.findOneAndUpdate(
					{ _id: req.params.answerId },
					{ $push : { downvotes: req.body.userId } },
					{ new: true }
				);
			
			if(answer) {
				console.log(`Successfully downvoted`);

				await AnswerModel
					.findOneAndUpdate(
						{ _id: req.params.answerId },
						{ $pull : { upvotes: req.body.userId } },
						{ new: true }
					);

				res.status(200).json({answer});

			} else {
				console.log(`downvote failed`);
				res.status(500).json({"message": "downvote failed"});
			}
		}
	} catch (error) {
		res.status(500).json({"error": error});
	}
});

answer.post("/bookmark", async (req, res) => {
	try {
		let { userId, questionId, answerId } = req.body;
		let result = await AnswerModel.update(
			{ _id: answerId },
			{
				$push: { bookmarks: userId }
			}
		);
		res.status(200).json({});
	} catch (error) {
		res.send(error);
	}
});

// answer.get("/:userId/answers", async(req, res) => {
//     try {
//         let {userId} = req.body;
//         let result1 = await AnswerModel.find({userId: userId});
//         let result2 = await QuestionModel.find({})
//     } catch(error) {
//         res.send(error);
//     }
// })
module.exports = answer;
