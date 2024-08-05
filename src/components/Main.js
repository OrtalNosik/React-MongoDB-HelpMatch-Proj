import React, { useState, useEffect } from 'react'
import Title from './Title';
import Login from './Login';
import axios from 'axios';
import '../style/AboutUs.css';

import Post from './VolunteerOpportunity';
import CreatePost from './CreateVolunteerRequest';
import '../style/Main.css';

function Main(props) {
    const [posts, setPosts] = useState([]);
    const [imgIndex, setImgIndex] = useState(0)
    const [sentenceIndex, setSentenceIndex] = useState(0);
    const [volunteerData, setVolunteerData] = useState(false);

    useEffect(() => {
      fetch("http://localhost:3200/getVall")
        .then(response => response.json())
        .then(data => setVolunteerData(data.message))
        .catch(error => console.error(error));
    }, []);
    const motivationSentences = [
        "ברוכים הבאים ל-Help Match - מחברים בין מתנדבים לבין אלה שזקוקים לעזרה!",
        "יחד נוכל לעשות את העולם למקום טוב יותר, מעשה אחד טוב בכל פעם.",
        "התנדבות היא הדרך הטובה ביותר להשפיע על הקהילה שלנו.",
        "בעזרת הבינה המלאכותית שלנו, נמצא את ההתאמה המושלמת עבורך.",
        "זמנך יקר - אנו מבטיחים לנהל אותו ביעילות למען מטרות חשובות.",
        "הצטרפו אלינו בבניית קהילה של אכפתיות ותמיכה הדדית.",
        "כל מעשה התנדבות, קטן ככל שיהיה, יכול לשנות את חייו של מישהו.",
        "אנו מאמינים בכוחה של הטכנולוגיה לחבר בין אנשים ולהפיץ טוב בעולם.",
        "יחד נוכל ליצור רשת תמיכה חזקה ויעילה בקהילה שלנו.",
        "הצטרפו למהפכת ההתנדבות החכמה - עם Help Match, כל אחד יכול לעזור!"
    ];
    const images = [
        'https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1560252829-804f1aedf1be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
        'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1548614606-52b4451f994b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setSentenceIndex((sentenceIndex + 1) % motivationSentences.length);
            setImgIndex((imgIndex + 1) % images.length);
        }, 10000);
        return () => clearInterval(timer);
    }, [sentenceIndex, imgIndex, motivationSentences.length, images.length]);

    useEffect(() => {
        const timer = setInterval(() => {
          setSentenceIndex((sentenceIndex + 1) % motivationSentences.length);
          setImgIndex((imgIndex + 1) % images.length);
        }, 10000);
        return () => clearInterval(timer);
      }, [sentenceIndex, imgIndex, motivationSentences.length, images.length]);
      
    useEffect(() => {
      const fetchAlerts = async () => {
        try {
          const response = await axios.get('http://localhost:3200/post');
          setPosts(response.data);
        } catch (error) {
          console.error('Error fetching alerts:', error);
        }
      };
    
      fetchAlerts();
    }, []);

      return (
        <div className="main-container">
          <Title text={motivationSentences[sentenceIndex]} img={images[imgIndex]} />
    
          {!props.isLoggedIn && (
            <div>
                <br></br><br></br>
            <div >
                
              <p >
               <h1 className='about-us h1'>משתמש יקר, על מנת לקבל את כל הפונקציונליות של Help Match, <br></br>עליך להירשם או להתחבר לאתר
             </h1>  </p>
            </div></div>
          )}
    
          {props.isLoggedIn && (
            <div className="content-area">
              <CreatePost name={props.name} img={props.img} />
              <div className="container">
              <div className="main-content">
                    <div className="posts-container">
                        {posts.map(post => (
                            <Post
                                userEmail = {props.email}
                                postId = {post._id}
                                nameUser ={props.name}
                                imgUser = {props.img} 
                                author={post.author}
                                date={post.date}
                                content={post.content}
                                contentInfo={post.contentInfo}
                                address={post.address}
                                authorImg={post.authorImg}
                                Likes={post.likes}
                                theme={post.theme}
                                comments = {post.comments}
                            />))}
                    </div>
                    </div>
                    <br></br><br></br><br></br><br></br><br></br><br></br>
                    </div> 
            </div>
          )}
        </div>
      );
    }
    
    export default Main;