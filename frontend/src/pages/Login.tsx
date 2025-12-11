import { useNavigate } from "react-router-dom";
import bg from "../assets/BG.jpg";
import logo from "../assets/Celebrations(Bg) - hashtag.png";
import './Login.css'; // Ensure you import a dedicated CSS file

export default function Landing() {
  const navigate = useNavigate();

  return (
    // FIX: Replaced .mobile-frame with a standard page wrapper class.
    <div 
        className="login-page-container" // New standardized wrapper
        style={{ 
            backgroundImage: `url(${bg})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            minHeight: '100vh', // Ensures the container fills the screen vertically
            width: '100%',
            maxWidth: '390px', // Explicitly setting the max-width here for clarity
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center', // Center content vertically
            alignItems: 'center',
            padding: '20px',
        }}
    >
      {/* FIX: Removed .mobile-content wrapper as it was part of the old structure */}
      <div className="login-content"> 
        <img style={{
         width: '90%',       
         maxWidth: '350px',  
         height: 'auto'      
         }}
          src={logo} alt="logo" />

        <p style={{marginTop:'0px'}}>A unique birthday song for everyone!</p>
        <p style={{fontSize:10, opacity: 0.9, marginTop: '15px' }}>
          इस birthday, कुछ अच्छा हो जाए कुछ मीठा हो जाए।
        </p>

        <button onClick={() => navigate("/register")}>
          Get Started
        </button>
      </div>
    </div>
  );
}