import React, { useState, useRef, useEffect } from 'react';
import '../style/PostShow.css';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import Likes from './Likes';
import Comments from './Comments';
//import '../style/index.css';

function Post(props) {
  const [likes, setLikes] = useState(props.Likes);
  const [comments, setComments] = useState(props.comments || []);
  const [commentInput, setCommentInput] = useState('');
  const [hasLiked, setHasLiked] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [volunteerData, setVolunteerData] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3200/getVall")
      .then(response => response.json())
      .then(data => setVolunteerData(data.message))
      .catch(error => console.error(error));
  }, []);

  const textareaRef = useRef(null);

  useEffect(() => {
    adjustTextareaHeight();
  }, [commentInput]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (commentInput.trim() === '') {
      alert('Enter content to comment');
      return;
    }

    const newComment = [Date.now(), props.userEmail, 'user-avatar-url', commentInput]; // Adjust as per your data structure
    setComments([...comments, newComment]);
    setCommentInput('');

    const email = props.userEmail;
    const postId = props.postId;
    const content = commentInput;

    try {
      const response = await fetch('http://localhost:3200/update-comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, postId, content }),
      });

      const { message } = await response.json();
      if (message) {
        console.log(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async (e) => {
    e.preventDefault();
    setHasLiked(!hasLiked);
    setLikes(hasLiked ? likes - 1 : likes + 1); // Update like counter

    const email = props.userEmail;
    const postId = props.postId;

    try {
      const response = await fetch('http://localhost:3200/update-like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, postId }),
      });

      const { message } = await response.json();
      if (message) {
        console.log(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("פעולה זו תמחק את הקריאה, האם אתה בטוח?");
    if (confirmDelete) {
      const postId = props.postId;
      try {
        const response = await fetch('http://localhost:3200/delete-post', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId }),
        });

        const { message } = await response.json();
        if (message === 'Post deleted successfully') {
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
      }
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
    <div className="post" style={{width:'600px'}}>
      {volunteerData && (
        <button
          style={{ margin: '0 auto', display: 'block', width: '100%' }}
          className="buttonA"
          onClick={handleDelete}
        >
          סמן כבוצעה
        </button>
      )}
      <div className="post-header">
        <img src={props.authorImg || defaultImage} alt={props.author} />
        <div className="post-header-text">
          <br></br>
          <h2 style={{ color: '#000' }}>{props.author}</h2>
          <h3>בנושא: {props.theme}</h3>
          <h3>פורסם בתאריך: {props.date}</h3>
          <h3>
            {props.address ? `כתובת: ${props.address}` : 'כתובת לא זמינה'}
          </h3>
          <h3>
            {props.contentInfo ? `מידע נוסף: ${props.contentInfo}` : 'מידע נוסף לא זמין'}
          </h3>
        </div>
      </div>
      <div className="post-content">
        <h1 style={{ color: '#000' }}>{props.content}</h1>
      </div>

      <div className="post-actions">
        <button onClick={handleLike} style={{ display: 'flex', alignItems: 'center' }}>
          {hasLiked ? <AiFillLike className="com" /> : <AiOutlineLike className="com" />}
          <span style={{ marginLeft: '5px' }}>{likes}</span>
        </button>
        <button onClick={handleShowComment} style={{ display: 'flex', alignItems: 'center' }}>
          <FaRegComment className="com" />
          <span style={{ marginLeft: '5px' }}>
            {comments.length === 1 ? ' תגובה אחת' : ` ${comments.length} תגובות`}
          </span>
        </button>

        <br />
        {showLikes && <Likes likes={likes} />}
      </div>

      {showComment && (
        <div className="comments">
          <Comments comments={comments} />
          <div className="post-comments1">
            <textarea
              ref={textareaRef}
              type="text"
              placeholder="הוסף תגובה..."
              value={commentInput}
              onChange={handleInputChange}
            />
            <button
              className="buttonA"
              onClick={handleComment}
              style={{ margin: '0 auto', display: 'block', width: '80%' }}
            >
              הגב
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
