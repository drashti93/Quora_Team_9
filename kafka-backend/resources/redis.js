const redis = require('redis');
const client = redis.createClient("6379")

client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', (err) => {
	console.log("Error " + err)
});

module.exports = {client}