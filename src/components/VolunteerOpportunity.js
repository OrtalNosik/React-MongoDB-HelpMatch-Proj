import React, { useState, useRef, useEffect } from 'react';
import '../style/PostShow.css';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import Likes from './Likes';
import Comments from './Comments';

function Post(props) {
  const [likes, setLikes] = useState(props.Likes);
  const [comments, setComments] = useState(props.comments);
  const [commentInput, setCommentInput] = useState('');
  const [hasLiked, setHasLiked] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [isVolunteer, setIsVolunteer] = useState(false);

  const textareaRef = useRef(null);

  useEffect(() => {
    adjustTextareaHeight();
    checkIfVolunteer(); // Check volunteer status on component mount
  }, [commentInput]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const checkIfVolunteer = async () => {
    const email = props.userEmail;
    const response = await fetch('http://localhost:3200/check-volunteer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const { isVolunteer } = await response.json();
    setIsVolunteer(isVolunteer);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (commentInput.trim() === '') {
      alert('Enter content to comment');
      return;
    }
    setComments([...comments, commentInput]);
    const email = props.userEmail;
    const postId = props.postId;
    const content = commentInput;
    setCommentInput('');
    const response = await fetch('http://localhost:3200/update-comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, postId, content }),
    });
    const { message } = await response.json();
    window.location.reload();
    return message;
  };

  const handleLike = async (e) => {
    e.preventDefault();
    const email = props.userEmail;
    const postId = props.postId;
    setHasLiked(!hasLiked);

    const response = await fetch('http://localhost:3200/update-like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, postId }),
    });

    const { message } = await response.json();
    return message;
  };

  const handleDelete = async () => {
    const postId = props.postId;
    const response = await fetch('http://localhost:3200/delete-post', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId }),
    });

    const { message } = await response.json();
    if (message === 'Post deleted successfully') {
      // Redirect or update state to reflect the post deletion
      window.location.reload();
    }
  };

  const handleShowComment = () => {
    setShowComment(!showComment);
  };

  const handleInputChange = (event) => {
    setCommentInput(event.target.value);
  };

  const handleShowLikes = () => {
    setShowLikes(!showLikes);
  };

  const defaultImage = 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg';

  return (
    <div className="post">
      <div className="post-header">
        <img src={props.authorImg || defaultImage} alt={props.author} />
        <div className="post-header-text">
          <h2>{props.author}</h2>
          <h3>בנושא: {props.theme}</h3>
          <h3 style={{ color: '#fff' }}>פורסם בתאריך: {props.date}</h3>
          <h3>
            {props.address ? `כתובת: ${props.address}` : 'כתובת לא זמינה'}
          </h3>
          <h3>
            {props.contentInfo ? `מידע נוסף: ${props.contentInfo}` : 'מידע נוסף לא זמין'}
          </h3>
        </div>
      </div>
      <div className="post-content">
        <h1>{props.content}</h1>
      </div>

      <div className="post-actions">
        <button onClick={handleLike}>
          {hasLiked ? <AiFillLike className="com" /> : <AiOutlineLike className="com" />}
        </button>
        <button onClick={handleShowComment}>
          <FaRegComment className="com" />
        </button>

        <br />
        <button onClick={handleShowLikes}> {likes} </button>
        {comments.length === 1 ? 'Comment' : 'Comments'}

        {isVolunteer && (
          <button className="delete-button" onClick={handleDelete}>
            Delete Post
          </button>
        )}
      </div>

      {showLikes && <Likes likes={likes} />}

      {showComment && (
        <div className="comments">
          <Comments comments={comments} />

          <div className="post-comments1">
            <textarea
              ref={textareaRef}
              type="text"
              placeholder="Add a comment..."
              value={commentInput}
              onChange={handleInputChange}
            />
            <button className="buttonA" onClick={handleComment}>
              הגב
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
