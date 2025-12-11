import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css"; 
import OTP from "./OTP"; 

// --- IMPORT YOUR ASSETS HERE ---
import logoImage from '../assets/Cadbury Logo.png'; 
import birthdaySongLogo from '../assets/2d logo.png'; 
import celebrationBoxImage from '../assets/Celebrations(Bg).png'; 
import backgroundImage from '../assets/BG.jpg'; 
import hamburgerIcon from '../assets/Hamburger.png'; 
import progressBarImage from '../assets/progress bar.png';

export default function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [receivePromo, setReceivePromo] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false); 
  // FIX: State to hold the generated userId
  const [currentUserId, setCurrentUserId] = useState(""); 

  const navigate = useNavigate();

  const toggleTerms = () => setAcceptTerms(!acceptTerms);
  const togglePromo = () => setReceivePromo(!receivePromo);

  const handleRegister = () => { 
    if (!name || !phone || !email) {
      return alert("Please fill in Name, Phone, and Email.");
    }
    if (!acceptTerms) {
      return alert("You must accept the Terms & Conditions.");
    }
    
    // FIX: Generate a mock userId immediately
    const mockId = `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    setCurrentUserId(mockId);
    
    // Validation successful, open modal immediately
    setShowOtpModal(true); 
  };

  // FIX: Define the success handler to pass the state to Details1
  const handleOtpSuccess = () => {
      navigate("/details1", {
          state: { 
              userId: currentUserId, // CRUCIAL: Pass the ID forward
              name: name,
              phone: phone,
              email: email,
          },
      });
  };

  const wrapperClass = `registration-content-wrapper ${showOtpModal ? 'blurred-background' : ''}`;

  return (
    <div 
        className="registration-page" 
        style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        }}
    >
      <div className={wrapperClass}>
        
        <div className="registration-header">
          <img src={logoImage} alt="Cadbury Celebrations Logo" className="logo" />
          <img src={birthdaySongLogo} alt="#my birthday song" className="hashtag-logo" />
          <img src={hamburgerIcon} alt="Menu" className="menu-icon" /> 
        </div>

        <div className="image-carousel">
          <img src={progressBarImage} alt="Progress Indicator" className="progress-bar-image" />
          <div className="celebration-visual">
            <img src={celebrationBoxImage} alt="Cadbury Celebrations Box" className="main-box-image" />
          </div>
        </div>

        <div className="registration-form-container">
          <h3 className="register-title">Register to create</h3>

          <div className="input-group">
            <input className="styled-input" type="tel" placeholder="Phone Number"
              value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="input-group">
            <input className="styled-input" type="text" placeholder="Full Name"
              value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="input-group">
            <input className="styled-input" type="email" placeholder="Email ID"
              value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          {/* --- RADIO BUTTONS IMPLEMENTATION --- */}
          
          <div className="checkbox-group" onClick={toggleTerms} style={{cursor: "pointer"}}>
            <input
              type="radio"
              id="acceptTerms"
              checked={acceptTerms}
              readOnly
              style={{ marginRight: "10px", accentColor: "#d4af37" }} 
            />
            <label htmlFor="acceptTerms" style={{cursor: "pointer"}}>
              I accept <strong>Terms & Conditions</strong> and <strong>Privacy Policy</strong> of Mondelez (Cadbury)
            </label>
          </div>

          <div className="checkbox-group" onClick={togglePromo} style={{cursor: "pointer"}}>
            <input
              type="radio"
              id="receivePromo"
              checked={receivePromo}
              readOnly
              style={{ marginRight: "10px", accentColor: "#d4af37" }}
            />
            <label htmlFor="receivePromo" style={{cursor: "pointer"}}>
              I would like to receive promotional communication from Mondelez (Cadbury) about its products and offers.
            </label>
          </div>
          
          <div className="button-wrapper">
            <button className="submit-button" onClick={handleRegister}>
                Submit
            </button>
          </div>
        </div>
      
      </div>

      {/* --- MODAL RENDERING: REMAINS OUTSIDE THE BLURRED WRAPPER --- */}
      {showOtpModal && (
        <OTP 
          phone={phone}
          onClose={() => setShowOtpModal(false)}
          onSuccess={handleOtpSuccess} // FIX: Use the handler that passes state
        />
      )}
    </div>
  );
}