import React,{useState} from 'react'
import Axios from "axios";
export default function Signin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const createnewuser = (event) => {
    if (isValidEmail(email) && checkuser(email)) {
      // Axios.post("http://localhost:1900/createUser", {
      //   name,
      //   email,
      //   password
      // })
  console.log(name, email, password);
  }
  else{
    event.preventDefault();
  }
};
const changename=(event)=>{
  setName(event.target.value);
  
}
const changemail=(event)=>{
  setEmail(event.target.value);
}

const isValidEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  if (!regex.test(email)) {
    console.log('Invalid email format');
    return false;
  }
  if (!email.includes('@gmail.com')) {
    console.log('Email domain must be @gmail.com');
    return false;
  }
  return true;
}

const changepass=(event)=>{
  setPassword(event.target.value);

}
// const isValidPassword=(pass) =>{
//     console.log("Password is correct")
// }
const checkuser=(e)=>{
    if(e){
    Axios.get(`http://localhost:1900/getUsers/${e}`).then((response)=>{
    const data = response.data;
    if(data.exists){
        console.log("User already");
        return false;
    }
    else{
        return true;
    }
})}

}
  return (
    <>
    <div className="container">      
    <div id="faceio-modal"> </div>
    <form onSubmit={createnewuser}>
      <input type="text" placeholder='name' onChange={changename} />
      <input type="text" placeholder='password' onChange={changepass}/>
      <input type="text" placeholder='email' onChange={changemail}/>
      <input type="submit" value="submit"/>
    </form>
    {/* <button onClick={Newuser}> Enroll new user</button>
    <button onClick={authenticateuser}> Authenticate</button> */}
    {/* <button onClick={checkuser(email)}>Check</button> */}
    </div>
    <script src="https://cdn.faceio.net/fio.js"></script>
    </>
  );
}
