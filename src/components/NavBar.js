import React, { useState, useEffect } from 'react';
import '../style/NavBar.css';
import '../style/index.css';
import { FaHome, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaSignLanguage, FaPeopleArrows } from 'react-icons/fa';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { GrEmergency } from 'react-icons/gr';
import { useHistory } from 'react-router-dom';

function handleLogout() {
  fetch('http://localhost:3200/sign-out', {
    method: 'POST',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log(data.message); // should print "Logout successful"
      window.location.reload();
    })
    .catch(error => {
      console.error(error);
      // handle any errors
    });
}

function NavBar(props) {
  const [SelectedOption, setSelectedOption] = useState("");
  const [stateData, setStateData] = useState(false);
  const [adminData, setAdminData] = useState(false);
  const [volunteerData, setVolunteerData] = useState(false);

  const handleSelectChange = (event) => {
    window.location.href = event.target.value;
  };

  useEffect(() => {
    fetch("http://localhost:3200/getState")
      .then(response => response.json())
      .then(data => setStateData(data.message))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3200/getAdmin")
      .then(response => response.json())
      .then(data => setAdminData(data.message))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3200/getVall")
      .then(response => response.json())
      .then(data => setVolunteerData(data.message))
      .catch(error => console.error(error));
  }, []);

  return (
    <div data-testid="navbar">
      <div className="navbar">
        <a href="/"><FaHome className="category-icon" /><span style={{ fontWeight: 'bold', fontSize: '30px' }}>HelpMatch</span></a>
        <div className="category-dropdown">
          <MdOutlineManageAccounts className="category-icon" />
          <select value={SelectedOption} style={{ fontWeight: 'bold', fontSize: '30px' }} onChange={handleSelectChange}>
            <option value="">אנשי מקצוע</option>
            <option value="/Lawyer">-----עורכי דין-----</option>
            <option value="/Werefare">-----רווחה------</option>
          </select>
        </div>
        <a href="/emergency" style={{ fontWeight: 'bold', fontSize: '30px' }}><GrEmergency className="category-icon" />מוקדי חירום </a>
        <div className='right'>
          {stateData ? (
            <>
              {adminData ? (
                <>
                  <a href="/"><span>שלום מנהל</span></a>
                  <a href="/AdminPrivate"><FaPeopleArrows className="category-icon" /> <span style={{ fontWeight: 'bold', fontSize: '30px' }}>אזור אישי</span></a>
                </>
              ) : volunteerData ? (
                <>
                  <a href="/"><span>שלום מתנדב</span></a>
                  <a href="/"><FaPeopleArrows className="category-icon" /> <span style={{ fontWeight: 'bold', fontSize: '30px' }}>אזור אישי</span></a>
                </>
              ) : (
                <>
                  <a href="/"><span>שלום משתמש</span></a>
                  <a href="/"><FaPeopleArrows className="category-icon" /> <span style={{ fontWeight: 'bold', fontSize: '30px' }}>אזור אישי</span></a>
                </>
              )}
              <a href="/" onClick={handleLogout}><FaSignOutAlt className="category-icon" /> <span style={{ fontWeight: 'bold', fontSize: '30px' }}>התנתק</span></a>
              <a href="/Associations"><FaSignLanguage className="category-icon" /> <span style={{ fontWeight: 'bold', fontSize: '30px' }}>עמותות</span></a>
            </>
          ) : (
            <>
              <a href="/sign-in"><FaSignInAlt className="category-icon" /> <span style={{ fontWeight: 'bold', fontSize: '30px' }}> התחברות</span></a>
              <a href="/sign-up"><FaUserPlus className="category-icon" /> <span style={{ fontWeight: 'bold', fontSize: '30px' }}>הרשמה</span></a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
