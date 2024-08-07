import React from 'react';
import '../App.css';
import '../style/Comments.css'; // Assuming the CSS file is named Comments.css
import '../style/index.css';
function Comments(props) {
  const { comments } = props;
  const defaultImage = 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg';

  return (
    <div className="comments-container">
      {comments.map((comment, index) => {
        const userProfileImage = defaultImage; // Use defaultImage if comment[2] is not provided

        // Debugging: Check what `comment[2]` contains
        console.log('User profile image:', userProfileImage);

        return (
          <div className="comment-item" key={comment[0] || index}>
            <img
              src={userProfileImage}  // Use defaultImage if comment[2] is not provided
              alt={comment[1]}
              className="user-avatar"
            />
            <div className="comment-content">
              <span className="user-name">{comment[1]}</span>
              <p className="comment-text">{comment[3]}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Comments;
