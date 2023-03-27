const nodemailer=require('nodemailer');

const CLIENT_ID="721450903964-q5i35gpj580jre4pib5csrbct9oej131.apps.googleusercontent.com"

const CLIENT_SECRET="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"

async function sendEmail(e){
    try{
        const transport=nodemailer.createTransport({
            service:"gmail",
            auth:{
                type:"OAuth2",
                user:"ompatil2002@gmail.com",
                clientid: CLIENT_ID,
                clientsecret: CLIENT_SECRET,
                accessToken:"ya29.a0Ael9sCN3tqp7TUa-_Gm-y7zsPIiUQUZ_SvLK4QkRcons0dzy5jZH53-ca-DpS0LWzszPTjDRWmo7zXbyyqUM_B1wBUnuN4c6iyw546GKfHLyEbHCd7bwJ1JW8pGLBvJ47dNaci0zkMIFTQDAJUIwyaWmCcSfJiEaCgYKAZMSARMSFQF4udJhIVIuamoMbSkm5z-Lvua4qg0166"
            }
        });
        const mailOptions={
            from:"ompatil2002@gmail.com",
            to:e,
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
module.exports = { sendEmail };
// sendEmail()
// .then((result)=>{
//     console.log("Email was sent successfully"+ result );
// })
// .catch((error)=>{
//     console.log("Error occured"+error.m)
// })