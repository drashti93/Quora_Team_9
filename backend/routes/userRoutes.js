const express = require("express");
const router = express.Router();
var UserModel = require("../model/UserSchema");
var QuestionModel = require("../model/QuestionSchema");
const mongoose = require("../resources/mongoose");
const UserSchema = require("../model/UserSchema");
const AnswerSchema = require("../model/AnswerSchema");

// Edit Profile
router.post("/:userId/edit", (request, response) => {
	console.log(`\n\nInside Post /:userId/edit`);
	// body = request.body;
	let { firstName, lastName, aboutMe, phoneNumber, street, city, state, zipcode, startDate, endDate, school, concentration, secConcentration, degree, gradYear, position, company, careerStartDate, careerEndDate, gender, isFollowAllowed, topicsFollowed } = request.body;
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
					address: {
						street: street,
						city: city,
						state: state,
						zipcode: zipcode,
						startDate: startDate,
						endDate: endDate
					},
					education: {
						school: school,
						concentration: concentration,
						secConcentration: secConcentration,
						degree: degree,
						gradYear: gradYear
					},
					career: {
						position: position,
						company: company,
						careerStartDate: careerStartDate,
						careerEndDate: careerEndDate,
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
				response.status(500).json({
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
router.delete("/:userId", async (request, response) => {
    try {
		let userDocument = await UserSchema.findOneAndDelete({_id: request.params.userId});
		if(userDocument){
			console.log(`Sucessfully deleted user ${request.params.userId}:\n ${userDocument}`);
			response.status(200).json(userDocument);
		} else{
			console.log(`User ${request.params.userId} not found`);
			response.status(404).json({message: `User ${request.params.userId} not found`});
		}
    } catch (error) {
		// response.send(error);
		console.log(`Error fetching user ${request.params.userId}:\n ${error}`);
		response.status(500).json({ error: error, message: `Error fetching user ${request.params.userId}`});
    }
});

// Deactivate User Account
router.put("/:userId/profileState", async (request, response) => {
	console.log(`\n\n Inside Post users/:userId/deactivateProfile`);
	try{
		let userDoc = await UserSchema.find({ _id: request.params.userId });
		// console.log(userDoc);
		if(userDoc){
			let flag = userDoc[0].isDeactivated;
			if(flag){
				await UserSchema.findOneAndUpdate(
					{ _id: request.params.userId },
					{ 
						$set: { 
							isDeactivated: false
						}
					},
				);
			} else{
				await UserSchema.findOneAndUpdate(
					{ _id: request.params.userId },
					{
						$set: {
							isDeactivated: true
						}
					},
				);
			}
			console.log(`Sucessfully Toggled user account ${request.params.userId}:\n ${userDoc}`);
			response.status(200).json(userDoc);
		} else {
			console.log(`User ${request.params.userId} not found`);
			response.status(404).json({message: `User ${request.params.userId} not found`});
		}
	} catch (error) {
		console.log(`Error fetching user ${request.params.userId}:\n ${error}`);
		response.status(500).json({ error: error, message: `Error fetching user ${request.params.userId}`});
    }
	

	// UserSchema.findOneAndUpdate(
	// 	{ _id: request.params.userId },
	// 	{
	// 		$set: {
	// 			isDeactivated: !isDeactivated,
	// 		}
	// 	},
	// 	{ new: true },
	// 	(error, questionDocument) => {
	// 		if(error){
	// 			console.log(
	// 				`Error while deactivating user account ${
	// 					request.params.userId
	// 				}:\n ${error}`
	// 			);
	// 			response.status(500).json({
	// 				error: error,
	// 				message: `Error while deactivating user account ${
	// 					request.params.userId
	// 				}`
	// 			});
	// 		} else if(questionDocument) { 
	// 			console.log(`Account Deactivated succssfully ${request.params.userId}:\n ${questionDocument}`);
	// 			// console.log("questionDocument.isDeactivated: ",questionDocument.isDeactivated);
	// 			// questionDocument.isDeactivated ?  :
	// 			response.status(200).json(questionDocument);
	// 		} else {
	// 			response.status(404).json({message: `User not found`});
	// 		}
	// 	} 
	// )
});

// Get Profile
router.get("/getallusers", (req, res) => {
	(async () => {
		try {
			let result = await UserSchema.find();
			res.status = 200;
			res.setHeader("Content-Type", "application/json");
			res.send(JSON.stringify(result));
		} catch (error) {
			console.log(error);
		}
	})();
});

//Get user by id
router.get("/:userId", async (request, response) => {
	console.log(`\n\nInside GET /users/:userId`);

	try {
		let userDocument = await UserSchema.findOne({
			_id: request.params.userId
		});

		//If user present
		if (userDocument) {
			console.log(
				`Sucessfully fetched user ${
					request.params.userId
				}:\n ${userDocument}`
			);
			response.status(200).json(userDocument);
		} else {
			console.log(`User ${request.params.userId} not found`);
			response
				.status(404)
				.json({ messgage: `User ${request.params.userId} not found` });
		}
	} catch (error) {
		console.log(`Error fetching user ${request.params.userId}:\n ${error}`);
		response.status(500).json({
			error: error,
			message: `Error fetching user ${request.params.userId}`
		});
	}
});

//Enable user follow
router.put('/:userId/follow/enable', async (request, response) => {

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
		if (userDocument) {
			console.log(
				`Sucessfully enabled follow for the user ${
					request.params.userId
				}:\n ${userDocument}`
			);
			response.status(200).json(userDocument);
		} else {
			console.log(`User ${request.params.userId} not found`);
			response
				.status(404)
				.json({ messgage: `User ${request.params.userId} not found` });
		}
	} catch (error) {
		console.log(
			`Error while enabling follow for the user ${
				request.params.userId
			}:\n ${error}`
		);
		response.status(500).json({
			error: error,
			message: `Error while enabling follow for the user ${
				request.params.userId
			}`
		});
	}
});

//Disable user follow
router.put('/:userId/follow/disable', async (request, response) => {

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
		if (userDocument) {
			console.log(
				`Sucessfully disabled follow for the question ${
					request.params.userId
				}:\n ${userDocument}`
			);
			response.status(200).json(userDocument);
		} else {
			console.log(`User ${request.params.userId} not found`);
			response
				.status(404)
				.json({ messgage: `User ${request.params.userId} not found` });
		}
	} catch (error) {
		console.log(
			`Error while disabling follow for the question ${
				request.params.userId
			}:\n ${error}`
		);
		response.status(500).json({
			error: error,
			message: `Error while enabling follow for the user ${
				request.params.userId
			}`
		});
	}
});

//Fetch user followers
router.get("/:userId/followers", async (request, response) => {
	console.log(`\n\nInside GET /users/:userId/followers`);

	try {
		let userDocument = await UserSchema.findOne({
			_id: request.params.userId
		});

		//If user present
		if (userDocument) {
			console.log(
				`Sucessfully fetched followers for the user ${
					request.params.userId
				}:\n ${userDocument}`
			);
			response.status(200).json(userDocument.followers);
		} else {
			console.log(`User ${request.params.userId} not found`);
			response
				.status(404)
				.json({ messgage: `User ${request.params.userId} not found` });
		}
	} catch (error) {
		console.log(
			`Error fetching followers for the user ${
				request.params.userId
			}:\n ${error}`
		);
		response.status(500).json({
			error: error,
			message: `Error fetching followers for the user ${
				request.params.userId
			}`
		});
	}
});

//Fetch users following user
router.get("/:userId/following", async (request, response) => {
	console.log(`\n\nInside GET /users/:userId/following`);

	try {
		let userDocument = await UserSchema.findOne({
			_id: request.params.userId
		});

		//If user present
		if (userDocument) {
			console.log(
				`Sucessfully fetched users following ${
					request.params.userId
				}:\n ${userDocument}`
			);
			response.status(200).json(userDocument.following);
		} else {
			console.log(`User ${request.params.userId} not found`);
			response
				.status(404)
				.json({ messgage: `User ${request.params.userId} not found` });
		}
	} catch (error) {
		console.log(
			`Error fetching users following ${
				request.params.userId
			}:\n ${error}`
		);
		response.status(500).json({
			error: error,
			message: `Error fetching users following ${request.params.userId}`
		});
	}
});

//Fetch bookmarked answers by user and its correspondin question
router.get("/:userId/bookmarks", async (request, response) => {

	console.log(`\n\nInside GET /users/:userId/bookmarks`);

	try {
		const bookmarkedAnswerWithQuestion = []
		let answerDocument = await AnswerSchema
			.find({
				bookmarks: request.params.userId
			})
			.populate({
				path: "upvotes downvotes bookmarks comments images"
			})
			.exec();

		//If bookmarked answer present
		if (answerDocument) {

			console.log(
				`Sucessfully fetched bookmarked answers for user ${
					request.params.userId
				}:\n ${answerDocument}`
			);

			for (const answer of answerDocument) {

				let question = await QuestionModel
					.findOne({ answers: answer._id })
					.exec();

				question.answers = [];
				question.answers.push(answer);

				// console.log(`\n\n\n\n\n\nQuestion found for bookmarked answer with id - ${answer._id}`);
				// console.log(`\n\n\n\n\n\nQuestion found for bookmarked answer with id - \n${question}`);

				bookmarkedAnswerWithQuestion.push(question);

			}
			response.status(200).json(bookmarkedAnswerWithQuestion);

		} else {
			console.log(`User ${request.params.userId} not found`);
			response
				.status(404)
				.json({ messgage: `User ${request.params.userId} not found` });
		}
	} catch (error) {
		console.log(
			`Error fetching bookmarked answers for user ${
				request.params.userId
			}:\n ${error}`
		);
		response.status(500).json({
			error: error,
			message: `Error fetching bookmarked answers for user ${
				request.params.userId
			}`
		});
	}
});

router.post("/getchats", (req, res) => {
	(async () => {
		try {
			let { uid } = req.body;
			console.log("For chats");
			console.log(uid);
			let result = await UserSchema.findOne({ _id: uid })
				.populate({
					path: "chats.uid",
					select: ["firstName", "lastName", "profileImage"]
				})
				.exec();
			console.log(result);
			let chatArray = [];
			if (result.chats) {
				chatArray = result.chats;
			}
			res.status = 200;
			res.setHeader("Content-Type", "application/json");
			res.send(JSON.stringify(chatArray));
		} catch (error) {
			console.log(error);
		}
	})();
});

router.post("/message", (req, res) => {
	(async () => {
		try {
			let { receiverid, uid, messagetext } = req.body;
			console.log(receiverid);
			console.log(uid);
			console.log(messagetext);

			let receiverObj = {
				action: "received",
				messagetext
			};
			let senderObj = {
				action: "sent",
				messagetext
			};
			let chatchecksender = await UserSchema.findOne({
				_id: uid,
				"chats.uid": receiverid
			});
			if (chatchecksender) {
				console.log("inside existing chats");
				let senderResult = await UserSchema.updateOne(
					{
						_id: uid,
						chats: {
							$elemMatch: {
								uid: receiverid
							}
						}
					},
					{
						$push: {
							"chats.$.messages": senderObj
						}
					}
				);
			} else {
				let senderUpperObj = {
					uid: receiverid,
					messages: [
						{
							action: "sent",
							messagetext
						}
					]
				};
				let ress = await UserSchema.findOneAndUpdate(
					{ _id: uid },
					{
						$push: {
							chats: senderUpperObj
						}
					}
				);
			}

			let chatcheckreceiver = await UserSchema.findOne({
				_id: receiverid,
				"chats.uid": uid
			});
			if (chatcheckreceiver) {
				let receiverResult = await UserSchema.updateOne(
					{
						_id: receiverid,
						chats: {
							$elemMatch: {
								uid: uid
							}
						}
					},
					{
						$push: {
							"chats.$.messages": receiverObj
						}
					}
				);
			} else {
				let recUpperObj = {
					uid: uid,
					messages: [
						{
							action: "received",
							messagetext
						}
					]
				};
				let ress = await UserSchema.findOneAndUpdate(
					{ _id: receiverid },
					{
						$push: {
							chats: recUpperObj
						}
					}
				);
			}
			res.status = 200;
			res.setHeader("Content-Type", "application/json");
			res.send(JSON.stringify({ message: "Message posted" }));
		} catch (error) {
			console.log(error);
		}
	})();
});

router.post('/credentials', function(req, res){
	console.log("Adding credentials");
	var type = req.body.type;
	var user_id = req.body.user_id;
	var credId = req.body.credId;
	var kind = req.body.kind;
	if(kind === "update"){
		if (type == "employment") {
			var position = req.body.position;
			var company = req.body.company;
			var startYear = parseInt(req.body.cstartYear, 10);
			var endYear = parseInt(req.body.cendYear, 10);
			var isCurrentString = req.body.cisCurrentString;
			console.log(user_id, type, position, company, startYear, endYear, isCurrentString);
			if(isCurrentString == "on"){
				var isCurrent = true;
			} else {
				var isCurrent = false;
			}
			console.log(position, company, startYear, endYear, isCurrent);
			UserSchema.updateOne({_id: user_id}, {$pull: {"credentials.career": {_id: credId}}}, function(err, results){
				if(err){
					res.status(400);
				} else {
					
				
			UserSchema.updateOne({_id: user_id}, {$push: {"credentials.career": {"position": position, "company": company, "startDate": startYear, "endDate": endYear, "isCurrent": isCurrent}}}, function(err, results){
				if(err){
					res.status(400);
				} else {
					res.status(200).json({});
				}
			});
		}
	});
		} else if (type == "education") {
			var school = req.body.school;
			var concentration = req.body.concentration;
			var secConcentration = req.body.secConcentration;
			var degree = req.body.degree;
			var graduationYear = parseInt(req.body.graduationYear,10);
			UserSchema.updateOne({_id: user_id}, {$pull: {"credentials.education": {_id: credId}}}, function(err, results){
				if(err){
					res.status(400);
				} else {
			UserSchema.updateOne({_id: user_id}, {$push: {"credentials.education": {school: school, concentration: concentration, secConcentration: secConcentration, degree: degree, gradYear: graduationYear}}}, function(err, results){
				if(err){
					res.status(400);
				} else {
					res.status(200).json({});
				}
			});
		}
	});
		} else if (type == "location") {
			var street = req.body.street;
			var city = req.body.city;
			var state = req.body.state;
			var zipcode = req.body.zipcode
			var startYear = parseInt(req.body.lstartYear,10);
			var endYear = parseInt(req.body.lendYear,10);
			var isCurrentString = req.body.lisCurrentString;
			if (isCurrentString == "on") {
				var isCurrent = true;
			} else {
				var isCurrent = false;
			}
			UserSchema.updateOne({_id: user_id}, {$pull: {"credentials.address": {_id: credId}}}, function(err, results){
				if(err){
					res.status(400);
				} else {
			UserSchema.updateOne({_id: user_id}, {$push: {"credentials.address": {street: street, city: city, state: state, zipcode: zipcode, startDate: startYear, endDate: endYear, isCurrent: isCurrent}}}, function(err, results){
				if(err){
					res.status(400);
				} else {
					res.status(200).json({});
				}
			});
		}
	});
		}
	}
	else if(kind === "save"){
	if (type == "employment") {
		var position = req.body.position;
		var company = req.body.company;
		var startYear = parseInt(req.body.cstartYear, 10);
		var endYear = parseInt(req.body.cendYear, 10);
		var isCurrentString = req.body.cisCurrentString;
		console.log(user_id, type, position, company, startYear, endYear, isCurrentString);
		if(isCurrentString == "on"){
			var isCurrent = true;
		} else {
			var isCurrent = false;
		}
		console.log(position, company, startYear, endYear, isCurrent);
		UserSchema.updateOne({_id: user_id}, {$push: {"credentials.career": {"position": position, "company": company, "startDate": startYear, "endDate": endYear, "isCurrent": isCurrent}}}, function(err, results){
			if(err){
				res.status(400);
			} else {
				res.status(200).json({});
			}
		});
	} else if (type == "education") {
		var school = req.body.school;
		var concentration = req.body.concentration;
		var secConcentration = req.body.secConcentration;
		var degree = req.body.degree;
		var graduationYear = parseInt(req.body.graduationYear,10);
		UserSchema.updateOne({_id: user_id}, {$push: {"credentials.education": {school: school, concentration: concentration, secConcentration: secConcentration, degree: degree, gradYear: graduationYear}}}, function(err, results){
			if(err){
				res.status(400);
			} else {
				res.status(200).json({});
			}
		});
	} else if (type == "location") {
		var street = req.body.street;
		var city = req.body.city;
		var state = req.body.state;
		var zipcode = req.body.zipcode
		var startYear = parseInt(req.body.lstartYear,10);
		var endYear = parseInt(req.body.lendYear,10);
		var isCurrentString = req.body.lisCurrentString;
		if (isCurrentString == "on") {
			var isCurrent = true;
		} else {
			var isCurrent = false;
		}
		UserSchema.updateOne({_id: user_id}, {$push: {"credentials.address": {street: street, city: city, state: state, zipcode: zipcode, startDate: startYear, endDate: endYear, isCurrent: isCurrent}}}, function(err, results){
			if(err){
				res.status(400);
			} else {
				res.status(200).json({});
			}
		});
	}
}
});

//GET ALL QUESTIONS THAT USER IS FOLLOWING (FOR FEED)

router.get("/:userId/questions", async (req, res) => {
	try {
		let userId = req.params.userId;

		let questions = await QuestionModel.find({ followers: userId })
			.populate({
				path: "answers",
				populate: {
					path: "upvotes downvotes bookmarks"
				}
			})
			.exec();
		if (questions) {
			console.log("questions:", questions);
			res.status(200).json(questions);
		} else {
			console.log(`User ${req.params.userId} not found`);
			response
				.status(404)
				.json({ messgage: `User ${req.params.userId} not found` });
		}
	} catch (error) {
		console.log(
			`Error fetching questions for user${req.params.userId}:\n ${error}`
		);
		response.status(500).json({
			error: error,
			message: `Error fetching questions for user  ${req.params.userId}`
		});
	}
});

// GET ALL QUESTIONS FOR ALL TOPICS FOLLOWED BY A USER (FOR FEED)
router.get("/:userId/feed", async (request, response) => {

	const questionResult = []

	try {

		let user = await UserModel.findOne({'_id': request.params.userId});

		// console.log("User: ", user);
		// console.log("Topics followed by the user: ", user.topicsFollowed);

		if(user) {
			for (const topic of user.topicsFollowed) {
				let questions = await QuestionModel.find({ topicsArray: topic })
				.populate({
					path: "answers",
					populate: {
						path: "upvotes downvotes bookmarks comments"
					}
				})
				.exec();
				// console.log("questions: ", questions);
				for(const qstn of questions) {
					questionResult.push(qstn)
				}
				// console.log("questionResult: ", questionResult);
			}

			//Remove duplicates from the questions array
			var uniq = {}
			const uniqueQuestions = questionResult.filter(obj => !uniq[obj._id] && (uniq[obj._id] = true));

			response.status(200).json(uniqueQuestions);

		} else {
			console.log(`User ${request.params.userId} not found`);
			response.status(404).json({messgage: `User ${request.params.userId} not found`});
		}
	} catch (error) {
		console.log(`Error while fetching questions-answers for feed for user ${request.params.userId}:\n ${error}`);
		response.status(500).json({ error: error, message: `Error while fetching questions-answers for feed for user ${request.params.userId}` });
	}
});


router.post("/aboutMe", function(req, res){
	
	var user_id = req.body.user_id;
	var aboutMe = req.body.text;
	console.log(user_id, aboutMe);
	UserSchema.updateOne({_id: user_id}, {$set: {aboutMe: aboutMe}}, function(err, results){
		if(err){
			res.status(400);
		} else {
			res.status(200).json({});
		}
	})
});

router.post("/name", function(req, res){
	
	var user_id = req.body.user_id;
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	console.log(user_id, firstName, lastName);
	UserSchema.updateOne({_id: user_id}, {$set: {firstName: firstName, lastName: lastName}}, function(err, results){
		if(err){
			res.status(400);
		} else {
			res.status(200).json({});
		}
	})
})
module.exports = router;
