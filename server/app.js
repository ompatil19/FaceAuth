const express = require('express');
const app=express();
const mongoose=require('mongoose');
const userModel = require('./models/users');
mongoose.connect("mongodb+srv://ompatil2002:chocolate19@cluster0.n0qwari.mongodb.net/faceauth")
app.use(express.json());
app.get('/getUsers', async (req, res) => {
    try {
      const result = await userModel.find({});
      res.json(result);
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


app.listen(1900,()=>{
    console.log("Listening on port 1900...");
})