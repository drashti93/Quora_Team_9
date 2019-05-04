const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
	questionId: {
		type: mongoose.Schema.Types.ObjectId
	},
	questionText: String,
	userId: {
		type: Schema.Types.ObjectId,
		ref: "users",
		required: true
	},
	followers: [
		{
			type: Schema.Types.ObjectId,
			ref: "users"
		}
	],
	topicsArray:[
		{
			type: Schema.Types.ObjectId,
			ref: "topics"
		}
	],
	answers: [
		{
			type: Schema.Types.ObjectId,
			ref: "answers"
		}
	]
});


QuestionSchema.set('timestamps', true);

const QuestionModel = mongoose.model("questions", QuestionSchema, "Questions");
module.exports = QuestionModel;
