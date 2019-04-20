var mongoose = require('mongoose');

var uri = "mongodb://root:root@cluster0-shard-00-00-ptqwg.mongodb.net:27017,cluster0-shard-00-01-ptqwg.mongodb.net:27017,cluster0-shard-00-02-ptqwg.mongodb.net:27017/quora?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"
mongoose.Promise = global.Promise;
mongoose.connect(uri).then(
    () => { console.log("Connected to MongoDB") },
    err => { console.log("Did not connect", err) }
  );

module.exports = {mongoose};