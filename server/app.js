const express = require('express');
const app=express();
const mongoose=require('mongoose');
const { sendEmail } = require('./mail');
const userModel = require('./models/users');
// const querystring = require('querystring');
// const queryString = querystring.stringify(data);
const cors=require('cors');
mongoose.connect("mongodb+srv://ompatil2002:chocolate19@cluster0.n0qwari.mongodb.net/faceauth")
app.use(express.json());
app.use(cors());
app.get('/getUsers', async (req, res) => {
    try {
      const result = await userModel.find({});
      res.json(result);
    } catch (err) {
      res.json(err);
    }
  });
app.get(`/getUsers/:email`, async (req, res) => {
    try {
        const email = req.params.email;
        const result = await userModel.findOne({ email });
        res.json({ exists: !!result });
      } catch (err) {
        res.json(err);
      }
  });
  
  app.post("/createUser", async (req, res) => {
    const user = req.body;
    const newUser = new userModel(user);
    await newUser.save();
  
    res.json(user);
  });

  app.get(`/sendmail/:email`, async (req, res) => {
    const email = req.params.email;
    const timestamp=req.query; //timestamp is a json object retrieved from queries in url
    console.log(timestamp);
    await sendEmail(email,timestamp)
    res.send(console.log("GG mail sent successfully"))
  })
  app.get(`/database`, async (req, res) => {
    const sheet_data=req.query; //timestamp is a json object
    let data1=JSON.parse(sheet_data.data);
    console.log(data1.name);
    console.log(data1.email);
    res.send(console.log("GG added to database successfully"))
  })

app.listen(1900,()=>{
    console.log("Listening on port 1900...");
})