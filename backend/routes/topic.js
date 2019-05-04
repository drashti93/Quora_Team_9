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
// Search topic
topic.get("/:topicId", (request, response) => {
    console.log(`\n\nInside Get /topics/:topicId`);
    TopicModel.find(
        {},
        (error,topicDocument) => {
            if(error) {
                console.log(
					`Error while getting topics ${
						request.params.userId
					}:\n ${error}`
                );
                response
                .status(500)
                .json({
                    error: error,
                    message: `Error while getting topics ${
                        request.params.userId
                    }`
                });
            } else if(topicDocument){
                console.log(
					`Error while getting topics ${
						request.params.userId
					}:\n ${topicDocument}`
                );
                let result = topicDocument;
                response.status(200).json(result);                
            } else {
				response.status(404).json({message: `Topic not found`});
			}             
        }
    )
});

module.exports = topic;
