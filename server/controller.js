const bodyparser = require('body-parser');
var {check, validationResult} = require('express-validator/check');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Post = require('./models/Post');
const PicArea = require('./models/PicArea');
const adminController = require("./admincontroller");
const Admin = require('./models/Admin');
const multer = require('multer');

module.exports = function(app){
  const regValidation = [
   check("email")
     .not()
     .isEmpty()
     .withMessage("Email is required")
     .isEmail()
     .withMessage("Email should be an email address"),
   check("name")
     .not()
     .isEmpty()
     .withMessage("First name is required")
     .isLength({ min: 2 })
     .withMessage("Name should be at least 2 letters")
     .matches(/^([A-z]|\s)+$/)
     .withMessage("Name cannot have numbers"),
   check("password")
     .not()
     .isEmpty()
     .withMessage("Password is required")
     .isLength({ min: 7 })
     .withMessage("Password should be at least 6 characters"),
   check(
     "password_con",
     "Password confirmation  is required or should be the same as password"
   ).custom(function(value, { req }) {
     if (value !== req.body.password) {
       throw new Error("Password don't match");
     }
     return value;
   }),
   check("email").custom(value => {
     return User.findOne({ email: value }).then(function(user) {
       if (user) {
         throw new Error("This email is already in use");
       }
     });
   })
 ];

//------------registeration:--------
  function register(req, res) {
    var errors = validationResult(req);

   if (!errors.isEmpty()) {
     return res.send({ errors: errors.mapped() });
   }
    var user = new User(req.body);
    user.password = user.hashPassword(user.password);
    user
    .save()
    .then(user => {
      return res.json(user);
    })
    .catch(err => res.send(err));
  }

  app.post("/api/register",regValidation,register);
  app.get("/",(req, res) => res.json("hey there"));

//----------------LogIn:-------------
const logValidation = [
   check("email")
     .not()
     .isEmpty()
     .withMessage("Email is required"),
   check("password")
     .not()
     .isEmpty()
     .withMessage("Password is required")
 ];
 function loginUser(req, res) {
   var errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.send({ errors: errors.mapped() });
   }
   User.findOne({
     email: req.body.email
   })
     .then(function(user) {
       if (!user) {
         return res.send({ error: true, message: "User does not exist!" });
       }
       if (!user.comparePassword(req.body.password, user.password)) {
         return res.send({ error: true, message: "Wrong password!" });
       }
       req.session.user = user;
       req.session.isLoggedIn = true;
       return res.send({ message: "You are signed in" });
       res.send(user);
     })
     .catch(function(error) {
       console.log(error);
     });
 }
 app.post("/api/login", logValidation, loginUser);
// ----------isLoggedIn------------
function isLoggedIn(req, res, next) {
  if (req.session.isLoggedIn) {
    res.send(true);
  } else {
    res.send(false);
  }
}
app.get("/api/isloggedin", isLoggedIn);

// ------------Post:-----------
  const postValidation = [
    check("size")
      .not()
      .isEmpty()
      .withMessage("Please write something."),
    check("lat")
      .not()
      .isEmpty()
      .withMessage("Please write something."),
    check("lng")
      .not()
      .isEmpty()
      .withMessage("Please write something."),
  ];

  function addPost(req, res) {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.mapped() });
    }
    var post = new Post(req.body);
    if (req.session.user) {
      post.user = req.session.user._id;
      post
        .save()
        .then(post => {
          res.json(post);
        })
        .catch(error => {
          res.json(error);
        });
    } else {
      return res.send({ error: "You are not logged in!" });
    }
  }
  app.post("/api/addpost", postValidation, addPost);

// -----------------------------
app.post("/api/postupvote/:id", (req, res) => {
   Post.findById(req.params.id).then(function(post) {
     post.vote = post.vote + 1;
     post.save().then(function(post) {
       res.send(post);
     });
   });
 });

// -------------show Posts:------------

   function showPosts(req, res) {
    Post.find()
      .populate("user", ["name", "email"])
      .sort({ createdAt: "desc" })
      .then(post => {
        res.json(post);
      })
      .catch(error => {
        res.json(error);
      });
  }

  // check auth
  var auth = (req, res, next) => {
      if (req.session.admin) {
        Admin.findOne({
          email: req.session.admin.email,
          password: req.session.admin.password
        }).then(function(admin) {
            if (!admin) {
              return res.status(401).json({ errors: "Not authorized!" });
            } else {
              return next();
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        return res.status(401).send({ errors: "Not authorized!" });
      }
    };


  app.get("/api/showposts", showPosts);
  app.get("/api/logout", (req, res) => {
    req.session.destroy();
    res.send({ message: "Logged out!" });
  });

// -------------show lat & lng opject:------------

   function showArea(req, res) {
    Post.find()
      .then(post => {
        res.json(post.map(req => {
          return ({lat: req.lat, lng: req.lng})
        }));
      })
      .catch(error => {
        res.json(error);
      });
  }

  app.get("/api/showarea", showArea);
  app.get("/api/logout", (req, res) => {
    req.session.destroy();
    res.send({ message: "Logged out!" });
  });

  // ----------------Show one----------------

     function showOne(req, res) {
      Post.findById({_id:req.params.id})
        .populate("post", ["size", "lat", "lng", "createdAt"])
        .sort({ createdAt: "desc" })
        .then(post => {
          res.json(post);
        })
        .catch(error => {
          res.json(error);
        });
    }

    app.get("/api/showOne/:id", showOne);

};
