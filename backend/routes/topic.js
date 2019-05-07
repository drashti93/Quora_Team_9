var express = require("express");
var topic = express.Router();
var QuestionModel = require("../model/QuestionSchema");
var UserModel = require("../model/UserSchema");
var TopicModel = require("../model/TopicSchema");
var kafka = require("../kafka/client");
var client = require("../resources/redis");

//Follow a Topic

topic.post("/follow", async (req, res) => {
	
	console.log(`\n\nInside POST /topics/follow`);

	try {
		let { userId, topicId } = req.body;

		let checkUserInTopicFollow = await UserModel.findOne(
			{ _id: userId, topicsFollowed: topicId }
		);

		console.log(`\n\n checkUserInTopicFollow- ${checkUserInTopicFollow}`);

		if(checkUserInTopicFollow) {

			let addTopicToUser = await UserModel.findOneAndUpdate(
				{ _id: userId },
				{ $pull: { topicsFollowed: topicId } },
				{ new: true }
			);

			res.status(200).json(addTopicToUser);

		} else {

			let addTopicToUser = await UserModel.findOneAndUpdate(
				{ _id: userId },
				{ $push: { topicsFollowed: topicId } },
				{ new: true }
			);

			res.status(200).json(addTopicToUser);
		}
	} catch (error) {
		res.status(500).json({"error": error});
	}
});

topic.post("/", async (req, res) => {
	try {
		let { name } = req.body;
		console.log(name);
		console.log("here");
		let topicInstance = new TopicModel({
			name
		});
		let result = await topicInstance.save();
		res.status(200).json(result);
	} catch (error) {
		console.log(error);
	}
});
topic.get("/", async (req, res) => {
	try {
		console.log("here");
		let result = await TopicModel.find({});
		res.status(200).json(result);
	} catch (error) {
		console.log(error);
	}	
});
// Search topic
topic.get("/:topicId", (request, response) => {
	console.log(`\n\nInside Get /topics/:topicId`);
	TopicModel.find({}, (error, topicDocument) => {
		if (error) {
			console.log(
				`Error while getting topics ${
					request.params.userId
				}:\n ${error}`
			);
			response.status(500).json({
				error: error,
				message: `Error while getting topics ${request.params.userId}`
			});
		} else if (topicDocument) {
			console.log(
				`Error while getting topics ${
					request.params.userId
				}:\n ${topicDocument}`
			);
			let result = topicDocument;
			response.status(200).json(result);
		} else {
			response.status(404).json({ message: `Topic not found` });
		}
	});
});

//GET QUESTIONS FOR A PARTICULAR TOPIC (FOR FEED)

topic.get("/:topicId/questions/following", async (req, res) => {
	let topicId = req.params.topicId;

	try {
		let result = await QuestionModel.find({ topicsArray: topicId })
			.populate({
				path: "answers",
				populate: {
					path: "upvotes downvotes bookmarks images userId comments.userId"
				}
			})
			.exec();

		if (result) {
			console.log("questions: ", result);
			res.status(200).json(result);
			// res.end(JSON.stringify(result));
		} else {
			console.log(`Topic ${req.params.topicId} not found`);
			response
				.status(404)
				.json({ messgage: `Topic ${req.params.topicId} not found` });
		}
	} catch (error) {
		console.log(
			`Error fetching questions for topic ${
				req.params.topicId
			}:\n ${error}`
		);
		response.status(500).json({
			error: error,
			message: `Error fetching questions for topic ${req.params.topicId}`
		});
	}
});

//Get topic details and number of followers in topic details page
topic.get("/:topicId/details", async (request, response) => {

	console.log(`\n\n\nInside Get /topics/:topicId/details`);

	let topicId = request.params.topicId;

	try {

		let checkTopicInUsers = await UserModel.find({ topicsFollowed: topicId });
		let topicDetail = await TopicModel.findOne({ _id: topicId });

		if(topicDetail && checkTopicInUsers) {

			let result = {};
			result.topicId = topicId;
			result.topicName = topicDetail.name;
			result.followers = checkTopicInUsers.length;

			console.log(`Result - ${result}`);
			console.log(`Topic Name - ${result.topicName}`);
			console.log(`Topic Followers - ${result.followers}`);

			response.status(200).json(result);

		} else {
			console.log(`Topic ${topicId} not found`);
			response
				.status(404)
				.json({ messgage: `Topic ${topicId} not found` });
		}
	} catch (error) {
		console.log(
			`Error fetching topic details for topic - ${
				req.params.topicId
			}:\n ${error}`
		);
		response.status(500).json({
			error: error,
			message: `Error fetching topic details for topic - ${
				req.params.topicId
			}`
		});
	}
});

module.exports = topic;
