const nodemailer=require('nodemailer');
const { google } = require('googleapis');
const otpModel = require('./models/otp');
require('dotenv').config();
const { gmail } = require('googleapis/build/src/apis/gmail');

const CLIENT_ID=process.env.CLIENT_ID;
const CLIENT_SECRET=process.env.CLIENT_SECRET;
const REDIRECT_URL = "https://developers.google.com/oauthplayground"
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })
let otp = Math.floor(100000 + Math.random() * 900000);

async function sendEmail(e,time){
    try{
        const accessToken = await oAuth2Client.getAccessToken();
        const transport=nodemailer.createTransport({
            service:"gmail",
            auth:{
                type:"OAuth2",
                user:process.env.USER,
                clientid: CLIENT_ID,
                clientsecret: CLIENT_SECRET,
                //Have to keep updating access token every one hour
                accessToken:accessToken
            }
        });
        const mailOptions={
            from:process.env.USER,
            to:e,
            subject:"Authentication Email",
            text: "hello",
            html:`<h4> Hello! ${time.name} you have authenticated successfully at ${time.timestamp}</h4>`,
        }
        const result=await transport.sendMail(mailOptions);

        return result;
    }catch(error){
        return error;
    }
}


async function sendOtpVerificationEmail(email, res) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.USER,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });
        const newOtpVerification = new otpModel({
            //otp:await bcrypt.hash(otp, 10),
            otp:otp,
            createdAt: Date.now(),
            expiresAt: Date.now() + 900000,
        });
        await newOtpVerification.save();

        console.log("EMAIL", email);
        const options = {
            from: process.env.USER,
            to: email,
            subject: "Verify your Email",
            html: `<h1> Your FaceAuth Member Profile code</h1> <br> <h4> Here's the one-time verification code you requested: <h2> ${otp} </h2>This code expires after 15 minutes. If you've already received this code or don't need it any more, ignore this email. </h4>`
        }
        await transporter.sendMail(options).catch(err => console.log(err));       
        res.send(console.log("HURRAY otp mail sent successfully"))
    } catch (error) {
      
        // res.send(console.log("BOOO otp mail sent failed"))
        res.send(console.log("error while sending otp is", error));
    }
}

module.exports = { sendEmail, sendOtpVerificationEmail, otp };

