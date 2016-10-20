// vendor library
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');

// custom library
// model
var Model = require('./model');

// index
var index = function(req, res, next) {
   if(!req.isAuthenticated()) {
      res.redirect('/signin');
   } else {

      var user = req.user;
      
      if(user !== undefined) {
         user = user.toJSON();
      }

      //check this user is admin or not
      if(user.isAdmin==1)
      {
         
            new Model.User().fetchAll()
          .then(function(user_info) {
               var data=user_info.toJSON();
               //console.log(data);
               res.render('admin',{title:'Admin area',user:data});
             });
              //console.log(model);
  
      }
      //else normal user view their info and delete account.
      else
      {
         res.render('index', {title: 'Home', user: user});   
      }
      
   }
};

// sign in
// GET
var signIn = function(req, res, next) {
   if(req.isAuthenticated()) res.redirect('/');
   res.render('signin', {title: 'Sign In'});
};

// sign in
// POST
var signInPost = function(req, res, next) {
   //console.log("this is triggered");
   passport.authenticate('local', { successRedirect: '/',
                          failureRedirect: '/signin'}, function(err, user, info) {
      if(err) {
         return res.render('signin', {title: 'Sign In', errorMessage: err.message});
      } 

      if(!user) {
         return res.render('signin', {title: 'Sign In', errorMessage: info.message});
      }
      return req.logIn(user, function(err) {
         if(err) {
            return res.render('signin', {title: 'Sign In', errorMessage: err.message});
         } else {
            return res.redirect('/');
         }
      });
   })(req, res, next);
};

// sign up
// GET
var signUp = function(req, res, next) {
   if(req.isAuthenticated()) {
      res.redirect('/');
   } else {
      res.render('signup', {title: 'Sign Up'});
   }
};

// sign up
// POST
var signUpPost = function(req, res, next) {
   var user = req.body;
   //console.log(req.body);
   var usernamePromise = null;
   usernamePromise = new Model.User({username: user.username}).fetch();

   return usernamePromise.then(function(model) {
      if(model) {
         res.render('signup', {title: 'signup', errorMessage: 'username already exists'});
      } else {
         
         var password = user.password;
         var hash = bcrypt.hashSync(password);

         var signUpUser = new Model.User({username:user.username,email:user.useremail,password:hash});

         signUpUser.save().then(function(model) {
            // sign in the newly registered user
            signInPost(req, res, next);
         });	
      }
   });
};

//delete userInfo  var id = req.params.id;
var delete_user=function (req, res) {
   //console.log(req.params.id);
   //first check is authenticated or not
   if(req.isAuthenticated()) {
    new Model.User({userId: req.params.id})
  .destroy()
  .then(function(model) {
    req.logout();
      res.redirect('/signin');
  });  
   }
    
  };


// sign out
var signOut = function(req, res, next) {
   if(!req.isAuthenticated()) {
      notFound404(req, res, next);
   } else {
      req.logout();
      res.redirect('/signin');
   }
};

// 404 not found
var notFound404 = function(req, res, next) {
   res.status(404);
   res.render('404', {title: '404 Not Found'});
};


// export functions
/**************************************/
// index
module.exports.index = index;

// sigin in
// GET
module.exports.signIn = signIn;
// POST
module.exports.signInPost = signInPost;

// sign up
// GET
module.exports.signUp = signUp;
// POST
module.exports.signUpPost = signUpPost;

// sign out
module.exports.signOut = signOut;


//delete
module.exports.delete_user=delete_user;

// 404 not found
module.exports.notFound404 = notFound404;