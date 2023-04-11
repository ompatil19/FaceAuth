import React, { useState, useEffect } from 'react'
import Axios from "axios";
import '../App.css';
import './SignIn.css'
import faceIO from "@faceio/fiojs"
const faceio = new faceIO("fioab1bd");

export default function Signin() {

    //defining all the hooks going to be used
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submission, setSubmission] = useState(false);
    useEffect(() => { console.log("Tried changing submission") }, [submission]);
    const createnewuser = (event) => {
        checkuser(email)
            .then((result) => {
                console.log('Result:', result);
                if (result) {
                    console.log('User is new');
                    // Do something if user is new
                    if (isValidEmail(email)) {
                        Axios.post("http://localhost:1900/createUser", {
                            name,
                            email,
                            password
                        })
                        console.log(name, email, password);
                        setSubmission(true);
                    }
                } else {
                    console.log('User already exists');
                    // Do something if user already exists
                    event.preventDefault();
                }
            })
    };
    const changename = (event) => {
        setName(event.target.value);

    }
    const changemail = (event) => {
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
        console.log("correct email");
        return true;
    }

    const changepass = (event) => {
        setPassword(event.target.value);

    }
    // const isValidPassword=(pass) =>{
    //     console.log("Password is correct")
    // }
    const newuser = () => {
        faceio.enroll({
            "locale": "auto", // Default user locale
            "payload": {
                /* The payload we want to associate with this user
                * which is forwarded back to us upon future
                * authentication of this particular user.*/
                "name": name, // Example of dummy ID linked to this particular user
                "email": email
            }
        }).then(userInfo => {
            // User Successfully Enrolled!
            alert(
                `User Successfully Enrolled! Details:
          Unique Facial ID: ${userInfo.facialId}
          Enrollment Date: ${userInfo.timestamp}
          Gender: ${userInfo.details.gender}
          Age Approximation: ${userInfo.details.age}`
            );
            console.log(userInfo);
            console.log(JSON.stringify(userInfo.payload));
            // handle success, save the facial ID, redirect to dashboard...
        }).catch(errCode => {
            // handle enrollment failure. Visit:
            // https://faceio.net/integration-guide#error-codes
            // for the list of all possible error codes
        })
    }
    let checkuser = (e) => {
        if (e) {
            return Axios.get(`http://localhost:1900/getUsers/${e}`)
                .then((response) => {
                    const data = response.data;
                    if (data.exists) {
                        console.log("User already");
                        console.log(data.exists);
                        // a=false;
                        return false;
                    } else {
                        console.log("New user");
                        return true;
                    }
                })
                .catch((err) => {
                    console.error(err);
                    return false;
                });
        }
        return false;
    };

    return (
        <>

          <div className="container">
          <img src="images/signup.png" alt="" />
                <div className="form">
                    <>
                <i class="fa-solid fa-user"></i>
                    <h3>Sign Up</h3>
                    <p>Sign up easily with FaceAuth for secure and convenient facial recognition sign-in.</p>
                    <form>
                        <input type="text" placeholder='Enter your name: ' onChange={changename} />
                        <input type="text" placeholder='Enter your password: ' onChange={changepass} />
                        <input type="text" placeholder='Enter your email: ' onChange={changemail} />
                        <input type="button" value="Submit" onClick={createnewuser} id='btn'/>

                    </form>
                        {/* {submission &&<input type="button" value="Enroll" onClick={newuser} id='btn'/>} */}
                    {/* {submission && <button onClick={newuser} id="btn">Enroll new user</button>} */}
                    </>
                </div>

                

            </div>
        </>
    );
}