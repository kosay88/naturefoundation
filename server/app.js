const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const controller = require('./controller');
const multer = require('multer');
// const storage = require('storage');
const admincontroller = require('./admincontroller');
const path = require('path');
const mime = require('mime-types');


const app = express();

app.use(bodyparser.json());
mongoose.connect("mongodb://kosay:kosay88@ds235302.mlab.com:35302/challenge",  { useNewUrlParser: true });


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, 'uploads'))
  },
  filename: function (req, file, cb) {
    const extension = mime.extension(file.mimetype);
    console.log(extension)
    // const filename = randomstring.generate();
    const filename = file.originalname + "-" + Date.now().toString();
    cb(null, filename + '.' + extension)
  }
})

//this is for uploading photo
var upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads'))



// Cors:
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://cryptic-springs-10908.herokuapp.com"
    ],
    methods: ["GET", "HEAD", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
    credentials: true //allow setting of cookies
  })
);

// session:
app.use(
  session({
    secret: "supersecretstring12345!",
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 60000 * 30 }
  })
);
controller(app);

admincontroller(app);

app.listen(8000, () => console.log('Listening... port8000'));
