import React, { useState,useEffect } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


import Login from './components/Login'
import SignUp from './components/SignUp'
import SignUpVall from './components/SignUpVall'
import AboutUs from './components/AboutUs'
import Main from './components/Main'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Tips from './components/Tips'
import Associations from './components/Associations'
import AdminPrivate from './components/AdminPrivate'
import Emergency from './components/Emergency'
import Lawyer from './components/Lawyer'
import Werefare from './components/Werefare'

function App() { 

  const [stateData, setStateData] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3200/getUser")
      .then(response => response.json())
      .then(data => setStateData(data.message))
      .catch(error => console.error(error));
  }, []);

  
  return (
    <Router>
      < div >
        <div >
          <div>
            <NavBar />
            <Routes>
              <Route path="/" element={<Main isLoggedIn = {stateData.signedIn} img ={stateData.img} name ={stateData.name} email = {stateData.email}/>} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp/>} />
              <Route path="/sign-up-vall" element={<SignUpVall />} />
              <Route path="/about-us" element={<AboutUs/>} />
              <Route path="/tips" element={<Tips/>} />
              <Route path="/Associations" element={<Associations likes ={4} />} />
              <Route path="/AdminPrivate" element={<AdminPrivate />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/Lawyer" element={<Lawyer />} />
              <Route path="/Werefare" element={<Werefare />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App;
