var connection = new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');

var Answers = require('./services/answer.js');
var top10Answers = require('./services/graphs/top10Answers')
var top10AnswersUpvotes = require('./services/graphs/top10Answers_upvote')
var top5AnswersDownvotes = require('./services/graphs/top5Answers_downvotes')
var bookmarkedAnswers = require('./services/graphs/Bookmarked')
var profileViews = require('./services/graphs/profileViews')
var userActivity = require('./services/graphs/userActivity')
var mongoose = require('./resources/mongoose');
var answerRequests = require('./services/answer.js');
var questionRequests = require('./services/question');
var signinRequests = require('./services/signin');

function handleTopicRequest(topic_name, fname) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name + " ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        fname.handle_request(data.data, function (err, res) {
            console.log('after handle' + res);
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
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });

    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request

// handleTopicRequest("get_answers",Answers)
handleTopicRequest("top_10_answers",top10Answers)
handleTopicRequest("top_10_answers_upvote",top10AnswersUpvotes)
handleTopicRequest("top_5_answers_downvotes",top5AnswersDownvotes)
// handleTopicRequest("bookmarked_answers",bookmarkedAnswers)
handleTopicRequest("profile_views",profileViews)
// handleTopicRequest("user_activity",userActivity)
//handleTopicRequest("signin", signinRequests.signin);
handleTopicRequest("signup", signinRequests.signup);
// handleTopicRequest("get_answers", answerRequests.getanswers);

handleTopicRequest("post_answer", answerRequests.postanswers);

handleTopicRequest("post_question", questionRequests.postquestion);
// handleTopicRequest("edit_question", questionRequests.editquestion);
// handleTopicRequest("delete_question", questionRequests.deletequestion);
// handleTopicRequest("follow_question", followquestionRequests.followquestion);
// handleTopicRequest("follow_topic", followtopicRequests.followtopic);
// handleTopicRequest("post_message", postmessageRequests.postmessage);
// handleTopicRequest("get_message", getmessageRequests.getmessage);
// handleTopicRequest("delete_message", deletemessageRequests.deletemessage);
// handleTopicRequest(
// 	"get_topic_questions",
// 	topicquestionsRequests.gettopicquestions
// );
// handleTopicRequest(
// 	"get_following_questions",
// 	followingquestionsRequests.getfollowingquestions
// );

