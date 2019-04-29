var mongoose = require("mongoose");
// require('dotenv').config();
DB_HOST="mongodb://root:root@cluster0-shard-00-00-ptqwg.mongodb.net:27017,cluster0-shard-00-01-ptqwg.mongodb.net:27017,cluster0-shard-00-02-ptqwg.mongodb.net:27017/quora?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"

// DB_USER=root
// DB_PASS=root
mongoose.Promise = global.Promise;
mongoose
	.connect(
		`${DB_HOST}`,
		{
			useCreateIndex: true,
			useNewUrlParser: true,
			poolSize: 500
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
