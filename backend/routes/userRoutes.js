const express = require('express');
const router = express.Router();
const mongoose = require('../resources/mongoose');

const UserSchema = require('../model/UserSchema')


router.post('/:userId/follow/enable', function (request, response) {

	console.log(`\n\nInside Post /users/:userId/follow/enable`);
	UserSchema.findOneAndUpdate(
		{ userId: request.params.userId },
		{
			$set: {
				isFollowAllowed: true
			}
		},
		{ new: true },
		(error, questionDocument) => {
			if (err) {
				console.log(`Error while enabling follow for the user ${request.params.userId}:\n ${error}`);
				// response.status(500).json({ error: err, message: "Attaching Files to Course Failed" });
				response.status(500).json({ error: error, message: `Error while enabling follow for the user ${request.params.userId}` });
			} else {
				console.log(`Sucessfully enabled follow for the user ${request.params.userId}:\n ${questionDocument}`);
				response.status(200).json(questionDocument);
			}
		}
	);
});


router.post('/:userId/follow/disable', function (request, response) {

	console.log(`\n\nInside Post /users/:userId/follow/disable`);
	UserSchema.findOneAndUpdate(
		{ userId: request.params.userId },
		{
			$set: {
				isFollowAllowed: false
			}
		},
		{ new: true },
		(error, questionDocument) => {
			if (err) {
				console.log(`Error while disabling follow for the question ${request.params.questionId}:\n ${error}`);
				// response.status(500).json({ error: err, message: "Attaching Files to Course Failed" });
				response.status(500).json({ error: error, message: `Error while enabling follow for the question ${request.params.questionId}` });
			} else {
				console.log(`Sucessfully disabled follow for the question ${request.params.questionId}:\n ${questionDocument}`);
				response.status(200).json(questionDocument);
			}
		}
	);
});


module.exports = router;