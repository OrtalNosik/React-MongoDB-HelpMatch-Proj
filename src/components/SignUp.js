import React, { Component } from 'react';
import '../style/Login.css';
import ImageSrc from '../imges/young-man-elderly-woman-visiting-1080937-wallpaper-1087x724.jpg';
export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      photo: "https://cdn-icons-png.flaticon.com/512/607/607453.png?w=826&t=st=1685110430~exp=1685111030~hmac=7e7a010380b473b66126e2498cef93cee0c4662ee6c56cc8874a27832740ab13",

    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(e) {
    e.preventDefault();
    const { fname, lname, email, password, photo } = this.state;

    fetch("http://localhost:3200/sign-up", { //get the data
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        Accept: "application/json",
      },
      body: JSON.stringify({
        fname,
        lname,
        email,
        password,
        photo
      }),
    }).then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (!data.success) {
          alert(data.message);

        } else { //succes
          alert(data.message);

        }

        //move to sign in after the sign up
        if (data.message === "User registered successfully") {
          window.location.href = '/sign-in';
        }

      })
      .catch((error) => {
        console.error = jest.fn()
        console.error('Error:', error); //email exist
      });
  }




  handlePhotoChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          photo: reader.result,
        });
      };
      reader.readAsDataURL(file);
    } else {
      this.setState({
        photo: null,
      });
    }
  };

  render() {
    return (
      <div class="container">
    <div class="login-form">
      <form onSubmit={this.handleSubmit}>
        <h3>הרשמה</h3>

        <div className="mb-3">
          <label>שם פרטי</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={(e) => this.setState({ fname: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>שם משפחה</label>
          <input type="text"
            className="form-control"
            placeholder="Last name"
            onChange={(e) => this.setState({ lname: e.target.value })}
          />

        </div>

        <div className="mb-3">
          <label>כתובת אימייל</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>סיסמא</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>תמונת פרופיל</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => this.handlePhotoChange(e.target.files[0])}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary" >
            הרשם
          </button>
        </div>
        
        <br />
        <p className="forgot-password text-right">
          כבר רשום <a href="/sign-in">התחבר?</a>
        </p>

        <div className="d-grid">
        <p className="forgot-password text-right">
        <a href="/sign-up-vall">רוצה להתחבר במתנדב? לחץ כאן</a>
        </p>
        </div>

      </form>
      </div>
      <div className="images-container">
        <img src={ImageSrc} className="img-left" alt="Login background" />
      </div>
      </div>
    )
  }
}
