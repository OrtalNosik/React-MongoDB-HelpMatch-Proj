import React from 'react';
import '../style/Likes.css'; // Assuming the CSS file is named Likes.css


function Likes(props) {
  const { likes } = props;

  return (
    <div className="likes-container">
      {likes.map((like) => (
        <div className="like-item" key={like[0]}>
          <img src={like[2]} alt={like[1]} />
          <span>{like[1]}</span>
        </div>
      ))}
    </div>
  );
}

export default Likes;
