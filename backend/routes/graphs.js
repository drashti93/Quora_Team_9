var express = require("express");
var graphs = express.Router();
var AnswerModel = require("../model/AnswerSchema");
var QuestionModel = require("../model/QuestionSchema");
var UserModel = require('../model/UserSchema');
var TopicModel = require('../model/TopicSchema');
var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({ extended: false });
var kafka = require('../kafka/client')


graphs.get('/answers/top/10',function(req,res){

    kafka.make_request('top_10_answers',req.query.id, function(err,result){
        console.log('inside top 10 answers request handler');
        console.log(result);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Wrong details");
            return;
        }else{
            console.log("Inside graph else");
            //res.writeHead(200);
            console.log(req.session.id)
            req.session.user = result;
            req.session.save(); 
            res.end(JSON.stringify(req.session.user));
            } 
    })

});

graphs.get('/top/10/answers/upvotes', function(req,res){

    kafka.make_request('top_10_answers_upvote',req.query.id, function(err,result){

        console.log('inside top 10 answers request handler with most upvotes');
        console.log(result);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Wrong details");
            return;
        }else{
            console.log("Inside graph else");
            //res.writeHead(200);
            console.log(req.session.id)
            req.session.user = result;
            req.session.save(); 
            res.end(JSON.stringify(req.session.user));
            } 

    })
});

graphs.get('/top/5/answers/downvotes', function(req,res){
    kafka.make_request('top_5_answers_downvotes',req.query.id, function(err,result){

        console.log('inside top 5 answers with downvotes request handler');
        console.log(result);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Wrong details");
            return;
        }else{
            console.log("Inside graph else");
            //res.writeHead(200);
            console.log(req.session.id)
            req.session.user = result;
            req.session.save(); 
            res.end(JSON.stringify(req.session.user));
            } 


    })
});

graphs.get('/bookmarked/answers',  function(req,res){

    kafka.make_request('bookmarked_answers',req.query.id, function(err,result){

        console.log('inside bookmarked answers');
        console.log(result);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Wrong details");
            return;
        }else{
            console.log("Inside graph else");
            //res.writeHead(200);
            console.log(req.session.id)
            req.session.user = result;
            req.session.save(); 
            res.end(JSON.stringify(req.session.user));
            } 


    })
});

graphs.get('/profile/views', function(req,res){

    kafka.make_request('profile_views',req.query.id, function(err,result){

        console.log('inside profile views handler');
        console.log(result);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Wrong details");
            return;
        }else{
            console.log("Inside graph else");
            //res.writeHead(200);
            console.log(req.session.id)
            req.session.user = result;
            req.session.save(); 
            res.end(JSON.stringify(req.session.user));
            } 

    })
})

graphs.get('/get/activity', function(req,res){

    kafka.make_request('user_activity', req.query.id, function(err,result){

        console.log('inside user activity handler');
        console.log(result);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Wrong details");
            return;
        }else{
            console.log("Inside else");
            //res.writeHead(200);
            console.log(req.session.id)
            req.session.user = result;
            req.session.save(); 
            res.end(JSON.stringify(req.session.user));
            } 

    })
})

module.exports = graphs;

