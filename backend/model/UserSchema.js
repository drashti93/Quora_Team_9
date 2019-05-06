const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	// email: {
	// 	type: String,
	// 	required: true,
	// 	unique: true
	// },
	// password: {
	// 	type: String,
	// 	required: true
	// },
	aboutMe: {
		type: String
	},
	phoneNumber: {
		type: Number
	},
	profileImage: {
		uid: {
			type: String
		},
		name: {
			type: String
		},
		url: {
			type: String
		}
	},
	gender: {
		type: String
	},
	credentials: {
		address: [{
			street: {
				type: String
			},
			city: {
				type: String
			},
			state: {
				type: String
			},
			zipcode: {
				type: Number
			},
			startDate: {
				type: Number
			},
			endDate: {
				type: Number
			},
			isCurrent: {
				type: Boolean,
				default: false
			}
		}],
		education: [{
			school: {
				type: String
			},
			concentration: {
				type: String
			},
			secConcentration: {
				type: String
			},
			degree: {
				type: String
			},
			gradYear: {
				type: Number
			}
		}],
		career: [{
			position: {
				type: String
			},
			company: {
				type: String
			},
			startDate: {
				type: Number
			},
			endDate: {
				type: Number
			},
			isCurrent: {
				type: Boolean,
				default: false
			}
		}]
	},
	isFollowAllowed: {
		type: Boolean,
		default: true
	},
	isDeactivated: {
		type: Boolean,
		default: false
	},
	topicsFollowed: [
		{
			type: Schema.Types.ObjectId,
			ref: "topics"
		}
	],
	Profile_views:[{type:Number}],
	messagesSent: [
		{
			text: String,
			senderId: [
				{
					type: Schema.Types.ObjectId,
					ref: "users"
				}
			]
		}
	],
	messagesReceived: [
		{
			text: String,
			receiverId: [
				{
					type: Schema.Types.ObjectId,
					ref: "topics"
				}
			]
		}
	],
	chats: [
		{
			uid: { type: Schema.Types.ObjectId, ref: "users" },
			messages: [
				{
					action: String,
					messagetext: String
				}
			]
		}
	],
	followers: [
		{
			type: Schema.Types.ObjectId,
			ref: "users"
		}
	],
	following: [
		{
			type: Schema.Types.ObjectId,
			ref: "users"
		}
	]
});

UserSchema.set("timestamps", true);

const UserModel = mongoose.model("users", UserSchema, "Users");
module.exports = UserModel;
