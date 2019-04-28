const express = require('express');
const router = express.Router();
const mongoose = require('../resources/mongoose');

const UserSchema = require('../model/UserSchema')


router.get('/:userId', async (request, response) => {

	console.log(`\n\nInside GET /users/:userId`);

	// try {
	// 	let userDocument = await UserSchema.findOneAndUpdate(
	// 		{ _id: request.params.userId },
	// 		{ $inc: { views : 1 } },
	// 		{ new: true }
	// 	);

	// 	//If user present
	// 	if(userDocument) {
	// 		console.log(`Sucessfully fetched user ${request.params.userId}:\n ${userDocument}`);
	// 		response.status(200).json(userDocument);
	// 	} else {
	// 		console.log(`User ${request.params.userId} not found`);
	// 		response.status(404).json({messgage: `User ${request.params.userId} not found`});
	// 	}
	// } catch (error) {
	// 	console.log(`Error fetching user ${request.params.userId}:\n ${error}`);
	// 	response.status(500).json({ error: error, message: `Error fetching user ${request.params.userId}`});
	// }

	try {
		let userDocument = await UserSchema.findOne(
			{ _id: request.params.userId }
		);

		//If user present
		if(userDocument) {
			console.log(`Sucessfully fetched user ${request.params.userId}:\n ${userDocument}`);
			response.status(200).json(userDocument);
		} else {
			console.log(`User ${request.params.userId} not found`);
			response.status(404).json({messgage: `User ${request.params.userId} not found`});
		}
	} catch (error) {
		console.log(`Error fetching user ${request.params.userId}:\n ${error}`);
		response.status(500).json({ error: error, message: `Error fetching user ${request.params.userId}`});
	}
});


router.get('/:userId/follow/enable', async (request, response) => {

	console.log(`\n\nInside GET /users/:userId/follow/enable`);

	try {
		let userDocument = await UserSchema.findOneAndUpdate(
			{ _id: request.params.userId },
			{
				$set: {
					isFollowAllowed: true
				}
			},
			{ new: true }
		);

		//If user present
		if(userDocument) {
			console.log(`Sucessfully enabled follow for the user ${request.params.userId}:\n ${userDocument}`);
			response.status(200).json(userDocument);
		} else {
			console.log(`User ${request.params.userId} not found`);
			response.status(404).json({messgage: `User ${request.params.userId} not found`});
		}
	} catch (error) {
		console.log(`Error while enabling follow for the user ${request.params.userId}:\n ${error}`);
		response.status(500).json({ error: error, message: `Error while enabling follow for the user ${request.params.userId}`});
	}
});


router.get('/:userId/follow/disable', async (request, response) => {

	console.log(`\n\nInside GET /users/:userId/follow/disable`);

	try {
		let userDocument = await UserSchema.findOneAndUpdate(
			{ _id: request.params.userId },
			{
				$set: {
					isFollowAllowed: false
				}
			},
			{ new: true }
		);

		//If user present
		if(userDocument) {
			console.log(`Sucessfully disabled follow for the question ${request.params.userId}:\n ${userDocument}`);
			response.status(200).json(userDocument);
		} else {
			console.log(`User ${request.params.userId} not found`);
			response.status(404).json({messgage: `User ${request.params.userId} not found`});
		}
	} catch (error) {
		console.log(`Error while disabling follow for the question ${request.params.userId}:\n ${error}`);
		response.status(500).json({ error: error, message: `Error while enabling follow for the user ${request.params.userId}` });
	}
});


router.get('/:userId/followers', async (request, response) => {

	console.log(`\n\nInside GET /users/:userId/followers`);

	try {
		let userDocument = await UserSchema.findOne(
			{ _id: request.params.userId }
		);

		//If user present
		if(userDocument) {
			console.log(`Sucessfully fetched followers for the user ${request.params.userId}:\n ${userDocument}`);
			response.status(200).json(userDocument.followers);
		} else {
			console.log(`User ${request.params.userId} not found`);
			response.status(404).json({messgage: `User ${request.params.userId} not found`});
		}
	} catch (error) {
		console.log(`Error fetching followers for the user ${request.params.userId}:\n ${error}`);
		response.status(500).json({ error: error, message: `Error fetching followers for the user ${request.params.userId}` });
	}
});


router.get('/:userId/following', async (request, response) => {

	console.log(`\n\nInside GET /users/:userId/following`);

	try {
		let userDocument = await UserSchema.findOne(
			{ _id: request.params.userId }
		);

		//If user present
		if(userDocument) {
			console.log(`Sucessfully fetched users following ${request.params.userId}:\n ${userDocument}`);
			response.status(200).json(userDocument.following);
		} else {
			console.log(`User ${request.params.userId} not found`);
			response.status(404).json({messgage: `User ${request.params.userId} not found`});
		}
	} catch (error) {
		console.log(`Error fetching users following ${request.params.userId}:\n ${error}`);
		response.status(500).json({ error: error, message: `Error fetching users following ${request.params.userId}`});
	}
});


router.get('/:userId/bookmarks', async (request, response) => {

	console.log(`\n\nInside GET /users/:userId/bookmarks`);

	try {
		let userDocument = await UserSchema.findOne(
			{ _id: request.params.userId }
		);

		//If user present
		if(userDocument) {
			console.log(`Sucessfully fetched bookmarked answers for user ${request.params.userId}:\n ${userDocument}`);
			response.status(200).json(userDocument.bookmarkedAnswers);
		} else {
			console.log(`User ${request.params.userId} not found`);
			response.status(404).json({messgage: `User ${request.params.userId} not found`});
		}
	} catch (error) {
		console.log(`Error fetching bookmarked answers for user ${request.params.userId}:\n ${error}`);
		response.status(500).json({ error: error, message: `Error fetching bookmarked answers for user ${request.params.userId}`});
	}
});


module.exports = router;