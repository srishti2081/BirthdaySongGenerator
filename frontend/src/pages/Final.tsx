import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom"; 
import api from "../services/api"; 
import "./Final.css";

import finalHeaderImage from '../assets/Cadbury Logo.png'; 
import finalProgressImage from '../assets/progress bar5.png'; 
import hamburgerIcon from '../assets/Hamburger.png';

export default function Final() {
  const { state } = useLocation();
  const receiverName = state?.receiverName || "";
  const gender = state?.gender || "";
  const genre = state?.genre || "";
  const userId = state?.userId || "";

  const [lyrics, setLyrics] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAIContent = useCallback(async () => {
    if (!receiverName) {
      setLyrics("No name found. Please go back and enter details.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/ai/lyrics/generate", {
        userId,
        receiverName,
        gender,
        genre
      });

      if (response.data && response.data.lyrics) {
        setLyrics(response.data.lyrics);
      }
    } catch (err) {
      console.error("Frontend API Error:", err);
      setLyrics("Happy Birthday to you!\nHope your day is special and new!");
    } finally {
      setLoading(false);
    }
  }, [userId, receiverName, gender, genre]);

  useEffect(() => {
    fetchAIContent();
  }, [fetchAIContent]);
  
  const handlePlaySong = () => {
    if (!lyrics) return;
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(lyrics);
        window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="final-screen">
        <div className="registration-header">
            <div className="logo-cluster">
                <img src={finalHeaderImage} alt="Logo" className="logo" />
            </div>
            <img src={hamburgerIcon} alt="Menu" className="menu-icon" /> 
        </div>

        <div className="progress-title-section">
            <img src={finalProgressImage} alt="Progress" className="progress-bar-image" />
            <h2 className="lyrics-ready-title">Your song's lyrics are ready!</h2>
        </div>
      
        <div className="final-content-wrapper">
          {loading ? (
            <div className="lyrics-box-wrapper">
                <p className="loading-text" style={{color: 'white', padding: '20px'}}>🪄 AI is composing your custom song for {receiverName}...</p>
            </div>
          ) : (
            <>
              <div className="lyrics-box-wrapper">
                  <pre className="lyrics-text">
                      {lyrics}
                  </pre>
              </div>

              <div className="final-button-group single-button-group">
                <button 
                    onClick={handlePlaySong} 
                    className="play-song-button"
                >
                  PLAY SONG
                </button>
              </div>
            </>
          )}
        </div>
    </div>
  );
}