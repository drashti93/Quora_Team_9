const express = require("express");
const user = express.Router();
const mongoose = require("../resources/mongoose");

const UserSchema = require("../model/UserSchema");


// Edit Profile
user.put("/:userId/editProfile", (request,response) => {
	console.log(`\n\nInside Post /:userId/editProfile`);
	body = request.body;
	let { firstName, lastName, aboutMe, phoneNumber, gender, isFollowAllowed, topicsFollowed } = req.body;
	UserSchema.findOneAndUpdate(
		{ userId: request.params.userId },
		{
			$set: {
				firstName: firstName,
				lastName: lastName,
				// email: body.email,
				aboutMe: aboutMe,
				phoneNumber: phoneNumber,
				gender: gender,
				// credentials: , 
				// have to complete this
				isFollowAllowed: isFollowAllowed,
				topicsFollowed: topicsFollowed
			}
		},
		{ new: true },
		(error, questionDocument) => {
			if (err) {
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
					}:\n ${questionDocument}`
				);
				response.status(200).json(questionDocument);
			}
		}
	);
});

	
// Get Profile
user.get("/:userId", (request,response) => {
	console.log(`\n\nInside Get /:userId/getProfile`);
	UserSchema.findOne(
		{ userId: request.params.userId },
		(error, questionDocument) => {
			if (err) {
				console.log(
					`Error while getting user profile details ${
						request.params.userId
					}:\n ${error}`
				);
				// response.status(500).json({ error: err, message: "Attaching Files to Course Failed" });
				response
					.status(500)
					.json({
						error: error,
						message: `Error while getting user profile details ${
							request.params.userId
						}`
					});
			} else {
				console.log(
					`Successfully got User Profile details ${
						request.params.userId
					}:\n ${questionDocument}`
				);
				response.status(200).json(questionDocument);
			}
		}
	);
});


// Delete User account
user.delete("/:userId", async (request, response) => {
    try {
		// let { userId, answerId } = req.body;
		let userId = request.params.userId;
        let result = await UserSchema.updateOne({ userId: userId }, {
            $pull: {
                userId: userId
            }
        });
        response.status(200).json(result);
    } catch (error) {
        response.send(error);
    }
});

user.post("/:userId/follow/enable", function(request, response) {
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
				console.log(
					`Error while enabling follow for the user ${
						request.params.userId
					}:\n ${error}`
				);
				// response.status(500).json({ error: err, message: "Attaching Files to Course Failed" });
				response
					.status(500)
					.json({
						error: error,
						message: `Error while enabling follow for the user ${
							request.params.userId
						}`
					});
			} else {
				console.log(
					`Sucessfully enabled follow for the user ${
						request.params.userId
					}:\n ${questionDocument}`
				);
				response.status(200).json(questionDocument);
			}
		}
	);
});

user.post("/:userId/follow/disable", function(request, response) {
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
				console.log(
					`Error while disabling follow for the question ${
						request.params.questionId
					}:\n ${error}`
				);
				// response.status(500).json({ error: err, message: "Attaching Files to Course Failed" });
				response
					.status(500)
					.json({
						error: error,
						message: `Error while enabling follow for the question ${
							request.params.questionId
						}`
					});
			} else {
				console.log(
					`Sucessfully disabled follow for the question ${
						request.params.questionId
					}:\n ${questionDocument}`
				);
				response.status(200).json(questionDocument);
			}
		}
	);
});

module.exports = user;
