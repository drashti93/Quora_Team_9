var mongoose = require("mongoose");
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose
	.connect(
		`${process.env.DB_HOST}`,
		{
			useCreateIndex: true,
			useNewUrlParser: true,
			poolSize: 10
		}
	)
	.then(
		() => {
			console.log(`Sucessfully Connected to MogoDB`);
		},
		err => {
			console.log(`Error Connecting to MogoDB: ${err}`);
		}
	);


module.exports = { mongoose };