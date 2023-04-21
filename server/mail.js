const nodemailer=require('nodemailer');
const { google } = require('googleapis');
const otpModel = require('./models/otp');

const CLIENT_ID="your client id"

const CLIENT_SECRET="Your Client Secret"

const CLIENT_ID_2 = "879621168598-5k9okqkbnttkclniq1vh6gplie53notl.apps.googleusercontent.com"

const CLIENT_SECRET_2 = "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"

const REDIRECT_URL = "https://developers.google.com/oauthplayground"

const REFRESH_TOKEN = "1//04jWhs0l8oihgCgYIARAAGAQSNwF-L9IrUjVRj-UrbfhjUYLFMhkrbKAzP63M7zJS3DoU4R-u3dTyovhex6tN0EMxTtEukFgHAD8"

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID_2, CLIENT_SECRET_2, REDIRECT_URL)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })
let otp = Math.floor(1000 + Math.random() * 9000);

async function sendEmail(e,time){
    try{
        const transport=nodemailer.createTransport({
            service:"gmail",
            auth:{
                type:"OAuth2",
                user:"sender email",
                clientid: CLIENT_ID,
                clientsecret: CLIENT_SECRET,
                //Have to keep updating access token every one hour
                accessToken:"your access token",
            }
        });
        const mailOptions={
            from:"sender email",
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
                user: "prakruthimadhav@gmail.com",
                clientId: CLIENT_ID_2,
                clientSecret: CLIENT_SECRET_2,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });
        
        const newOtpVerification = await new otpModel({
            //otp:await bcrypt.hash(otp, 10),
            otp:otp,
            createdAt: Date.now(),
            expiresAt: Date.now() + 360000,
        });
        await newOtpVerification.save();

        console.log("EMAIL", email);
        const options = {
            from: "prakruthimadhav@gmail.com",
            to: email,
            subject: "Verify your Email",
            html: `<h4> Enter! ${otp} to verify</h4>`
        }
        await transporter.sendMail(options).catch(err => console.log(err));       
        res.send(console.log("HURRAY otp mail sent successfully"))
    } catch (error) {
      
        res.send(console.log("BOOO otp mail sent failed"))
    }
}

module.exports = { sendEmail, sendOtpVerificationEmail, otp };

