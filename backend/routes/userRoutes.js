const express = require("express");
const user = express.Router();

const mongoose = require("../resources/mongoose");
const UserSchema = require("../model/UserSchema");


// Edit Profile
user.post("/:userId/edit", (request,response) => {
	console.log(`\n\nInside Post /:userId/edit`);
	// body = request.body;
	let { firstName, lastName, aboutMe, phoneNumber, street, city, state, zipcode, startDate, endDate, gender, isFollowAllowed, topicsFollowed } = request.body;
	UserSchema.findOneAndUpdate(
		{ _id: request.params.userId },
		{
			$set: {
				firstName: firstName,
				lastName: lastName,
				// email: body.email,
				aboutMe: aboutMe,
				phoneNumber: phoneNumber,
				credentials: {
					address:{
						street: street,
						city: city,
						state: state,
						zipcode: zipcode,
						startDate: startDate,
						endDate: endDate,
					},	
					education: {
						school: school,
						concentration: concentration,
						secConcentration: secConcentration,
						degree: degree,
						gradYear: gradYear,
					},
					career: {
						position: position,
						company: company,
						startDate: startDate,
						endDate: endDate,
					}
				},
				gender: gender,
				isFollowAllowed: isFollowAllowed,
				topicsFollowed: topicsFollowed
			}
		},
		{ new: true },
		(error, userDocument) => {
			if (error) {
				console.log(
					`Error while editing or updating user profile ${
						request.params.userId
					}:\n ${error}`
				);
				// response.status(500).json({ error: err, message: "Attaching Files to Course Failed" });
				response
					.status(500)
					.json({
						error: error,
						message: `Error while editing or updating user profile ${
							request.params.userId
						}`
					});
			} else {
				console.log(
					`Sucessfully updated User Profile ${
						request.params.userId
					}:\n ${userDocument}`
				);
				response.status(200).json(userDocument);
			}
		}
	);
});


// Delete User account
user.delete("/:userId", async (request, response) => {
    try {
        let result = await UserSchema.updateOne({ _id: request.params.userId }, {
            $pull: {
                _id: request.params.userId
            }
        });
        response.status(200).json(result);
    } catch (error) {
        response.send(error);
    }
});


// Deactivate User Account
user.put("/:userId", (request, response) => {
	console.log(`\n\n Inside Post users/:userId/deactivateProfile`);
	UserSchema.findOneAndUpdate(
		{ _id: request.params.userId },
		{
			$set: {
				isDeactivated: true,
			}
		},
		{ new: true },
		(error, questionDocument) => {
			if(error){
				console.log(
					`Error while deactivating user account ${
						request.params.userId
					}:\n ${error}`
				);
				response.status(500).json({
					error: error,
					message: `Error while deactivating user account ${
						request.params.userId
					}`
				});
			} else if(questionDocument) { 
				console.log(`Account Deactivated succssfully ${request.params.userId}:\n ${questionDocument}`);
				response.status(200).json(questionDocument);
			} else {
				response.status(404).json({message: `User not found`});
			}
		} 
	)
});


// Get Profile
//Get user by id
user.get('/:userId', async (request, response) => {

	console.log(`\n\nInside GET /users/:userId`);

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

//Enable user follow
user.get('/:userId/follow/enable', async (request, response) => {

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


//Disable user follow
user.get('/:userId/follow/disable', async (request, response) => {

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


//Fetch user followers
user.get('/:userId/followers', async (request, response) => {

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


//Fetch users following user
user.get('/:userId/following', async (request, response) => {

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


//Fetch answers bookmarked by user
user.get('/:userId/bookmarks', async (request, response) => {

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

module.exports = user;
