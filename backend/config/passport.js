
'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var db = require('../resources/mongoose');
var config = require('./keys');

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
        secretOrKey: config.secret
    };
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
        // Users.find({user_id: jwt_payload.user_id}, function (res) {
        //     var user = res;
        //     delete user.password;
        //     callback(null, user);
        // }, function (err) {
        //     return callback(err, false);
        // });
    }));

};
