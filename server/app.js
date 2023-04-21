//import all our dependencies to be used
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { sendEmail, sendOtpVerificationEmail } = require('./mail');
const userModel = require('./models/users');
const otpModel = require('./models/otp');
const otp = require('./mail');
const axios = require('axios');
const cors = require('cors');
mongoose.connect(process.env.DATABASE)
app.use(express.json());
app.use(cors());
const bcrypt = require('bcrypt');

//Route is used to get all users form databse
app.get('/getUsers', async (req, res) => {
  try {
    const result = await userModel.find({});
    res.json(result);
  } catch (err) {
    res.json(err);
  }
});
//Create a new user inside the database
app.post("/createUser", async (req, res) => {
  try {
    let pass = "";
    if (req.body.password === "") {
      pass = "";
    }
    else {
      pass = await bcrypt.hash(req.body.password, 10);
    }
    const newUser = new userModel({
      name: req.body.name,
      password: pass,
      email: req.body.email
    });
    await newUser.save();
    res.send(console.log("User finally saved"));
    await otpModel.deleteMany({ otp: otp.otp });
  } catch (err) {
    console.log("error while saving your acc because of incorrect email", err);
  }
});
//to check if the user exists in the database
app.get(`/getUsers/:email`, async (req, res) => {
  try {
    const email = req.params.email;
    const result = await userModel.findOne({ email });
    res.json({ exists: !!result });
  } catch (err) {
    res.json(err);
  }
});

//to send emails after successful login
app.get(`/sendmail/:email`, async (req, res) => {
  const email = req.params.email;
  const timestamp = req.query; //timestamp is a json object retrieved from queries in url
  console.log(timestamp);
  await sendEmail(email, timestamp)
  res.send(console.log("GG mail sent successfully"))
})


app.get(`/database`, async (req, res) => {
  const sheet_data = req.query; //sheet_data is a json object retrieved from queries in url
  axios.post('https://script.google.com/macros/s/AKfycbzIJU8Ig3VnhOx3g1dZwZ04JpLMNS6pJfXMFVXlLh6XQ33M_DsKwnRhLER5DrV6ZIWb/exec?action=addUser', sheet_data, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    console.log(response);
  }).catch(error => {
    console.error(error);
  });
  res.send(console.log("GG added to database successfully"))
})

//sending otp through email
app.post("/sendveriemail/:email", async (req, res) => {
  //handle acc verification
  const email = req.params.email;
  await sendOtpVerificationEmail(email, res);
});

app.post("/verifyOTP/:otp", async (req, res) => {
  const otp_entered = parseInt(req.params.otp);
  const email = req.query.email;
  console.log("email in verifyOTP", email);
  console.log("frontend otp", otp_entered);
  console.log("backend otp", otp.otp);
  console.log("type of frontend otp", typeof (otp_entered));
  console.log("type of backend otp", typeof (otp.otp));
  try {

    const otpVerification = await otpModel.findOne({ otp: otp_entered });
    console.log("otpVerification", otpVerification);

    if (otpVerification === null) {
      //if it's null or incorrect
      res.json({ status: 'failure', message: 'OTP incorrect.Enter correct one' });
    }
    else {
      // use the otp variable which holds the OTP data
      if (otp_entered === otp.otp) {
        console.log("Otp verified successfully")
        res.json({ status: 'success', message: 'OTP verified successfullyyyyyyyyy' });
      }

      else if (otpVerification.expiresAt < Date.now()) {
        res.json({ status: 'failure', message: 'OTP expired' });
        await sendOtpVerificationEmail(email, res);
      }
    }
    console.log("otp given", otpVerification.expiresAt);
    console.log("type of otp given", typeof (otpVerification.expiresAt));

  } catch (error) {
    res.send(console.log("Internal server error",error))
  }
});

//listening to the server side port
app.listen(1900, () => {
  console.log("Listening on port 1900...");
})