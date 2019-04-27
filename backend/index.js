//import the require dependencies
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('./resources/mongoose');
var passport = require('passport');
var kafka = require('./kafka/client');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
var answer = require("./routes/answer");
var question = require("./routes/question");
var comment = require("./routes/comment");
var graphs = require('./routes/graphs')
//use cors to allow cross origin resource sharing
app.use(
	cors({
		origin: `${process.env.FRONT_END_URL}:${process.env.FRONT_END_PORT}`,
		credentials: true
	})
);
require('./config/passport');
app.use(bodyParser.json());
app.use(passport.initialize());
require("./config/passport")(passport);

require("dotenv").config();

//Allow Access Control
app.use(function (req, res, next) {
	res.setHeader(
		"Access-Control-Allow-Origin",
		`${process.env.FRONT_END_URL}:${process.env.FRONT_END_PORT}`
	);
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET,HEAD,OPTIONS,POST,PUT,DELETE"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, XMLHttpRequest"
	);
	res.setHeader("Cache-Control", "no-cache");
	next();
});

var sessionStore = new MongoDBStore({
	uri:
		"mongodb://root:root@cluster0-shard-00-00-ptqwg.mongodb.net:27017,cluster0-shard-00-01-ptqwg.mongodb.net:27017,cluster0-shard-00-02-ptqwg.mongodb.net:27017/quora?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",
	collection: "q_sessions"
});

app.use(session({
	secret: "Iamsupersecretsecret",
	resave: false,
	saveUninitialized: false,
	duration: 600000000000 * 60 * 1000,
	activeDuration: 6 * 60 * 60 * 1000,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 365,
		expires: 3600000 * 24 * 60
	},
	store: sessionStore
}));

app.use("/answer", answer);
app.use("/question", question);
app.use("/comment", comment);
app.use('/graphs',graphs);
//Route to get All Books when user visits the Home Page
/*app.get('/books', function(req,res){   
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    res.end(JSON.stringify(books));
    
});
*/

const userRoutes = require("./routes/userRoutes");
const fileUploadRoutes = require("./routes/fileUploadRoute");

app.use("/users", userRoutes);
app.use("/uploads", fileUploadRoutes);

//start your server on port 3001
app.listen(process.env.BACK_END_PORT);
console.log(`Server Listening on port ${process.env.BACK_END_PORT}`);