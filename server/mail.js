const nodemailer=require('nodemailer');

const CLIENT_ID="your client id"

const CLIENT_SECRET="Your Client Secret"

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
module.exports = { sendEmail };