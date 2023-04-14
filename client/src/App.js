import React from 'react';
import './App.css';
import Home from './Components/pages/Home';
import Navbar from './Components/Navbar';
import About from './Components/pages/About'
import SignIn from './Components/SignIn'
import LogIn from './Components/LogIn';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact Component={Home} />
          <Route path='/about' exact Component={About} />
          <Route path='/sign-up' exact Component={SignIn}/>
          <Route path='/login' exact Component={LogIn}></Route>
        </Routes>
      </Router>

    </>

  );
}

export default App;
