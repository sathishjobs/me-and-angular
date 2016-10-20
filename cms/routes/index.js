var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
//cms model
var nest_paris_model = require('../models/nest_paris');
//user model
var users = require('../models/user');
var router = express.Router();
router.use(bodyParser.json());

//get websites data from mongodb and return to the index view .
router.get('/', function(req, res, next) {
  nest_paris_model.find({}, function (err, data) {
        if (err) next(err);
         //console.log(res.json(data));
         if(data.length<=0)
         {
            res.render("instruction");
         }
        res.render('index', { title: 'Express',Data:data });
        
    });
});
//login router
router.get('/login', function(req, res, next) {
  res.render('login.ejs', { message: req.flash('loginMessage') });
});
//signup router
router.get('/signup', function(req, res) {
  res.render('signup.ejs', { message: req.flash('loginMessage') });
});
//logout router
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});
//signup postrouter
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/cms_nest_paris',
  failureRedirect: '/signup',
  failureFlash: true,
}));

//login post router
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/cms_nest_paris',
  failureRedirect: '/login',
  failureFlash: true,
}));

/*cms common route start here */
//commone cms api for put web site data
router.route('/cms_paris_api')
.get(function (req, res, next) {
    nest_paris_model.find({}, function (err, data) {
        if (err) next(err);
       //res.render('cms_nest_paris',{title:"Welcome to Nest paris",Data:data});
       res.json(data);
    });
})
//post common website data using /cms_paris_api
.post(function (req, res, next) {
    nest_paris_model.create(req.body, function (err, data) {
        if (err) next(err);
        
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added successfully. Access website via localhost:3003');
    });
});
//access individual collection 
router.route('/cms_paris_api/:nest_paris_Id')
.get(function (req, res, next) {
    nest_paris_model.findById(req.params.nest_paris_Id, function (err, dish) {
        if (err) next(err);
        res.json(dish);
    });
})

.put(function (req, res, next) {
    nest_paris_model.findByIdAndUpdate(req.params.nest_paris_Id, {
        $set: req.body
    }, {
        new: true
    }, function (err, dish) {
        if (err) next(err);
        res.json(dish);
    });
})

.delete(function (req, res, next) {
    nest_paris_model.findByIdAndRemove(req.params.nest_paris_Id, function (err, resp) {       
     if (err) throw err;
        res.json(resp);
    });
});

//data provided for cms_nest_paris admin page.
router.route('/cms_nest_paris')
.get(isLoggedIn,function (req, res, next) {
    nest_paris_model.find(req.query, function (err, data) {
        if (err) next(err);
       res.render('cms_nest_paris',{title:"Welcome to Nest paris",Data:data});
       //res.json(data);
    });
})

/* cms common route end here */

/* social link update part */
router.route('/social_link/:nest_paris_Id/social_link/:social_link_Id')
.get(function (req, res, next) {
    nest_paris_model.findById(req.params.nest_paris_Id, function (err, nest_paris) {
        if (err) next (err);
        res.json(nest_paris.social_link.id(req.params.social_link_Id));
    });
})

.post(function (req, res, next) {
    
       nest_paris_model.findById(req.params.nest_paris_Id, function (err, nest_paris) {
        if (err) next (err);

        nest_paris.social_link.id(req.params.social_link_Id).remove();
        //console.log(nest_paris.social_link.id(req.params.social_link_Id).link_type);
        //nest_paris.social_link.id(req.params.social_link_Id).link_type=req.body.link_type;
        nest_paris.social_link.push(req.body);
        nest_paris.save(function (err, data) {
            if (err) next (err);
            //console.log('Updated the social_link path is!'+req.params.social_link_Id);
            //res.json(dish);
            var message={type:'success',msg:'successfully updated',icon:req.body.link_type,path:req.body.link_path};
            res.json(message);
        });
    });
})
.delete(function (req, res, next) {
    nest_paris_model.findById(req.params.nest_paris_Id, function (err, nest_paris) {
        nest_paris.social_link.id(req.params.social_link_Id).remove();
        nest_paris.save(function (err, resp) {
            if (err) next (err);
            res.json(resp);
        });
    });
});

/* end social link update part 

/* start what is next update part */
router.route('/what_is_next/:nest_paris_Id/what_is_next/:contentId')
.get(function (req, res, next) {
    nest_paris_model.findById(req.params.nest_paris_Id, function (err, nest_paris) {
        if (err) next (err);
        res.json(nest_paris.what_is_next.id(req.params.contentId));
    });
})

.post(function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    nest_paris_model.findById(req.params.nest_paris_Id, function (err, nest_paris) {
        if (err) next (err);
        nest_paris.what_is_next.id(req.params.contentId).remove();
        nest_paris.what_is_next.push(req.body);
        nest_paris.save(function (err, dish) {
            if (err) next (err);
            var message={type:'success',msg:'successfully updated',icon:req.body.type};
            res.json(message);
        });
    });
})

.delete(function (req, res, next) {
    nest_paris_model.findById(req.params.nest_paris_Id, function (err, nest_paris) {
        nest_paris.what_is_next.id(req.params.contentId).remove();
        nest_paris.save(function (err, resp) {
            if (err) next (err);
            res.json(resp);
        });
    });
});

/* End what is next update part */

/* Start faq cms part */
  router.route('/faq/:nest_paris_Id/faq/:faqId')
.get(function (req, res, next) {
    nest_paris_model.findById(req.params.nest_paris_Id, function (err, nest_paris) {
        if (err) next (err);
        res.json(nest_paris.faq.id(req.params.faqId));
    });
})

.post(function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    nest_paris_model.findById(req.params.nest_paris_Id, function (err, nest_paris) {
        if (err) next (err);
        nest_paris.faq.id(req.params.faqId).remove();
        nest_paris.faq.push(req.body);
        nest_paris.save(function (err, dish) {
            if (err) next (err);
            var message={type:'success',msg:'successfully updated',icon:"FAQ"};
            res.json(message);
        });
    });
})

.delete(function (req, res, next) {
    nest_paris_model.findById(req.params.nest_paris_Id, function (err, nest_paris) {
        nest_paris.faq.id(req.params.faqId).remove();
        nest_paris.save(function (err, resp) {
            if (err) next (err);
            res.json(resp);
        });
    });
});
/* End faq cms part */
module.exports = router;

//check weather the user is logged in or not
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}
