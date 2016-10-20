var express = require('express');
//var morgan = require('morgan');
var bodyParser = require('body-parser');

var Leaders = require('../models/leadership');
//app.use(morgan('dev'));

var leadership = express.Router();

leadership.use(bodyParser.json());

leadership.route('/')
.get(function(req,res,next){
  Leaders.find({}, function (err, leaders) {
        if (err) throw err;
        res.json(leaders);
    });

})

.post(function(req, res, next){
     Leaders.create(req.body, function (err, leader) {
        if (err) throw err;
        console.log('Leader created!');
        var id = leader._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Leadership data added successfully');
    });    
})

.delete(function(req, res, next){
        Leaders.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

leadership.route('/:leaderId')
.get(function(req,res,next){
     Leaders.findById(req.params.leaderId, function (err, leader) {
      if (err) throw err;
      res.json(leader);
    });
})

.put(function(req, res, next){
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, {
        new: true
    }, function (err, leader) {
        if (err) throw err;
        res.json(leader);
    });
})

.delete(function(req, res, next){
    Leaders.findByIdAndRemove(req.params.leaderId, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = leadership;
