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
                accessToken:"ya29.a0Ael9sCPMU6gXjKPV6IXJLPY_d8ZL4PuMeBY4osMX76MY0EujB0C71RQsKKpqt3k88L4BCVIJ4QOSzKv2jlTTriQjmVe8VYn3QHit-CunGb0KR1yCnfNSVdYzstlzec7nRVWtL2sbe3Ri1goqHBKcy5C-d1-72rYaCgYKAe0SARMSFQF4udJhFqQvH_xk_APkUl2ssAsmug0166"
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