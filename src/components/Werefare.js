import React, { useState, useEffect } from 'react';
import '../style/Login.css';
import '../style/index.css';
function Werefare(props) {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://data.gov.il/api/3/action/datastore_search?resource_id=de069ddf-bcbc-4754-bda0-84873a353f7b&limit=100'
        );
        const result = await response.json();
        const records = result.result.records;
        setData(records);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredData = data.filter(
    (item) =>
      item.Name.includes(searchText) || item.Type_Descr.includes(searchText)
  );

  return (
    <div>
    <div class="container">

      <p style={{ fontWeight: 'bold', color: 'black' }}>חיפוש מתקדם</p>
      <p style={{ color: 'grey' }}>
        על מנת לסנן את המידע לפי שם רווחה רשמי או סוג טיפול, אנא הזן את המילים הרלוונטיות בתיבת החיפוש מטה.
      </p>
      

      <input type="text" value={searchText} onChange={handleSearch} />
      <p style={{ fontWeight: 'bold', color: 'black' }}>רשימה של הרווחות</p>
      {searchText !== '' && (
        <div style={{ marginTop: '10px', backgroundColor: 'lightgray', padding: '10px' }}>
          <p>{searchText}</p>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>שם רווחה</th>
            <th>סוג טיפול</th>
            <th>ראש המחלקה</th>
            <th>אוכלוסיית יעד</th>
            <th>תיאור בעלים</th>
            <th>ארגון</th>
            <th>רשויות</th>
            <th>ID רשות</th>
            <th>אזור</th>
            <th>תכולה</th>
            <th>תיאור מגדר</th>
            <th>סטטוס</th>
            <th>התחלה</th>
            <th>שם מנהל</th>
            <th>דת</th>
            <th>עיר</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item._id}>
              <td>{item.Name}</td>
              <td>{item.Type_Descr}</td>
              <td>{item.Head_Department}</td>
              <td>{item.Target_Population_Descr}</td>
              <td>{item.Second_Classific}</td>
              <td>{item.Organization}</td>
              <td>{item.Authoritys}</td>
              <td>{item.Authority_Id}</td>
              <td>{item.Region_Descr}</td>
              <td>{item.Actual_Capacity}</td>
              <td>{item.Gender_Descr}</td>
              <td>{item.Status_des}</td>
              <td>{item.STARTD}</td>
              <td>{item.Maneger_Name}</td>
              <td>{item.Religion}</td>
              <td>{item.City_Name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default Werefare;
