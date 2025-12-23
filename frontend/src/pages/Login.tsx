import { useNavigate } from "react-router-dom";
import bg from "../assets/BG.jpg";
import logo from "../assets/Celebrations(Bg) - hashtag.png";
import './Login.css'; 

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div 
        className="login-page-container" 
        style={{ 
            backgroundImage: `url(${bg})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            minHeight: '100vh', 
            width: '100%',
            maxWidth: '390px', 
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center',
            padding: '20px',
        }}
    >
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