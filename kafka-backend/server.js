var connection = new require("./kafka/Connection");
//topics files
//var signin = require('./services/signin.js');
var Books = require("./services/books.js");

function handleTopicRequest(topic_name, fname) {
	//var topic_name = 'root_topic';
	var consumer = connection.getConsumer(topic_name);
	var producer = connection.getProducer();
	console.log("server is running ");
	consumer.on("message", function(message) {
		console.log("message received for " + topic_name + " ", fname);
		console.log(JSON.stringify(message.value));
		var data = JSON.parse(message.value);

		fname.handle_request(data.data, function(err, res) {
			console.log("after handle" + res);
			var payloads = [
				{
					topic: data.replyTo,
					messages: JSON.stringify({
						correlationId: data.correlationId,
						data: res
					}),
					partition: 0
				}
			];
			producer.send(payloads, function(err, data) {
				console.log(data);
			});
			return;
		});
	});
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("signin", signinRequests.signin);
handleTopicRequest("signup", signinRequests.signup);
handleTopicRequest(
	"get_topic_questions",
	topicquestionsRequests.gettopicquestions
);
handleTopicRequest(
	"get_following_questions",
	followingquestionsRequests.getfollowingquestions
);
handleTopicRequest("follow_question", followquestionRequests.followquestion);
handleTopicRequest("follow_topic", followtopicRequests.followtopic);
handleTopicRequest("post_message", postmessageRequests.postmessage);
handleTopicRequest("get_message", getmessageRequests.getmessage);
handleTopicRequest("delete_message", deletemessageRequests.deletemessage);
