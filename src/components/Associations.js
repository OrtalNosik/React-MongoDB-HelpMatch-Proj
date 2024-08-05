import React, { useState, useEffect } from 'react';
import { GrLike } from 'react-icons/gr';

function Associations(props) {
  const [associations, setAssociations] = useState([]);
  
  // Fetch data and initialize state for each post’s likes and hasLiked
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://data.gov.il/api/3/action/datastore_search?q=&resource_id=be5b7935-3922-45d4-9638-08871b17ec95&limit=120'
        );
        const data = await response.json();
        const records = data.result.records;
        const initialLikesState = records.reduce((acc, curr) => {
          acc[curr._id] = { likes: 0, hasLiked: false };
          return acc;
        }, {});
        setAssociations(records.map(record => ({ ...record, ...initialLikesState[record._id] })));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleLike = (id) => {
    setAssociations(prevState =>
      prevState.map(association =>
        association._id === id
          ? {
              ...association,
              likes: association.hasLiked ? association.likes - 1 : association.likes + 1,
              hasLiked: !association.hasLiked
            }
          : association
      )
    );
  };

  return (
    <div style={{ backgroundColor: '#F1F1F1', padding: '20px' }}>
      <div className="post-header-text">
        <h3 style={{ fontWeight: 'bold', fontSize: '30px', textAlign: 'center', color: '#F43169' }}>
          עמותות
        </h3>
      </div>
      {associations && associations.length > 0 && associations.reduce((acc, curr, i) => {
        if (i % 4 === 0) {
          acc.push([]);
        }
        acc[acc.length - 1].push(curr);
        return acc;
      }, []).map((row, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px'
          }}
        >
          {row.map((association) => (
            <div
              className="post-content"
              key={association._id}
              style={{
                width: '23%',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#C8A2C8',
                margin: '10px' // Space between blocks
              }}
            >
              <p style={{ fontWeight: 'bold', color: '#F43169' }}>שם עמותה:</p>
              <p>{association['שם עמותה בעברית']}</p>

              <p style={{ fontWeight: 'bold', color: '#F43169' }}>תאריך רישום עמותה:</p>
              <p>{association['תאריך רישום עמותה']}</p>

              <p style={{ fontWeight: 'bold', color: '#F43169' }}>מספר עמותה:</p>
              <p>{association['מספר עמותה']}</p>

              <p style={{ fontWeight: 'bold', color: '#F43169' }}>כתובת - רחוב:</p>
              <p>{association['כתובת - רחוב']}</p>

              <div className="post-actions">
                <button
                  onClick={() => handleLike(association._id)}
                  style={{
                    backgroundColor: association.hasLiked ? '#FF7F9E' : '#F43169',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#FF7F9E'}
                  onMouseOut={(e) => e.target.style.backgroundColor = association.hasLiked ? '#FF7F9E' : '#F43169'}
                >
                  <GrLike className="category-icon" />
                  {association.likes} {' Like'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Associations;
