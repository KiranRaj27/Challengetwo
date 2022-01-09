const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

var port = process.env.PORT || 3330;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// var transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "kiranrajnv308@gmail.com",
//     pass: "Kiranrajnv@308",
//   },
// });

// var mailOptions = {
//   from: "kiranrajnv308@gmail.com",
//   to: "kiranraj2708@gmail.com",
//   subject: "Coding challenge",
//   text: "testing",
// };

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Email sent:" + info.response);
//   }
// });

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/src/index.html`);
  // res.send(
  //   `<h1 style="text-align:center">Welcome to coding competition by Kiran Raj, "NORKA B2"</h1>`
  // );
});

app.get("/home", (req, res) => {
  res.sendFile(`${__dirname}/src/email.html`);
});

app.post("/mailer", (req, res) => {
  var emailAddress = req.body.email;
  console.log(emailAddress);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kiranrajnv308@gmail.com",
      pass: "Kiranrajnv@308",
    },
  });

  var mailOptions = {
    from: "kiranrajnv308@gmail.com",
    to: emailAddress,
    subject: "Coding challenge",
    text: "This mail is sent for testing purpose only ",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      // res.send(error);
      res.sendFile(`${__dirname}/src/error.html`);
    } else {
      // res.send("Email sent:" + info.response);
      res.sendFile(`${__dirname}/src/success.html`);
    }
  });
});

var server = app.listen(port, () => {
  console.log("Server Ready on 3330");
});
