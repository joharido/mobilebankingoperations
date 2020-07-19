
var express = require('express');
require('dotenv').config();
var coder = require('nodejs-base64-encode');
var fs = require('fs');
var formidable = require('formidable');
var nodemailer = require('nodemailer');
var cookieParser = require('cookie-parser');

// hosts
const serverHostName = 'http://localhost:3000/';
const frontEndHostName = 'http://localhost:8887/';

const cors = require('cors');
var path = require('path');
// var cors = require('cors')
var i;
var assigned_to;
//var assignee = {};
indices = [];
var pickedIndex;

const app = express();
var bodyParser = require('body-parser');
const { body } = require('express-validator');

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

// app.post()

app.post('/createUser', urlencodedParser, function (req, res) {
  // console.log("bloop");
  var length = req.body.user.length;
  var recepients = [];
  var jsonData = req.body;

  //Randomize the user selection

  for (var i = 0; i < length; i++) {
    indices.push(i);

  }

  for (var j = 0; j < length; j++) {
    console.log(indices);
    pickedIndex = Math.floor(Math.random() * indices.length);
    while (indices[pickedIndex] == j) {
      pickedIndex = Math.floor(Math.random() * indices.length);
    }
    req.body.user[j].assigned_to = indices[pickedIndex];
    req.body.user[indices[pickedIndex]].assignee = j;
    indices.splice(pickedIndex, 1);
    console.log(indices);
  }
  console.log(req.body.user);

  res.cookie("body", 'j=' + JSON.stringify(req.body))


  // The user has been created properly and is authenticated

  // set a cookie for authenticated to true
  res.cookie('authenticated', true);
  res.redirect(`${frontEndHostName}frontend/landingPage.html`);
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





  // for (var i = 0; i < req.cookies['body'].user.length; i++) {
  //   console.log('coobikies', req.cookies['body'])
  //   var assignedNum = req.cookies['body'].user[i].assigned_to;
  //   var assignedToUser = req.cookies['body'].user[assignedNum].user_info;
  //   var currentUser = req.cookies['body'].user[i].user_info;
  //   const mailOptions = {
  //     from: 'randomize@bubble.com',
  //     to: req.cookies["body"].user[i].email_info,
  //     subject: 'RBC Mobile Banking Operations',
  //     html: `Hello ${currentUser}, you are assigned to ${assignedToUser}.`
  //      + '<p>'  + req.body.emailBody + '</p>'
  //   };

  //   transporter.sendMail(mailOptions, function (error, info) {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log('Email sent: ' + info.response);
  //     }
  //   });
  // }

  res.redirect(`${frontEndHostName}/frontend/emailSentConfirmation.html`)
  res.end()
})

app.listen(3000, () => {
  console.log(`Server running at ${serverHostName} ✔`);
});


//SENDING INTIAL EMAIL: COMING SOON
/*app.get('/initialEmail', (req, res) => {
  for (var i = 0; i < req.cookies['body'].user.length; i++) {
    console.log('coobikies', req.cookies['body'])
    var assignedNum = req.cookies['body'].user[i].assigned_to;
    var assignedToUser = req.cookies['body'].user[assignedNum].user_info;
    const mailOptions = {
      from: 'randomize@bubble.com',
      to: req.cookies["body"].user[i].email_info,
      subject: 'hello there!',
      html: `Hello, you are assigned to ${assignedToUser}.`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

  }

  res.redirect('http://localhost:8887/frontend/landingPage.html');
  res.end();
}) */



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