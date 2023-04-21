import React, { useState, useEffect } from 'react'
import Axios from "axios";
import '../App.css';
import './SignIn.css'
import faceIO from "@faceio/fiojs"
const faceio = new faceIO("fioab1bd");
import { GoogleLogin } from "react-google-login";

const clientid = "879621168598-5k9okqkbnttkclniq1vh6gplie53notl.apps.googleusercontent.com";

export default function Signin() {

    //defining all the hooks going to be used
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submission, setSubmission] = useState(false);
    const [checkOtp, setcheckOtp] = useState("");

    useEffect(() => { console.log("Tried changing submission") }, [submission]);

    const changename = (event) => {
        setName(event.target.value);
    }
    const changemail = (event) => {
        setEmail(event.target.value);
    }
    const changeotp = (event) => {
        setcheckOtp(event.target.value);
    }
    const changepass = (event) => {
        setPassword(event.target.value);
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

    const newuser = () => {
        console.log("enter new user function");
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
            console.log("error");
            // handle enrollment failure. Visit:
            // https://faceio.net/integration-guide#error-codes
            // for the list of all possible error codes
        })
        console.log("Exited new user function");
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

    const createnewuser = async () => {
        try {
            if (checkOtp === "") {
                setcheckOtp("0");
            }
            //console.log(checkOtp);
            console.log(`http://localhost:1900/verifyOTP/${checkOtp}?email=${email}`)
            const response = await Axios.post(`http://localhost:1900/verifyOTP/${checkOtp}?email=${email}`);
            console.log("Response from verifyOTP API:", response.data);
            if (response.data.status === 'success') {
                await Axios.post("http://localhost:1900/createUser", {
                    name,
                    email,
                    password
                })
                console.log("submission before is ", submission);
                setSubmission(true);
                console.log("submission after is ", submission);
            }
        }
        catch (error) {
            console.log("ayyoo" + error);
        }
    };

    const onSuccess = async (res) => {
        console.log("Google Login success user:", res.profileObj);
        const google = res.profileObj;
        let name = google.name;
        let email = google.email;
        console.log(name);
        console.log(email);
        setEmail(email);
        setName(name);
        await Axios.post(`http://localhost:1900/sendveriemail/${email}`);

    };

    const onFailure = (res) => {
        console.log("Google Login failed ", res);
    };

    const sendveriotp = (email) => {
        let result;
        console.log("email in sendveriotp:", email);

        checkuser(email)
            .then((response) => {
                result = response;
                console.log('Result:', result);

                if (result) {
                    console.log('User is new');

                    if (isValidEmail(email)) {

                        Axios.post(`http://localhost:1900/sendveriemail/${email}`);
                    }
                } else {
                    console.log('User already exists');
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }
    const handleSubmit2 = (event) => {
        event.preventDefault();
        console.log("submit clicked");
        createnewuser();
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("submit clicked");
        sendveriotp(email);
    }

    return (
        <>

            <div className="container">
                <img src="images/signup.png" alt="" />
                <div className="form">
                    <>
                        <i class="fa-solid fa-user"></i>
                        <h3>Sign Up</h3>
                        <p>Sign up easily with FaceAuth for secure and convenient facial recognition sign-in.</p>
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder='Enter your name: ' onChange={changename} />
                            <input type="text" placeholder='Enter your password: ' onChange={changepass} />
                            <input type="text" placeholder='Enter your email: ' onChange={changemail} />
                            <input type="button" value="Submit" id='btn' />

                        </form>
                        <div id="signInGoogle">
                            <GoogleLogin
                                clientId={clientid}
                                buttonText="SignIn with Google"
                                onSuccess={onSuccess}
                                onFailure={onFailure}
                                cookiePolicy={'single_host_origin'}
                            // isSignedIn={true}
                            >
                            </GoogleLogin>
                        </div>
                        {/* enter otp and verify otp on clicking button */}
                        <form onSubmit={handleSubmit2}>
                            <input type="text" placeholder='otp' onChange={changeotp}></input>
                            <input type="submit" value="Submit"></input>
                            {/* {submission && <button onClick={newuser} id="btn">Enroll new user</button>} */}
                        </form>
                        {submission && <input type="button" value="Enroll" onClick={newuser} id="btn" />}
                    </>
                </div>
            </div>
        </>
    );
}