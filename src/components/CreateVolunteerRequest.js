import React, { useState } from "react";
import '../style/Post.css';

// Import default image
const defaultImage = 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg';

function CreatPost(props) {
    const [content, setContent] = useState("");
    const [theme, setTheme] = useState('אחר');
    const [contentInfo, setContentInfo] = useState("");
    const [address, setAddress] = useState('');
    const [postCounts, setPostCounts] = useState({
        בית: 0,
        זוגיות: 0,
        משפחה: 0,
        אחר: 0
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("http://localhost:3200", { //get the data
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                author: props.name,
                date: new Date().toLocaleDateString('en-GB'),
                content,
                authorImg: props.img || defaultImage, // Use default image if props.img is not available
                theme,
                address,
                contentInfo,
                likes: [],
                comments: [],
            }),
        }).then((res) => res.json())
            .then((data) => {
                setPostCounts((prevCounts) => ({
                    ...prevCounts,
                    [theme]: prevCounts[theme] + 1
                }));
                window.location.href = '/';
            });
    };

    return (
        <div className="post-form-container">
            <form onSubmit={handleSubmit}>
                <div className="profile-picture">
                    {/* Display default image if props.img is not available */}
                    <img src={props.img || defaultImage} alt="Profile" className="profile-picture" />
                </div>

                <div className="post-form-content">
                    <div className="post-themes">
                        {['בית', 'בירוקרטיה', 'שיפוצים', 'אחר'].map((themeOption) => (
                            <label key={themeOption}>
                                <input
                                    type="radio"
                                    value={themeOption}
                                    checked={theme === themeOption}
                                    onChange={() => setTheme(themeOption)}
                                />
                                {themeOption}
                            </label>
                        ))}
                    </div>
                    <input
                        className="input"
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                        placeholder="מלא כתובת הקריאה"
                    />
                    <input
                        className="input"
                        value={contentInfo}
                        onChange={(event) => setContentInfo(event.target.value)}
                        placeholder="מלא מספר פלאפון להקשרות"
                    />
                    <textarea
                        className="textarea"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                        placeholder="מלא מידע, ציין רקע ודחיפות..."
                    />
                </div>
                <button className="buttonA" type="submit">העלאה</button>
            </form>
        </div>
    );
}

export default CreatPost;
