const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var TopicSchema = new Schema({
	name: {
		type: String
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
