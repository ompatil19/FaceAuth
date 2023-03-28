import React from 'react'
import Axios from "axios";
import faceIO from "@faceio/fiojs"
const faceio = new faceIO("fioab1bd");
export default function Login() {

  const authenticateuser = () => {
    faceio.authenticate({
      "locale": "auto" // Default user locale
    }).then(userData => {
      console.log("Success, user identified")
      const now = new Date();
      Axios.get(`http://localhost:1900/sendmail/${userData.payload.email}?name=${userData.payload.name}&timestamp=${now}`);
      Axios.get(`http://localhost:1900/database/?name=${userData.payload.name}&email=${userData.payload.email}&timestamp=${now}`);
      console.log("Linked facial Id: " + userData.facialId)
      console.log("Payload: " + JSON.stringify(userData.payload))
    }).catch(errCode => {
    })
  }

  return (
    <>
      <div>login</div>
      <button onClick={authenticateuser}>Authenticate</button>
    </>
  )
}
