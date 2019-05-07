const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
	answerText: {
		type: String
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: "users"
	},
	images: [
		{
			uid: {
				type: String
			},
			name: {
				type: String
			},
			url: {
				type: String
			}
		}
	],
	isAnonyomous: {
		type: Boolean
	},
	upvotes: [
		{
			type: Schema.Types.ObjectId,
			ref: "users"
		}
	],
	downvotes: [
		{
			type: Schema.Types.ObjectId,
			ref: "users"
		}
	],
	bookmarks: [
		{
			type: Schema.Types.ObjectId,
			ref: "users"
		}
	],
	comments: [
		{
			userId: {
				type: Schema.Types.ObjectId,
				ref: "users"
			},
			comment: String,
			replies: [
				{
					userId: Schema.Types.ObjectId,
					comment: String
				}
			]
		}
	],
	views:Number,
	credentials: {
		topic: {
			topicId: Schema.Types.ObjectId,
			description: String
		},
		credentialType: String,
		credentialIndex: Number
	}
});

AnswerSchema.set("timestamps", true);
const AnswerModel = mongoose.model("answers", AnswerSchema, "Answers");
module.exports = AnswerModel;
