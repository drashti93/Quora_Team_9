var express = require("express");
var topic = express.Router();
var TopicModel = require("../model/TopicSchema");
var UserModel = require("../model/UserSchema");
var kafka = require("../kafka/client");
var client = require('../resources/redis');

//Follow a Topic

topic.post("/topics/follow", async (req, res) => {
	try {
		let { userId, topicId } = req.body;
		let result = await UserModel.update(
			{ _id: userId },
			{
				$push: { topicsFollowed: topicId }
			}
		);
		res.status(200).json({});
	} catch (error) {
		res.send(error);
	}
});

//GET ALL QUESTIONS (FOR FEED)

question.get("/following", (req, res) => {
    let { _id } = req.body;

    //let questions = await QuestionModel.find({}).populate({path:'chats.uid', select:["firstName"]})


	QuestionModel.find({}, (err, result) => {
		if (err) {
			console.log("Error in retrieving questions", err);
			res.writeHead(400, {
				"Content-type": "text/plain"
			});
			res.end("Error in retrieving questions");
		} else {
			res.writeHead(200, {
				"Content-type": "application/json"
			});
			let finalResult = [];
			result.forEach(question => {
				if (question.followers.includes(_id)) {
					finalResult.push(question);
				}
			});

			console.log("questions: ", finalResult);
			res.end(JSON.stringify(finalResult));
		}
	});
});


module.exports = topic;
