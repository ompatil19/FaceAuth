// import React from 'react'
// import '../Components/LogIn.css'

// function LogIn() {
//   return (
//     <div>
//       <button className='login' >Authenticate</button>
//     </div>
//   )
// }

// export default LogIn


import React from 'react'
import Axios from "axios";
import '../Components/LogIn.css'
import faceIO from "@faceio/fiojs"
const faceio = new faceIO("fioa5c19");
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

      <div className="container">
        <div className="left">
          <h1>FaceAuth</h1>
          <h6>Verify instantly with FaceAuth Authentication.</h6>
          {/* <button onClick={authenticateuser} className='login'>Authenticate</button> */}
          <button id="button" onClick={authenticateuser} className='login'>Authenticate User</button>
        </div>



        <div className="right">
          <img src="images/login.png" alt="" />
        </div>
      </div>




    </>
  )
}