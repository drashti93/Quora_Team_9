var assert = require("chai").assert;
var app = require("../index");

var chai = require("chai");
chai.use(require("chai-http"));
var expect = require("chai").expect;

var agent = require("chai").request.agent(app);

describe("Canvas Test Cases", function() {
	it("POST /login", function() {
		agent
		.post("/login")
		.send({ "email": "sanjaynagbr@gmail.com", "password" : "sanjay"})
		.then(function(res) {
			expect(res.status).to.equal(200);
		});
	});

	it("POST /users/unfollow", function() {
		agent
		.post("/users/unfollow")
		.send({ "user_id": "5cd2089218d8881ba280350e", "following" : "5cca513b61aabb7bb978ca38"})
		.then(function(res) {
			expect(res.status).to.equal(200);
		});
	});

	it("POST /users/follow", function() {
		agent
		.post("/users/follow")
		.send({ "user_id": "5cd2089218d8881ba280350e", "following" : "5cca513b61aabb7bb978ca38"})
		.then(function(res) {
			expect(res.status).to.equal(200);
		});
	});

	it("GET /users/followers/userId", function() {
		agent
		.post("/users/followers/5cd2089218d8881ba280350e")
		.then(function(res) {
			expect(res.status).to.equal(200);
		});
	});

	it("GET /users/following/userId", function() {
		agent
		.get("/users/following/5cd2089218d8881ba280350e")
		.then(function(res) {
			expect(res.status).to.equal(200);
		});
	});

	it("PUT /users/:userId/profileState", function() {
		agent
		.put("/users/5cca513b61aabb7bb978ca38/profileState")
		.then(function(res) {
			expect(res.status).to.equal(200);
		});
	});

	it("POST /users/aboutMe", function() {
		agent
		.post("/users/aboutMe")
		.send({ "user_id": "5cd2089218d8881ba280350e", "text" : "I'm the boss!"})
		.then(function(res) {
			expect(res.status).to.equal(200);
		});
	});

	it("POST /users/name", function() {
		agent
		.post("/users/aboutMe")
		.send({ "firstName": "Drusti", "lastName" : "Thakkar", "user_id": "5cd2089218d8881ba280350e" })
		.then(function(res) {
			expect(res.status).to.equal(200);
		});
	});

	it("DELETE /users/:userId", function() {
		agent
		.delete("/users/5cc3f69ed23457601476d019")
		.then(function(res) {
			expect(res.status).to.equal(200);
		});
	});

	it("PUT /users/:userId/enable", function() {
		agent
		.put("/users/5cca513b61aabb7bb978ca38/follow/enable")
		.then(function(res) {
			expect(res.status).to.equal(200);
		});
	});

});
