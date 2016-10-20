var express = require('express');
//var morgan = require('morgan');
var bodyParser = require('body-parser');

var feedback = require('../models/feedback');
//app.use(morgan('dev'));

var feedbacks = express.Router();

feedbacks.use(bodyParser.json());

feedbacks.route('/')
.get(function(req,res,next){
  feedback.find(req.query, function (err, data) {
        if (err) next(err);
        res.json(data);
    });

})

.post(function(req, res, next){
     feedback.create(req.body, function (err, data) {
        if (err) next(err);
        console.log('feedback created!');
        var id = data._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the feedback table with id: ' + id);
    });    
})

.delete(function(req, res, next){
        feedback.remove({}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});

feedbacks.route('/:feedbackId')
.get(function(req,res,next){
     feedback.findById(req.params.feedbackId, function (err, data) {
      if (err) next(err);
      res.json(data);
    });
})

.put(function(req, res, next){
    feedback.findByIdAndUpdate(req.params.feedbackId, {
        $set: req.body
    }, {
        new: true
    }, function (err, data) {
        if (err) next(err);
        res.json(data);
    });
})

.delete(function(req, res, next){
    feedback.findByIdAndRemove(req.params.feedbackId, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});

module.exports = feedbacks;
