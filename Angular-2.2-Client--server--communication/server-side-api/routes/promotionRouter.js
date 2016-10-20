var express = require('express');
//var morgan = require('morgan');
var bodyParser = require('body-parser');

//app.use(morgan('dev'));
var Promotion = require('../models/promotions');
var promotions = express.Router();

promotions.use(bodyParser.json());

promotions.route('/')
.get(function(req,res,next){
    Promotion.find({}, function (err, promotions) {
        if (err) throw err;
        res.json(promotions);
    });
})
.post(function(req, res, next){
     Promotion.create(req.body, function (err, promotion) {
        if (err) throw err;
        console.log('Promotion created!');
        var id = promotion._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end("Promotion data added successfully.");
    }); 
})

.delete(function(req, res, next){
        Promotion.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
        });
});

promotions.route('/:promotionId')
.get(function(req,res,next){
    Promotion.findById(req.params.promotionId, function (err, promotion) {
      if (err) throw err;
      res.json(promotion);
    });
})

.put(function(req, res, next){
    Promotion.findByIdAndUpdate(req.params.promotionId, {
        $set: req.body
    }, {
        new: true
    }, function (err, promotion) {
        if (err) throw err;
        res.json(promotion);
    });
})

.delete(function(req, res, next){
   Promotion.findByIdAndRemove(req.params.promotionId, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = promotions;
