const express = require('express');
const router = express.Router();
const mongoose = require('../resources/mongoose');

const QuestionSchema = require('../model/QuestionSchema')


router.post('/:questionId/follow/enable', function(request, response) {

	console.log(`\n\nInside Post /question/:questionId/follow/enable`);
	QuestionSchema.findOneAndUpdate(
		{ CourseId: request.params.questionId },
		{
			$set: {
				isFollowAllowed: true
			}
		},
		{new: true},
		(error, questionDocument) => {
			if (err) {
				console.log(`Error while enabling follow for the question ${request.params.questionId}:\n ${error}`);
				// response.status(500).json({ error: err, message: "Attaching Files to Course Failed" });
				response.status(500).json({error: error, message: `Error while enabling follow for the question ${request.params.questionId}`});
			} else {
				console.log(`Sucessfully enabled follow for the question ${request.params.questionId}:\n ${questionDocument}`);
				response.status(200).json(questionDocument);
			}
		}
	);
});


router.post('/:questionId/follow/disable', function(request, response) {

	console.log(`\n\nInside Post /question/:questionId/follow/disable`);
	QuestionSchema.findOneAndUpdate(
		{ CourseId: request.params.questionId },
		{
			$set: {
				isFollowAllowed: false
			}
		},
		{new: true},
		(error, questionDocument) => {
			if (err) {
				console.log(`Error while disabling follow for the question ${request.params.questionId}:\n ${error}`);
				// response.status(500).json({ error: err, message: "Attaching Files to Course Failed" });
				response.status(500).json({error: error, message: `Error while enabling follow for the question ${request.params.questionId}`});
			} else {
				console.log(`Sucessfully disabled follow for the question ${request.params.questionId}:\n ${questionDocument}`);
				response.status(200).json(questionDocument);
			}
		}
	);
});


module.exports = router;