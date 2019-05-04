//import the require dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var mongoose = require("./resources/mongoose");
var passport = require("passport");
var kafka = require("./kafka/client");
var session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);
var answer = require("./routes/answer");
var question = require("./routes/question");
var comment = require("./routes/comment");
var graphs = require('./routes/graphs');
var topics = require('./routes/topic')

// var bcrypt = require("bcrypt");
// const saltRounds = 10;
// var userModel = require("./model/UserSchema.js");
// var jwt = require("jsonwebtoken");
// const fetch = require("node-fetch");
// const redis = require("redis");
var { client } = require("./resources/redis");


//use cors to allow cross origin resource sharing
app.use(
	cors({
		origin: `${process.env.FRONT_END_URL}:${process.env.FRONT_END_PORT}`,
		credentials: true
	})
);
require("./config/passport");
app.use(bodyParser.json());
app.use(passport.initialize());
require("./config/passport")(passport);

require("dotenv").config();

//Allow Access Control
app.use(function(req, res, next) {
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
	uri: `${process.env.DB_HOST}`,
	collection: "q_sessions"
});

// create and connect redis client to local instance.

app.use(
	session({
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
	})
);

const userRoutes = require("./routes/userRoutes");
const fileUploadRoutes = require("./routes/fileUploadRoute");

app.use("/users", userRoutes);
app.use("/uploads", fileUploadRoutes);
app.use("/answer", answer);
app.use("/question", question);
app.use("/comment", comment);
app.use('/graphs',graphs);
app.use("/topics",topics);


//with redis 
app.post('/login', async function (req, res) {
	// let req = {
	// 	body: req.body
	//   }
	var body = ""; 
		client.get('loginQueryKeynew', async function (err, query_results) {
		if (query_results) {
			body = query_results;
			res.status(200).json(JSON.parse(body));
		}
		else {

	  let loginSuccess = 0;
	  try {
		let { email, password } = req.body;
		console.log(req.body);
		console.log("here");
		email = email.toLowerCase();
		let result = await userModel.findOne({ email });
		let data = null;
		if (!result) {
		  data = {
			loginSuccess: 0,
			message: "Email or Password Incorrect"
		  };
		} else {
		  const match = await bcrypt.compare(password, result.password);
		  if (match) {
			var user = {
			  email: result.email
			};
			var token = jwt.sign(user, "There is no substitute for hardwork", {
			  expiresIn: 10080 // in seconds
			});
			res.cookie(
					"cookie",
					JSON.stringify({
						id: result._id,
						email:result.email,
						role: result.role,
						token: 'JWT' + token
					}),
					{ maxAge: 900000000, httpOnly: false, path: "/" }
				);
				req.session.user = result.id;
			data = {
			  id: result._id,
			  role: result.role,
			  loginSuccess: 1,
			  message: "Login Successfull!",
			  token: 'JWT ' + token
			};
		  } else {
			data = {
			  loginSuccess: 0,
			  message: "Email or Password Incorrect"
			};
		  }
		}
		client.set('loginQueryKeynew', JSON.stringify(data));
		res.status(200).json(data);
	  } catch (error) {
		  console.log(error);
		res.status(400).json(error);
		// callback(error, null);
	  }
	}
})
});

//with redis on kafka-backend

// app.post("/login", function(req, res) {
// 	body = req.body;
// 	kafka.make_request("signin", body, function(err, results) {
// 		if (err) {
// 			console.log("Inside err");
// 			res.json({
// 				status: "error",
// 				message: "System Error, Try Again."
// 			});
// 			res.end();
// 		} else {
// 			console.log("Inside else");
// 			console.log(results);
// 			if (results.id) {
// 				res.cookie(
// 					"cookie",
// 					JSON.stringify({
// 						id: results.id,
// 						email:results.email,
// 						role: results.role,
// 						token: results.token
// 					}),
// 					{ maxAge: 900000000, httpOnly: false, path: "/" }
// 				);
// 				req.session.user = results.id;
// 			}
// 			res.status(200).json(results);
// 		}
// 	});
// });

app.post("/signup", function(req, res) {
	kafka.make_request("signup", req.body, function(err, results) {
		if (err) {
			console.log("Inside err");
			res.json({
				status: "error",
				msg: "System Error, Try Again."
			});
			res.end();
		} else {
			console.log("Inside else");
			res.status(200).json(results);
		}
	});
});

//start your server on port 3001
app.listen(process.env.BACK_END_PORT);
console.log(`Server Listening on port ${process.env.BACK_END_PORT}`);