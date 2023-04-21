import React from 'react';
import './App.css';
import Home from './Components/pages/Home';
import Navbar from './Components/Navbar';
import About from './Components/pages/About'
import SignIn from './Components/SignIn'
import LogIn from './Components/LogIn';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';

const clientid =process.env.REACT_APP_CLIENT_ID;

const App = () => {

  useEffect(() => {
    function start() {
      gapi.load('client:auth2', () => {
        gapi.client.init({
          clientId: clientid,
          scope: ''
        }).then(() => {
          const authInstance = gapi.auth2.getAuthInstance();
          authInstance.signOut().then(() => {
            console.log('User signed out');
          }).catch((err) => {
            console.error(err);
          });
        });
      });
    };
    start();
  }, [clientid]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact Component={Home} />
          <Route path='/about' exact Component={About} />
          <Route path='/sign-up' exact Component={SignIn} />
          <Route path='/login' exact Component={LogIn}></Route>
        </Routes>
      </Router>

    </>

  );
}

export default App;
