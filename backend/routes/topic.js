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

topic.post("/",async(req,res)=>{
	try {
		let { name } = req.body;
		console.log(name);
		console.log("here");
		let topicInstance =new TopicModel({
			name
		});
		let result=await topicInstance.save();
		res.status(200).json(result);
	} catch (error) {
		console.log(error);
	}
});
topic.get("/",async(req,res)=>{
	try {
		let result=await TopicModel.find({});
		res.status(200).json(result);
	} catch (error) {
		console.log(error);
	}
});

module.exports = topic;
