// const nodemailer=require('nodemailer');
import nodemailer from 'nodemailer';
const CLIENT_ID="721450903964-q5i35gpj580jre4pib5csrbct9oej131.apps.googleusercontent.com"

const CLIENT_SECRET="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"

async function sendEmail(){
    try{
        const transport=nodemailer.createTransport({
            service:"gmail",
            auth:{
                type:"OAuth2",
                user:"ompatil2002@gmail.com",
                clientid: CLIENT_ID,
                clientsecret: CLIENT_SECRET,
                accessToken:"ya29.a0Ael9sCMpd6FqhhAEbXp-9TyRSBM6f_bkWh8Oui1ooUWvnMkHwWuMVmPlYB9guSx7Aa8V31inE8N6Xp9gRJU21aVo2wq-gyfbHJwertthZashOsbbSgnY-1e9zvhUhzdbasv8-wCE7sDttRMQoGGeX5gXDsDwaCgYKAbkSARMSFQF4udJhjFCgCOTKN97BszWpyE4lBg0163"
            }
        });
        const mailOptions={
            from:"ompatil2002@gmail.com",
            to:"prakruthimadhav@gmail.com",
            subject:"this is a test email",
            text:"This is a test email",
            html:"<h1> Hello from Prakruthimadhav </h1>"
        }
        const result=await transport.sendMail(mailOptions);

        return result;
    }catch(error){
        return error;
    }
}
// exports.sendEmail = mail;

// .then((result)=>{
//     console.log("Email was sent successfully"+ result );
// })
// .catch((error)=>{
//     console.log("Error occured"+error.m)
// })