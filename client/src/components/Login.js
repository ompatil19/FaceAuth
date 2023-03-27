import React from 'react'
import faceIO from "@faceio/fiojs"
const faceio = new faceIO("fioab1bd");
export default function Login() {
  
  const authenticateuser =()=>{
    faceio.authenticate({
      "locale": "auto" // Default user locale
  }).then(userData => {
      console.log("Success, user identified")
      // Grab the facial ID linked to this particular user which will be same
      // for each of his successful future authentication. FACEIO recommend 
      // that your rely on this Facial ID if you plan to uniquely identify 
      // all enrolled users on your backend for example.
      console.log("Linked facial Id: " + userData.facialId)
      // Grab the arbitrary data you have already linked (if any) to this particular user
      // during his enrollment via the payload parameter of the enroll() method.
      console.log("Payload: " + JSON.stringify(userData.payload)) 
      // {"whoami": 123456, "email": "john.doe@example.com"} set via enroll()
  }).catch(errCode => {
      // handle authentication failure. Visit:
      // https://faceio.net/integration-guide#error-codes
      // for the list of all possible error codes
  })
}
  
  return (
    <>
    <div>login</div>
    <button onClick={authenticateuser}>Authenticate</button>
    </>
  )
}
