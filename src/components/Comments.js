import React from 'react';
import '../App.css';
import '../style/Comments.css'; // Assuming the CSS file is named Comments.css

function Comments(props) {
  const { comments } = props;

  return (
    <div className="comments-container">
      {comments.map((comment) => (
        <div className="comment-item" key={comment[0]}>
          <img src={comment[2]} alt={comment[1]} className="user-avatar" />
          <div className="comment-content">
            <span className="user-name">{comment[1]}</span>
            <p className="comment-text">{comment[3]}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comments;
