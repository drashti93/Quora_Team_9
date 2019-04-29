const express = require('express');
const router = express.Router();

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
	accessKeyId: "",
	secretAccessKey: ""
});

router.post('/', function (request, response) {

	const params = {
		Bucket: "",
		Key: `${request.body.uid}-${request.body.name}`,
		Body: request.files.file.data
	};

	s3.upload(params, function (error, data) {
		if (error) {
			console.log(`Profile image upload failed`);
			response.status(500).json({ error: error });
		} else {
			console.log(`Profile image upload successful`)
			response.status(200).json(data);
		}
	});
});

module.exports = router;