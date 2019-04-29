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


module.exports = TopicModel;

