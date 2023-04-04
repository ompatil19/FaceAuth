const nodemailer=require('nodemailer');

const CLIENT_ID="721450903964-q5i35gpj580jre4pib5csrbct9oej131.apps.googleusercontent.com"

const CLIENT_SECRET="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"

async function sendEmail(e,time){
    try{
        const transport=nodemailer.createTransport({
            service:"gmail",
            auth:{
                type:"OAuth2",
                user:"ompatil2002@gmail.com",
                clientid: CLIENT_ID,
                clientsecret: CLIENT_SECRET,
                //Have to keep updating access token every one hour
                accessToken:"ya29.a0Ael9sCOMI8uxgsJTfwZ2Jd8npuwzk7e4p4RANWE0I5dFAnmd8w0b5QhqtJpcp4hBDCluMhJsFKYBF51bkeGvArmymYzLYabNdgta7x4qFhpiv6ikaTsUP4ekb5yOKMBE4V6Kxr86-KA4gyXUXMDuxoC981ZXY2QaCgYKAfISARMSFQF4udJhFtspBhWvUVBaGek5Kw9zWQ0166"
            }
        });
        const mailOptions={
            from:"ompatil2002@gmail.com",
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
// sendEmail()
// .then((result)=>{
//     console.log("Email was sent successfully"+ result );
// })
// .catch((error)=>{
//     console.log("Error occured"+error.m)
// })