const express = require('express');
const router = express.Router();
var UserModel = require("../model/UserSchema");

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
	accessKeyId: "AKIAVTAVYVUI7ETALL4M",
	secretAccessKey: "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"
});

router.post('/upload', function (request, response) {
	console.log("In upload picture backend");
	console.log(request.body.uid, request.body.name)
	const params = {
		Bucket: "quora-team9",
		Key: `${request.body.uid}-${request.body.name}`,
		Body: request.files.profileImage.data
	};

	s3.upload(params, function (error, data) {
		if (error) {
			console.log(`Profile image upload failed`);
			response.status(500).json({ error: error });
		} else {
			console.log(`Profile image upload successful`);
			console.log(data);
			console.log(request.body.uid);
			UserModel.updateOne({_id: request.body.uid}, {$set: {profileImage: {url: data.Location}}})
			.then((err, data) => {
				response.status(200).json(data);
			});
			
		}
	});

	

});

module.exports = router;