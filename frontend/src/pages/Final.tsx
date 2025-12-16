import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
// api import is kept for the fallback TTS method, though the lyrics generation API call is removed
import api from "../services/api"; 
import "./Final.css";

// Placeholder images for context
import logoImage from "../assets/Cadbury Logo.png";
import birthdaySongLogo from "../assets/2d logo.png";
import finalProgressImage from '../assets/progress bar4.png'; 
import hamburgerIcon from '../assets/Hamburger.png';

// --- MOCK LYRICS TEMPLATE (Hardcoded to simulate successful API response) ---
const GENERIC_LYRICS_TEMPLATE = `
Happy Birthday, <RECEIVER_NAME>!

Today is the day to celebrate all <POSSESSIVE_PRONOUN> amazing years. 
<PRONOUN> deserves the best song, filled with <GENRE> beats and good cheer.

We remember all the great times, from the past right up to now. 
This special song is just for <HIM_HER>, take a bow!

So put your dancing shoes on and turn the volume high, 
Let's make this the best birthday under the sky!
`;
// --------------------------------------------------------------------------


export default function Final() {
  const { state } = useLocation();
  const navigate = useNavigate(); 

  // Destructure required parameters
  const { userId, receiverName, gender, genre } = state || {} as any; 

  const [lyrics, setLyrics] = useState("");
  // Note: audioUrl is still used for tracking the state of the TTS generation/playback
  const [audioUrl, setAudioUrl] = useState(""); 
  const [loading, setLoading] = useState(true);

  // --- Mock Lyrics Logic Function ---
  const substituteLyrics = () => {
    if (!receiverName || !gender || !genre) {
        setLyrics("Missing personalization data. Please restart the flow.");
        setLoading(false);
        return;
    }

    // Determine gender-specific pronouns
    let pronoun, possessivePronoun, himHer;
    if (gender === "Male") {
        pronoun = "He";
        possessivePronoun = "His";
        himHer = "him";
    } else if (gender === "Female") {
        pronoun = "She";
        possessivePronoun = "Her";
        himHer = "her";
    } else {
        // Fallback for non-binary or unselected
        pronoun = "They";
        possessivePronoun = "Their";
        himHer = "them";
    }

    // Replace placeholders in the template
    let generatedText = GENERIC_LYRICS_TEMPLATE
        .replace(/<RECEIVER_NAME>/g, receiverName)
        .replace(/<PRONOUN>/g, pronoun)
        .replace(/<POSSESSIVE_PRONOUN>/g, possessivePronoun)
        .replace(/<HIM_HER>/g, himHer)
        .replace(/<GENRE>/g, genre || "pop"); // Use the genre if available

    setLyrics(generatedText.trim());
    setLoading(false);
  };
  // ------------------------------------

  useEffect(() => {
    // Only substitute lyrics when data is available
    if (userId && receiverName && genre) {
        substituteLyrics();
    } else {
        setLyrics("Missing personalization data. Please restart the flow.");
        setLoading(false);
    }
  }, [userId, receiverName, gender, genre]);
  
  
  // --- Text-to-Speech Playback Function with Browser Fallback ---
  const playTTS = async () => {
    if (!lyrics) return;

    if ('speechSynthesis' in window) {
        // Option 1: Use Browser Native TTS (Fastest and most reliable fallback)
        setLoading(true);
        const utterance = new SpeechSynthesisUtterance(lyrics);
        
        // Optional: Set language and voice
        utterance.lang = 'en-US'; 
        
        utterance.onend = () => {
            setLoading(false);
            setAudioUrl("MOCK_SUCCESS"); // Mark as played for button text change
        };
        utterance.onerror = (event) => {
            console.error('Browser TTS error:', event);
            setLoading(false);
            alert("Browser Text-to-Speech failed.");
            setAudioUrl("MOCK_FAILURE");
        };

        window.speechSynthesis.speak(utterance);
        return; 
    }
    
    // Option 2 (Original Fallback): Try the backend API route if browser TTS is not available
    setLoading(true);
    try {
        // This is the call that was potentially failing
        const res = await api.post("/ai/tts", { text: lyrics }, { responseType: "blob" });
        
        const url = URL.createObjectURL(res.data);
        setAudioUrl(url); 
        new Audio(url).play();
    } catch (err) {
        console.error("TTS failed:", err);
        setLoading(false);
        setAudioUrl("MOCK_FAILURE");
        alert("External API Text-to-Speech failed. Lyrics are displayed above.");
    } finally {
        if (audioUrl !== "MOCK_FAILURE") {
            setLoading(false);
        }
    }
  };
  // -------------------------------------------------------------
  
  // Note: The recreateLyrics function is removed as requested.
  
  return (
    <div className="final-screen">
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

        {/* FIX: Combined Progress section and Title as requested */}
        <div className="progress-title-section">
            <img src={finalProgressImage} alt="Progress Indicator" className="progress-bar-image" />
            <h2 className="lyrics-ready-title">Your song's lyrics are ready!</h2>
        </div>
      
        <div className="final-content-wrapper">
          
          {loading && lyrics === "" ? (
            <p className="loading-text">⏳ Generating custom song lyrics using your local template...</p>
          ) : (
            <>
              {/* --- Lyrics Box --- */}
             <div className="lyrics-box-wrapper">
  <div className="lyrics-scroll-area">
    <pre className="lyrics-text">{lyrics || "No lyrics available."}</pre>
  </div>
</div>

 
              {/* --- Button Group (Now only one button) --- */}
              <div className="final-button-group single-button-group">
                
                <button 
                    onClick={playTTS} 
                    className="play-song-button"
                    disabled={loading || !lyrics}
                >
                  {loading 
                    ? "GENERATING AUDIO..." 
                    : audioUrl && audioUrl !== "MOCK_FAILURE"
                    ? "PLAY SONG AGAIN" 
                    : "PLAY SONG"
                  }
                </button>
              </div>
            </>
          )}
        </div>
    </div>
  );
}