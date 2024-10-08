import React from 'react';
import '../style/AboutUs.css';
import '../style/index.css';
import ortal from "../imges/2.jpg";
import rotem from "../imges/3.jpg";

function AboutUs() {
  return (
    <div className="form-container">
      <div className="images-container">
        <img src={ortal} alt="אורטל נוסיק" className="img-left" />
      </div>
      <form className="about-us">
        <h1 style={{ textAlign: "center" }}>עלינו</h1>
        <p>
          ברוכים הבאים ל-"Help Match" - פלטפורמה שמוקדשת לשידוך מדויק ואוטומטי בין מתנדבים לבין אלו הזקוקים לעזרה, בעזרת AI. אנו צוות של שתי סטודנטיות מ-SCE באר שבע, רותם חדד ואורטל נוסיק, השואפות ליצור חווית משתמש אופטימלית שתסייע לקהילה.
        </p>
        <p>
          המערכת שלנו מתאימה בין מתנדבים לאנשים הזקוקים לעזרה על פי פרמטרים כמו מיקום, זמינות וצרכים אישיים. אנו שואפות לספק פתרונות לניהול זמן ותיאום בצורה יעילה, ולפנות למתנדבים בהתאם לסדרי עדיפויות ויכולת.
        </p>
        <p>
          מעבר לכך, אנו מציעות מערכת משוב מתקדמת שבה משתמשים יכולים לדרג את המתנדבים ולקבל המלצות בהתאם למשובים שקיבלו, מה שיתרום לשיפור מתמשך באיכות השירות.
        </p>
        <p>
          אנחנו מאמינים כי כל אחד זכאי לחיות חיים מלאי כבוד, ואנו שואפים ליצור חברה שמכבדת את זכויות הפרט. אל תהססו לגלוש באתר שלנו ולחקור את המשאבים והתמיכה שאנו מציעים. אם אתם צריכים עזרה או יש לכם שאלות כלשהן, 
          </p><p>
          פנו אלינו - אנחנו כאן כדי לעזור.
        </p>
      </form>
      <div className="images-container">
        <img src={rotem} alt="רותם חדד" className="img-right" />
      </div>
    </div>
  );
}

export default AboutUs;
