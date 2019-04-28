const express = require('express');
const router = express.Router();
const mongoose = require('../resources/mongoose');

const UserSchema = require('../model/UserSchema')


router.get('/:userId/follow/enable',  (request, response) => {

	console.log(`\n\nInside GET /users/:userId/follow/enable`);

	UserSchema.findOneAndUpdate(
		{ userId: request.params.userId },
		{
			$set: {
				isFollowAllowed: true
			}
		},
		{ new: true },
		(error, userDocument) => {
			if (error) {
				console.log(`Error while enabling follow for the user ${request.params.userId}:\n ${error}`);
				response.status(500).json({ error: error, message: `Error while enabling follow for the user ${request.params.userId}` });
			} else {
				console.log(`Sucessfully enabled follow for the user ${request.params.userId}:\n ${userDocument}`);
				response.status(200).json(userDocument);
			}
		}
	);
});


router.get('/:userId/follow/disable', (request, response) => {

	console.log(`\n\nInside GET /users/:userId/follow/disable`);

	UserSchema.findOneAndUpdate(
		{ userId: request.params.userId },
		{
			$set: {
				isFollowAllowed: false
			}
		},
		{ new: true },
		(error, userDocument) => {
			if (error) {
				console.log(`Error while disabling follow for the question ${request.params.userId}:\n ${error}`);
				response.status(500).json({ error: error, message: `Error while enabling follow for the user ${request.params.userId}` });
			} else {
				console.log(`Sucessfully disabled follow for the question ${request.params.userId}:\n ${userDocument}`);
				response.status(200).json(userDocument);
			}
		}
	);
});


router.get('/:userId/followers', (request, response) => {

	console.log(`\n\nInside GET /users/:userId/followers`);

	UserSchema.findOne(
		{ userId: request.params.userId },
		(error, userDocument) => {
			if (error) {
				console.log(`Error fetching followers for the user ${request.params.userId}:\n ${error}`);
				response.status(500).json({ error: error, message: `Error fetching followers for the user ${request.params.userId}` });
			} else {
				console.log(`Sucessfully fetched followers for the user ${request.params.userId}:\n ${userDocument}`);
				response.status(200).json(userDocument.followers);
			}
		}
	);
});


router.get('/:userId/following', (request, response) => {

	console.log(`\n\nInside GET /users/:userId/following`);

	UserSchema.findOne(
		{ userId: request.params.userId },
		(error, userDocument) => {
			if (error) {
				console.log(`Error fetching users following ${request.params.userId}:\n ${error}`);
				response.status(500).json({ error: error, message: `Error fetching users following ${request.params.userId}` });
			} else {
				console.log(`Sucessfully fetched users following ${request.params.userId}:\n ${userDocument}`);
				response.status(200).json(userDocument.following);
			}
		}
	);
});


router.get('/:userId/bookmarks', (request, response) => {

	console.log(`\n\nInside GET /users/:userId/bookmarks`);

	UserSchema.findOne(
		{ userId: request.params.userId },
		(error, userDocument) => {
			if (error) {
				console.log(`Error fetching users following ${request.params.userId}:\n ${error}`);
				response.status(500).json({ error: error, message: `Error fetching users following ${request.params.userId}` });
			} else {
				console.log(`Sucessfully fetched users following ${request.params.userId}:\n ${userDocument}`);
				response.status(200).json(userDocument.following);
			}
		}
	);
});


module.exports = router;