const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var TopicSchema = new Schema({
	name: {
		type: String
	},
	topicId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	questions: [
		{
			type: Schema.Types.ObjectId,
			ref: "questions"
		}
	]
});

const TopicModel = mongoose.model("topics", TopicSchema, "Topics");
module.exports = TopicModel;
