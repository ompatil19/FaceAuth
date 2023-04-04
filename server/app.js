//import all our dependencies to be used
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { sendEmail } = require('./mail');
const userModel = require('./models/users');
const axios = require('axios');
const cors = require('cors');
mongoose.connect("mongodb+srv://ompatil2002:chocolate19@cluster0.n0qwari.mongodb.net/faceauth")
app.use(express.json());
app.use(cors());
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
  const user = req.body;
  const newUser = new userModel(user);
  await newUser.save();

  res.json(user);
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

//listening to the server side port
app.listen(1900, () => {
  console.log("Listening on port 1900...");
})