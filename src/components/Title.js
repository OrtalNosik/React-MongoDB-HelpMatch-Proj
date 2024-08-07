import React from 'react';
import '../style/Title.css';
import '../style/index.css';


function Title(props) {
  return (
    <div id="imgTitle"  >
      <div className="img-container">
        <img src={props.img} alt={props.sentence} />
      </div>
      <h1> {props.text}</h1>
    </div>
  );
}
export default Title;
