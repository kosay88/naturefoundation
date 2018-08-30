const bodyparser = require('body-parser');
var {check, validationResult} = require('express-validator/check');
const bcrypt = require('bcrypt');
// const User = require('./models/User');
// const Post = require('./models/Post');
const adminController = require("./admincontroller");
const Admin = require('./models/Admin');
const PicArea = require('./models/PicArea');
const multer = require('multer');
// var Upload = require('upload-file');
var upload = multer({ dest: 'uploads/' });
var express = require('express');
var path = require('path');

module.exports = function(app){
    var registerAdmin = (req, res) => {
        const admin = new Admin(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send({ status: "error", errors: errors.mapped() });
        }
        admin.jobTitle = "Admin";
        admin.password = admin.hashPassword(admin.password);
        admin
            .save()
            .then(admin => {
                return res.send({ status: "success", message: "registerd successfuly" });
            })
            .catch(error => {
                console.log(error);
                return res.send({ status: "error", message: error });
            });
    };
    
    app.post("/api/admin/register",
        [
            check("name", "please enter your full name")
                .not()
                .isEmpty(),
            check("name", "Your name can not contain any numbers").matches(
                /^[A-z''., ]+$/i
            ),
            check("name", "Your name should be more than 4 characters").isLength({
                min: 4
            }),
    
            check("email", "your email is not valid").isEmail(),
            check("email", "email already exist").custom(function (value) {
                return Admin.findOne({ email: value }).then(Admin => !Admin);
            }),
            check(
                "password",
                "your password should be 5 or more characters"
            ).isLength({ min: 5 }),
            check("con_password", "your password confirmation dose not match").custom(
                (value, { req }) => value === req.body.password
            )
        ],
        registerAdmin
    );



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

var login = (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send({ err: errors.mapped() });
    }
    Admin.findOne({ 
        email: req.body.email
    }).then(function (admin) {
        // if user name or password is wrong
        if (!admin) {
            return res.json({ err: true, message: 'Wrong credential' })
        }
        if (!admin.comparePassword(req.body.password, admin.password)) {
            return res.send({ err: true, message: "Wrong password!" });
        }

        //user is found
        console.log('before cookie');
        req.session.admin = admin;
        req.session.save();
        res.status(200).json(admin);
    }).catch(error => {
        console.log(error);
        return res.status(422).json({ status: 'error', message: error })
    })
}

app.post('/api/admin/login', logValidation, login);


// Login checker
AdminisLoggedIn = (req, res, next) => {
    if (req.session.admin) {
        res.status(200).json(req.session.admin);
    } else {
        res.send(false);
    }
}
app.get("/api/admin/isloggedin", AdminisLoggedIn);


///////////Session for current admin/////////////////////////////////////////////////////
app.get('/api/current_Admin', function (req, res) {
  if (req.session.admin) {
    Admin.findById(req.session.admin._id)
      .then(function (admin) {
        res.send({
          _id: admin._id,
          email: admin.email,
          firstName: admin.firstName,
        }).populate(admin)
      })
  } else {
    res.send({ error: 'not logged in' })
  }
});

////////////////////////////////////////////////////////////////////////////////////////


//Add photo
app.post('/api/admin/upload', 
upload.fields([{ name: "imgUrl", maxCount: 1 }]), //multer files uploadvalidations,
(req, res) => {
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).send({ errors: errors.mapped() });
  }
  var filename = null;
  if (req.files && req.files.imgUrl && req.files.imgUrl[0]) {
    filename = req.files.imgUrl[0].filename;
  }
  var team = new PicArea(req.body);
  team.imgUrl = filename;
  team
    .save()
    .then(savedteam => {
      res.json(savedteam);
    })
    .catch(err => {
      res.status(404).send(err);
    });  
       
});





 

// }

//

// //chechk auth
// var auth = (req, res, next) => {
//     if (req.session.admin) {
//       Admin.findOne({
//         email: req.session.admin.email,
//         password: req.session.admin.password
//       }).then(function(admin) {
//           if (!admin) {
//             return res.status(401).json({ errors: "Not authorized!" });
//           } else {
//             return next();
//           }
//         })
//         .catch(function(error) {
//           console.log(error);
//         });
//     } else {
//       return res.status(401).send({ errors: "Not authorized!" });
//     }
//   };

















///Log Out
app.get('/api/admin/logout', function (req, res) {
    req.session.destroy();
    res.send({ message: 'session destroyed' })
    console.log("Admin log out");
  });










}








