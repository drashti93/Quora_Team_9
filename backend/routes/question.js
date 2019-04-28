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

module.exports = question;
