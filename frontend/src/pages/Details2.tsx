import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Details2.css"; 

// --- Main Visuals Imports ---
import logoImage from '../assets/Cadbury Logo.png'; 
import birthdaySongLogo from '../assets/2d logo.png'; 
import hamburgerIcon from '../assets/Hamburger.png'; 
import progressBarImage from '../assets/progress bar2.png'; 
import headphonesImage from '../assets/Headphone.png'; 
import backgroundImage from '../assets/BG.jpg'; 
import balloonImage from "../assets/Balloon2.png";
import glitterImage from "../assets/Asset 1.png";
import musicNoteImage from "../assets/Purple Music Tone.png";


// --- ICON IMPORTS ---
import happyIcon from '../assets/Happy.png';
import romanticIcon from '../assets/Romantic.png';
import funnyIcon from '../assets/Funny.png';
import motivationalIcon from '../assets/Motivational.png';
import calmIcon from '../assets/Calm.png';
import rapIcon from '../assets/Rap.png';
import rockIcon from '../assets/Rock.png';
import popIcon from '../assets/Pop.png';
import desiIcon from '../assets/Desi.png';
import edmIcon from '../assets/EDM.png';
import maleAvatar from '../assets/Male.png';
import femaleAvatar from '../assets/Female.png';


interface SelectorItem {
  value: string;
  label: string;
  icon: string;
}

// --- Data for Mood, Genre, and Singer's Voice ---
const MOODS: SelectorItem[] = [
  { value: "Happy", label: "Happy", icon: happyIcon },
  { value: "Romantic", label: "Romantic", icon: romanticIcon },
  { value: "Funny", label: "Funny", icon: funnyIcon },
  { value: "Motivational", label: "Motivational", icon: motivationalIcon },
  { value: "Calm", label: "Calm", icon: calmIcon },
];

const GENRES: SelectorItem[] = [
  { value: "Rap", label: "Rap", icon: rapIcon },
  { value: "Rock", label: "Rock", icon: rockIcon },
  { value: "Pop", label: "Pop", icon: popIcon },
  { value: "Desi", label: "Desi", icon: desiIcon },
  { value: "Edm", label: "EDM", icon: edmIcon },
];

const SINGER_VOICES: SelectorItem[] = [
    { value: "Male", label: "Male", icon: maleAvatar },
    { value: "Female", label: "Female", icon: femaleAvatar },
];

export default function Details2() { 
  const { state } = useLocation();
  
  
  const { userId, receiverName, gender, age } = state || {} as any; 

  const [mood, setMood] = useState("");
  const [genre, setGenre] = useState("");
  const [singerVoice, setSingerVoice] = useState(""); 

  const navigate = useNavigate();

  const next = () => {
  
    if (!mood || !genre || !singerVoice) {
      return alert("Please select a mood, a genre, and a singer's voice.");
    }
    
   
    if (!userId || !receiverName || !gender) {
        return alert("Missing previous registration or details data. Please restart the flow.");
    }

   
    navigate("/generate-song", { 
      state: { 
        userId: userId, 
        receiverName: receiverName, 
        gender: gender, 
        genre: genre, 
      }, 
    });
  };
  
  const renderSelector = (
    items: SelectorItem[],
    selectedValue: string,
    setSelectedValue: (value: string) => void 
  ) => (
    <div className="selection-grid"> 
      {items.map((item) => (
        <div
          key={item.value}
          className={`selector-item ${selectedValue === item.value ? 'selected' : ''} ${items.length <= 3 ? 'narrow-grid-item' : ''}`}
          onClick={() => setSelectedValue(item.value)}
        >
          <img src={item.icon} alt={item.label} className="selector-icon-png" />
          <div className="selector-label">{item.label}</div>
        </div>
      ))}
    </div>
  );

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
        {/* --- Header Section --- */}
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

        {/* --- Progress Section --- */}
        <div className="progress-section">
            <img src={progressBarImage} alt="Progress Indicator" className="progress-bar-image" />
        </div>
        
        <div className="details2-content-container">
            <h2 className="details2-title">What would you like their song's vibe to be?</h2>

            {/* --- Visuals Section --- */}
            <div className="visuals2-section">
  <img src={headphonesImage} alt="Headphones" className="visual-headphones" />

  {/* Floating decorations */}
  <img
    src={balloonImage}
    alt=""
    className="floating-balloon2"
  />
<img
    src={musicNoteImage}
    alt=""
    className="floating-music-note2"
  />
  
</div>


            {/* --- Mood Selection Section --- */}
            <div className="selection-card mood-card">
                <h3 className="card-title">Mood</h3>
                {renderSelector(MOODS, mood, setMood)}
            </div>

            {/* --- Genre Selection Section --- */}
            <div className="selection-card genre-card">
                <h3 className="card-title">Genre</h3>
                {renderSelector(GENRES, genre, setGenre)}
            </div>
            
            {/* --- Singer's Voice Selection Section --- */}
            <div className="selection-card singer-voice-card">
                <h3 className="card-title">Singer's voice</h3>
                {renderSelector(SINGER_VOICES, singerVoice, setSingerVoice)}
            </div>
            
            {/* --- Proceed Button --- */}
            <div className="button-wrapper-three">
              
  <button onClick={next} className="proceed-button">
    Proceed
  </button>
 <img
    src={glitterImage}
    alt=""
    className="floating-glitter2"
  />
</div>

        </div>
    </div>
  );
}