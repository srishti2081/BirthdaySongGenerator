import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import OTP from "./OTP";

import logoImage from "../assets/Cadbury Logo.png";
import birthdaySongLogo from "../assets/2d logo.png";
import celebrationBoxImage from "../assets/Celebrations(Bg).png";
import backgroundImage from "../assets/BG.jpg";
import hamburgerIcon from "../assets/Hamburger.png";
import progressBarImage from "../assets/progress bar.png";
import musicNoteImage from "../assets/Yellow tone.png";
import glitterImage from "../assets/Asset 1.png";


export default function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [receivePromo, setReceivePromo] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");

  const navigate = useNavigate();

  const phoneRegex = /^[6-9]\d{9}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const toggleTerms = () => setAcceptTerms(!acceptTerms);
  const togglePromo = () => setReceivePromo(!receivePromo);

  const handleRegister = () => {
    let isValid = true;

    setPhoneError("");
    setEmailError("");

    if (!phoneRegex.test(phone)) {
      setPhoneError("Please enter a valid 10-digit mobile number");
      isValid = false;
    }

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    if (!name.trim()) {
      alert("Please enter your full name");
      isValid = false;
    }

    if (!acceptTerms) {
      alert("You must accept the Terms & Conditions");
      isValid = false;
    }

    if (!isValid) return;

    const mockId = `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    setCurrentUserId(mockId);
    setShowOtpModal(true);
  };

  const handleOtpSuccess = () => {
    navigate("/details1", {
      state: {
        userId: currentUserId,
        name,
        phone,
        email,
      },
    });
  };

  const wrapperClass = `registration-content-wrapper ${
    showOtpModal ? "blurred-background" : ""
  }`;

  return (
    <div
      className="registration-page"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className={wrapperClass}>
        {/* HEADER */}
        <div className="registration-header">
          <div className="header-left">
            <img src={logoImage} alt="Cadbury Celebrations" className="cadbury-logo" />
          </div>
          <div className="header-center">
            <img src={birthdaySongLogo} alt="#my birthday song" className="birthday-logo" />
          </div>
          <div className="header-right">
            <img src={hamburgerIcon} alt="Menu" className="menu-icon" />
          </div>
        </div>

        {/* CONTENT */}
        <div className="image-carousel">
          <img src={progressBarImage} alt="Progress" className="progress-bar-image" />
          <div className="celebration-visual">
            <img src={celebrationBoxImage} alt="Celebrations" className="main-box-image" />
          </div>
        </div>

        <div className="registration-form-container">
          <h3 className="register-title">Register to create</h3>

          {/* PHONE */}
          <div className="input-group">
            <input
              className="styled-input"
              type="tel"
              placeholder="Phone Number"
              value={phone}
              maxLength={10}
              onChange={(e) => {
                setPhone(e.target.value.replace(/\D/g, ""));
                setPhoneError("");
              }}
            />
            {phoneError && <p className="error-text">{phoneError}</p>}
          </div>

          {/* NAME */}
          <div className="input-group">
            <input
              className="styled-input"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* EMAIL */}
          <div className="input-group">
            <input
              className="styled-input"
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
            />
            {emailError && <p className="error-text">{emailError}</p>}
          </div>

          {/* CHECKBOXES */}
          <div className="checkbox-group" onClick={toggleTerms}>
            <input type="radio" checked={acceptTerms} readOnly />
            <label>
              I accept <strong>Terms & Conditions</strong> and{" "}
              <strong>Privacy Policy</strong>
            </label>
          </div>

          <div className="checkbox-group" onClick={togglePromo}>
            <input type="radio" checked={receivePromo} readOnly />
            <label>
              I would like to receive promotional communication from Mondelez
              (Cadbury).
            </label>
          </div>

          <div className="submit-section">
  {/* Glitter */}
  <img
    src={glitterImage}
    alt=""
    className="decor-glitter"
  />

  {/* Submit button */}
  <button className="submit-button" onClick={handleRegister}>
    Submit
  </button>

  {/* Music note */}
  <img
    src={musicNoteImage}
    alt=""
    className="decor-music-note"
  />
</div>

        </div>
      </div>

      {showOtpModal && (
        <OTP
          phone={phone}
          onClose={() => setShowOtpModal(false)}
          onSuccess={handleOtpSuccess}
        />
      )}
      

    </div>
  );
}
