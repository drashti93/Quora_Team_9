var express = require("express");
var graphs = express.Router();
var AnswerModel = require("../model/AnswerSchema");
var QuestionModel = require("../model/QuestionSchema");
var UserModel = require('../model/UserSchema');
var TopicModel = require('../model/TopicSchema');
var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({ extended: false });
var kafka = require('../kafka/client')


graphs.get('/answers/top/10/:id',function(req,res){

    kafka.make_request('top_10_answers',req.params.id, function(err,result){
        console.log('inside top 10 answers request handler');
        console.log(result);
        if (err || result==null){
            console.log("Inside err");
            res.sendStatus(401).end("Wrong details");
            return;
        }else{
            console.log("Inside graph else");
            //res.writeHead(200);
            console.log(req.session.id)
            res.status(200).json(result);
            } 
    })

});

graphs.get('/top/10/answers/upvotes/:id', function(req,res){

    kafka.make_request('top_10_answers_upvote',req.params.id, function(err,result){

        console.log('inside top 10 answers request handler with most upvotes');
        console.log(result);
        if (err || result==null){
            console.log("Inside err");
            res.sendStatus(401).end("Wrong details");
            return;
        }else{
            console.log("Inside graph else");
            //res.writeHead(200);
            console.log(req.session.id)
            res.status(200).json(result);

            } 

    })
});

graphs.get('/top/5/answers/downvotes/:id', function(req,res){
    kafka.make_request('top_5_answers_downvotes',req.params.id, function(err,result){

        console.log('inside top 5 answers with downvotes request handler');
        console.log(result);
        if (err || result==null){
            console.log("Inside err");
            res.sendStatus(401).end("Wrong details");
            return;
        }else{
            console.log("Inside graph else");
            //res.writeHead(200);
            console.log(req.session.id)
            req.session.user = result;
            req.session.save(); 
            res.status(200).json(result);
            } 


    })
});

graphs.get('/bookmarked/answers/:id',  function(req,res){

    kafka.make_request('bookmarked_answers',req.params.id, function(err,result){

        console.log('inside bookmarked answers');
        console.log(result);
        if (err || result==null){
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

graphs.get('/profile/views/:id', function(req,res){

    kafka.make_request('profile_views',req.params.id, function(err,result){

        console.log('inside profile views handler');
        // console.log(result);
        if (err || result==null){
            console.log("Inside err");
            res.sendStatus(401).end("Wrong details");
            return;
        }else{
            console.log("Inside graph else");
            //res.writeHead(200);
            console.log(req.session.id)
            let {Profile_views}=result[0];
            if(Profile_views.length>30){
                Profile_views=Profile_views.slice(Profile_views.length-30,Profile_views.length)
            }
           res.status(200).json(Profile_views);
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

