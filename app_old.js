
var express = require('express');
var fs = require('fs');
var formidable = require('formidable');
var nodemailer = require('nodemailer');
// var nodeoutlook = require('nodejs-nodemailer-outlook')
const hostname = 'localhost';
const app = express();
// var server = http.createServer(app);
var bodyParser = require('body-parser');
const { body } = require('express-validator');

app.locals.userData;
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = express.urlencoded({ extended: true })

const transporter = nodemailer.createTransport({
  service: "hotmail", // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 25, // port for secure SMTP
  tls: {
    ciphers:'SSLv3'
  },
  auth: {
    user: 'mobilebankingop@gmail.com',
    pass: 'ljarjyvyvwqqgqhl'
  }
});

app.use(express.urlencoded({
  extended: true
}));

app.use(express.json({ type: 'application/*+json'}));

app.post('/createUser', urlencodedParser, function(req, res){
  console.log("bloop");

  var jsonData = req.body;
  app.locals.userData = req.body;
    // parse json
  // var jsonObj = JSON.parse(jsonData);
  // console.log(jsonObj);
  
  // stringify JSON Object
  var jsonContent = JSON.stringify(jsonData);
  
  fs.writeFile('./out.json', jsonContent, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
  })

  console.log("hello");

  res.send("recieved your request!");
  res.end();
  // const name = req.body.firstName
})

app.post('/sendEmail', (req, res) => {
  console.log(req.body)
  console.log('inside',app.locals.userData);
  var userData = app.locals.userData
  const mailOptions = {
    from: 'donyajohari@outlook.com',
    to: userData.mytext[1],
    // "mytext":["Ari","aridokmecian@gmail.com","e","e@e.e"]
    subject: 'Invoices due',
    text: req.body.emailBody
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
    console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.send('ploop 🐧');
})

app.listen(3000, ()=> {
  console.log(`Server running at http://${hostname}:${3000}/ ✔`);
});
