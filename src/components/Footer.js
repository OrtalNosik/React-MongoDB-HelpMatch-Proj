import React from 'react';
import '../style/Footer.css';
import '../style/index.css';
import { FiInfo, FiAlertTriangle, FiMail, FiBookOpen, FiStar } from 'react-icons/fi';


function Footer() {

  const handleSelectChange = (event) => {
    window.location.href =  event.target.value  ;
  }
  return (
    <div data-testid="footer">
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <h1>
              <select onChange={handleSelectChange}>
                <option value="" disabled selected hidden>מידע</option>
                <option value="/about-us">אודות </option>
                <option value="/tips">טיפים</option>
              </select>

              </h1> 
            </div>
            <div className="col-lg-3 col-md-6">
              <h1>
                צור קשר
                <FiMail className="category-icon" />
              </h1>
              <ul>
                <li>
                  <a href="mailto:volunteersAI@gmail.com">volunteersAI@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
