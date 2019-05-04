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

//GET QUESTIONS FOR A PARTICULAR TOPIC (FOR FEED)

topic.get("/:topicId/questions/following", (req, res) => {
    let { userId } = req.body;
    let  topicId  = req.params.topicId;

    UserModel.findOne({
        _id : userId
    }
    , (err, result) => {
        if (err) {
			console.log("Error in retrieving questions", err);
			res.writeHead(400, {
				"Content-type": "text/plain"
			});
			res.end("User not following particular topic!");
		} else {

            TopicModel.findOne({'_id' : topicId}, (err, result) => {
                if (err) {
                    console.log("error!", err); 
                    res.writeHead(400, {
                        "Content-type": "text/plain"
                    });
                    res.end("Error inside topic!");
		} else {

            console.log("questions: ", result.questions);
			res.end(JSON.stringify(result.questions));

            }
        });
        }
    });
});



module.exports = topic;
