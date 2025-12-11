import { useState } from "react";
// FIX 1: Import useLocation
import { useNavigate, useLocation } from "react-router-dom"; 
import "./Details1.css"; 

// Image Imports
import logoImage from '../assets/Cadbury Logo.png'; 
import birthdaySongLogo from '../assets/2d logo.png'; 
import backgroundImage from '../assets/BG.jpg'; 
import hamburgerIcon from '../assets/Hamburger.png'; 
import progressBarImage from '../assets/progress bar1.png'; 
import presentImage from '../assets/Cap&Gift.png'; 

export default function Details1() {
  // FIX 2: Receive previous state, including userId
  const { state } = useLocation();
  const { userId } = state || {} as any; 

  const [receiverName, setReceiverName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("23 Years"); 

  const navigate = useNavigate();

  const next = () => {
    if (!receiverName || !gender || !age) return alert("All fields required!");
    
    // CRUCIAL CHECK: Ensure we have the userId before proceeding
    if (!userId) {
        return alert("Registration data missing. Please go back to register.");
    }

    // FIX 3: Pass ALL required state data to Details2, especially userId
    navigate("/details2", {
      state: { 
        userId: userId, // CRUCIAL: Pass the ID forward
        receiverName: receiverName, 
        gender: gender, 
        age: age,
      }, 
    });
  };

  // Helper function to generate options for age
  const generateAgeOptions = () => {
    const options = [];
    for (let i = 1; i <= 100; i++) {
      options.push(<option key={i} value={`${i} Years`}>{`${i} Years`}</option>);
    }
    return options;
  };

  return (
    <div 
      className="details-page" 
      style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
      }}
    >
      {/* 1. Header (Navbar) */}
      <div className="registration-header">
        <div className="logo-cluster">
            <img src={logoImage} alt="Cadbury Celebrations Logo" className="logo" />
            <img src={birthdaySongLogo} alt="#my birthday song" className="hashtag-logo" />
        </div>
        <img src={hamburgerIcon} alt="Menu" className="menu-icon" /> 
      </div>

      {/* 2. Progress Indicator */}
      <div className="progress-section">
        <img src={progressBarImage} alt="Progress Indicator" className="progress-bar-image" />
      </div>

      <div className="details-form-container">
        {/* Main Title */}
        <h2 className="details-title">Tell us about your loved one...</h2>

        {/* 3. Visuals Section */}
        <div className="visuals-section">
          <img src={presentImage} alt="Present" className="visual-present" />
        </div>
        
        {/* 4. Form Fields */}
        
        {/* Receiver Name */}
        <div className="input-field-group">
          <h4 className="input-label">Their name</h4>
          <input
            className="styled-input name-input"
            placeholder="XXXXX XXXXXXXXXX"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
          />
        </div>
        
        {/* Age Dropdown */}
        <div className="input-field-group">
          <h4 className="input-label">How old they'll be this birthday</h4>
          <div className="custom-select-wrapper">
            <select className="styled-select" value={age} onChange={(e) => setAge(e.target.value)}>
              {generateAgeOptions()}
            </select>
          </div>
        </div>

        {/* Gender Dropdown */}
        <div className="input-field-group">
          <h4 className="input-label">Gender</h4>
          <div className="custom-select-wrapper">
            <select className="styled-select" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        
        {/* 5. Proceed Button */}
        <div className="button-wrapper">
          <button onClick={next} className="proceed-button">
            Proceed
          </button>
        </div>
        
      </div>
    </div>
  );
}