import React, { useState, useEffect } from 'react';
import '../style/Login.css';
import '../style/index.css';
function Lawyer(props) {
  const [lawyers, setLawyers] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://data.gov.il/api/3/action/datastore_search?resource_id=3b1dc8ce-e676-4e1c-bae6-a5604cbec188&limit=100&offset=200'
        );
        const data = await response.json();
        const filteredLawyers = data.result.records.filter(
          (lawyer) => lawyer['התמחות'] !== '' && lawyer['התמחות'] !== null
        );
        setLawyers(filteredLawyers);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredLawyers = lawyers.filter((lawyer) =>
    lawyer['התמחות'].includes(searchText)
  );

  return (
    <div> <div class="container">
      <p style={{ fontWeight: 'bold', color: 'black' }}>חיפוש מתקדם</p>
      <p style={{ color: 'grey' }}>
        על מנת לסנן את המידע לפי התמחות עורך הדין רשמי את ההתמחות הרצויה בתיבה מטה
      </p>

      <input
        type="text"
        value={searchText}
        onChange={handleSearch}
        style={{ border: '2px solid black', borderRadius: '4px' }}
      />
         

      <p style={{ fontWeight: 'bold', color: 'black' }}>רשימה של עורכי הדין</p>
      <table>
        <thead>
          <tr>
            <th>התמחות</th>
            <th>מומחיות מיוחדת</th>
            <th>סטטוס</th>
          </tr>
        </thead>
        <tbody>
          {filteredLawyers.map((lawyer) => (
            <tr key={lawyer._id}>
              <td>{lawyer['התמחות']}</td>
              <td>{lawyer['מומחיות מיוחדת']}</td>
              <td>{lawyer['סטטוס']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default Lawyer;
