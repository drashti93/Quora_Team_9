const express = require('express');
const router = express.Router();
const mongoose = require('../resources/mongoose');

const UserSchema = require('../model/UserSchema')


router.get("/getallusers",(req,res)=>{
  
    (async()=>{
        try {
       let result=await UserSchema.find();
        res.status=200;
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(result));
        } catch (error) {
            console.log(error);
        }
    })();
});
//Get user by id
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

//Enable user follow
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

//Disable user follow
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

//Fetch user followers
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

//Fetch users following user
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

//Fetch answers bookmarked by user
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

router.post("/getchats",(req,res)=>{
  
    (async()=>{
        try {
            let {uid}=req.body;
            console.log("For chats");
            console.log(uid);
       let result=await UserSchema.findOne({_id:uid}).populate({path:'chats.uid',select:["firstName","lastName","profileImage"]}).exec();
       console.log(result);
       let chatArray=[]
       if(result.chats){
        chatArray=result.chats;
       }
        res.status=200;
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(chatArray));
        } catch (error) {
            console.log(error);
        }
    })();
});
router.post("/message",(req,res)=>{
  
    (async()=>{
        try {
            let {receiverid,uid,messagetext}=req.body;
            console.log(receiverid);
            console.log(uid);
            console.log(messagetext);

            let receiverObj={
                action:"received",
                messagetext
            }
            let senderObj={
                action:"sent",
                messagetext
            }
            let chatchecksender=await UserSchema.findOne({_id:uid,"chats.uid":receiverid});
            if(chatchecksender){
                console.log("inside existing chats");
                let senderResult=await UserSchema.updateOne({
                    _id:uid,
                    chats:{ 
                        $elemMatch: {
                        uid: receiverid
                            }
                        }
                }, {
                    $push: {
                        'chats.$.messages': senderObj                     
                    }
                });
            }else{
                let senderUpperObj={
                    uid:receiverid,
                    messages:[{
                        action:"sent",
                        messagetext
                    }]
                }
                let ress=await UserSchema.findOneAndUpdate({_id:uid},{
                    $push:{
                        chats:senderUpperObj
                    }
                })
            }

            let chatcheckreceiver=await UserSchema.findOne({_id:receiverid,"chats.uid":uid});
            if(chatcheckreceiver){

                
                let receiverResult=await UserSchema.updateOne({
                    _id:receiverid,
                    chats:{ 
                          $elemMatch: {
                           uid: uid
                             }
                        }
                   }, {
                       $push: {
                           'chats.$.messages': receiverObj                     
                       }
                   });
        
            }else{
                let recUpperObj={
                    uid:uid,
                    messages:[{
                        action:"received",
                        messagetext
                    }]
                }
                let ress=await UserSchema.findOneAndUpdate({_id:receiverid},{
                    $push:{
                        chats:recUpperObj 
                    }
                })
                
            }
        res.status=200;
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({message:"Message posted"}));
        } catch (error) {
            console.log(error);
        }
    })();
});



router.get('/:userId/topics', async (request, response) => {

	console.log(`\n\nInside GET /users/:userId/topics`);

	try {
		var result = await UserSchema
		.find({ '_id': request.params.userId })
		.populate(
			{path:'topicsFollowed'}
		)
		.exec(); 
		//console.log(typeof result[0].credentials)
		var topics = result[0]['topicsFollowed']
		console.log(JSON.stringify(topics))     
		 

		response.status(200).json(topics); 
 
		// //If user present
		// if(userDocument) {
		// 	console.log(`Sucessfully enabled follow for the user ${request.params.userId}:\n ${userDocument}`);
		// 	response.status(200).json(userDocument);
		// } else {
		// 	console.log(`User ${request.params.userId} not found`);
		// 	response.status(404).json({messgage: `User ${request.params.userId} not found`});
		// }
	} catch (error) {
		console.log(`Error while fetching topics for the user ${request.params.userId}:\n ${error}`);
		response.status(500).json({ error: error, message: `Error while fetching topics for the user ${request.params.userId}`});
	}
});





module.exports = router;