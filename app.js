var PORT = process.env.PORT || 3000;
var express = require('express');
var session  = require('express-session');
require('dotenv').config();
var coder = require('nodejs-base64-encode');
var fs = require('fs');
var formidable = require('formidable');
var nodemailer = require('nodemailer');
var cookieParser = require('cookie-parser');


const cors = require('cors');
var path = require('path');
var i;
var assigned_to;
indices = [];
var pickedIndex;

const app = express();
var bodyParser = require('body-parser');
const { body } = require('express-validator');

app.use("/", express.static("frontend"))
var corsOptions = {
  origin: '*',
  credentials: true
};
app.use(cors(corsOptions))

app.use(cookieParser());

var urlencodedParser = express.urlencoded({ extended: true })

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USERNAME,
    pass: process.env.PASSWORD
  }
});

app.use(express.urlencoded({
  extended: true
}));

app.use(express.json({ type: 'application/*+json' }));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
}));


app.get('/', (req, res) => {
  res.redirect('./mini.html')
})

app.post('/createUser', urlencodedParser, function (req, res) {
  if (!req.session.viewCount){
    req.session.viewCount = 1;
  } else{
    req.session.viewCount += 1;
  }
  
  var length = req.body.user.length;
  // var jsonData = req.body;

  //Randomize the user selection
  for (var i = 0; i < req.body.user.length; i++) {
    indices.push(i);
  }

  for (var j = 0; j < req.body.user.length; j++) {
    console.log(indices);
    pickedIndex = Math.floor(Math.random() * indices.length);
    while (pickedIndex == j) {
      pickedIndex = Math.floor(Math.random() * indices.length);
    }
    req.body.user[j].assigned_to = indices[pickedIndex];
    req.body.user[indices[pickedIndex]].assignee = j;
    indices.splice(pickedIndex, 1);
  }

  res.cookie("body", 'j=' + JSON.stringify(req.body))

  // The user has been created properly and is authenticated

  // set a cookie for authenticated to true
  res.cookie('authenticated', true);
  res.redirect('./initialEmail')
  res.end();
})


// form key 
app.post('/encrypt', (req, res) => {
  let cookie = req.body;
  var buffer = Buffer.from(cookie.j);

  var encrypted = buffer.toString("base64")
  res.send(encrypted);
  res.end();
})

app.post('/decrypt', (req, res) => {
  let cookie = req.body;
  var buffer = Buffer.from(cookie.key, "base64");
  res.send(buffer.toString());
  res.end();
})

//sending email
app.post('/sendEmail', (req, res) => {
  var cookie = JSON.parse(req.cookies['body'].slice(2));
  var users = cookie.user;
  for (var i = 0; i < users.length; i++){
    var assignedNum = users[i].assigned_to;
    var assignedToUser = users[assignedNum].user_info;
    var currentUser = users[i].user_info;
    const mailOptions = {
      from: 'randomize@bubble.com',
      to: users[i].email_info,
      subject: 'RBC Mobile Banking Operations',
      html: `Hello ${currentUser}, you are assigned to ${assignedToUser}.`
       + '<p>'  + req.body.emailBody + '</p>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }

  res.redirect(`./emailSentConfirmation.html`)
  res.end()
})


//SENDING INTIAL EMAIL
app.get('/initialEmail', (req, res) => {
  //do a cookie check
  var body = JSON.parse(req.cookies['body'].slice(2));
  var authenticated = JSON.parse(req.cookies['authenticated']);
  console.log(typeof authenticated)
  console.log(authenticated && authenticated === true && body)
  if (authenticated && authenticated === true && body) {
    var users = body.user;
    for (var i = 0; i < users.length; i++){
      var assignedNum = users[i].assigned_to;
      var assignedToUser = users[assignedNum].user_info;
      var currentUser = users[i].user_info;
      const mailOptions = {
        from: 'randomize@bubble.com',
        to: users[i].email_info,
        subject: 'RBC Mobile Banking Operations',
        html: `Hello ${currentUser}, you are assigned to ${assignedToUser}.`
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }
    res.redirect('./landingPage.html')
  }
  else {
    res.redirect('./404page.html')
  }
  res.end();
}) 


app.get('*', (req, res) => {
  res.redirect('./404page.html')
})


app.listen(PORT, () => {
  console.log(`Server running at ${process.env.HOST || 'http://localhost:3000/'} ✔`);
});



//SENDING UPDATED EMAIL: COMING SOON
/*app.get('/updatedEmail', (req, res)  => {
 for (var i = 0; i < req.cookies['body'].user.length; i++){
  var assignedNum = req.cookies['body'].user[i].assigned_to;
  var assignedToUser = req.cookies['body'].user[assignedNum].user_info;
  const mailOptions = {
    from: 'randomize@bubble.com',
    to: req.cookies["body"].user[i].email_info,
    // "mytext":["Ari","aridokmecian@gmail.com","e","e@e.e"]
    // cc: "donyahjohari@gmail.com",
    subject: 'hello there!',
    html: `Hello, your assigned to is ${assignedToUser}`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
    console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
 }
  res.redirect('http://localhost:8887/frontend/emailCompose.html');
}) */