//import the require dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var kafka = require("./kafka/client");
//use cors to allow cross origin resource sharing
app.use(
	cors({
		origin: `${process.env.FRONT_END_URL}:${process.env.FRONT_END_PORT}`,
		credentials: true
	})
);
app.use(bodyParser.json());

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

//Route to get All Books when user visits the Home Page
/*app.get('/books', function(req,res){   
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    res.end(JSON.stringify(books));
    
});
*/
app.post("/book", function(req, res) {

    // console.log(`In side POST /book`);
    // console.log(`${req.body.bookid}`);
    // res.status(200).json(req.body.bookid);

	kafka.make_request("post_book", req.body, function(err, results) {
		console.log("in result");
		console.log(results);
		if (err) {
			console.log("Inside err");
			res.json({
				status: "error",
				msg: "System Error, Try Again."
			});
		} else {
			console.log("Inside else");
			res.json({
				updatedList: results
			});
			res.end();
		}
	});
});
//start your server on port 3001
app.listen(process.env.BACK_END_PORT);
console.log(`Server Listening on port ${process.env.BACK_END_PORT}`);