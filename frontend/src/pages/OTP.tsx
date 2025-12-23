import { useState, useRef, useEffect } from "react";
import "./OTP.css"; 

const OTP_LENGTH = 4;
const CORRECT_OTP = "1234"; 

interface OTPModalProps {
  phone: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function OTP({ phone, onClose, onSuccess }: OTPModalProps) {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState<string | null>(null); 
  const inputRefs = useRef<HTMLInputElement[]>([]); 

  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return; 

    const newOtp = [...otp];
    newOtp[index] = element.value.slice(-1); 
    setOtp(newOtp);
    setError(null); 

    if (element.value !== "" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

 
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

 
  const handleVerify = () => {
    const fullOtp = otp.join("");

    if (fullOtp.length !== OTP_LENGTH) {
      return setError("Please enter the full 4-digit OTP.");
    }

    if (fullOtp === CORRECT_OTP) {
        onSuccess(); 
    } else {
        setError(`Invalid OTP. Please try again.`); 
        setOtp(new Array(OTP_LENGTH).fill("")); 
        inputRefs.current[0].focus();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="otp-modal-overlay">
      <div className="otp-modal-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        
        <h2 className="otp-title">Enter OTP</h2>
        <p>A 4-digit code has been sent to **{phone}**</p> 

        <div className="otp-input-container">
          {otp.map((data, index) => {
            return (
              <input
                key={index}
                className="otp-input-box"
                type="text"
                name="otp"
                maxLength={1}
                value={data}
                onChange={(e) => handleOtpChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => {
                  if (el) {
                    inputRefs.current[index] = el;
                  }
                }}
              />
            );
          })}
        </div>
        
        {error && (
            <p style={{ color: 'red', fontSize: '0.9em', marginBottom: '10px' }}>
                {error}
            </p>
        )}
        
        <div className="otp-resend">
          <button className="resend-button" onClick={() => alert("Resending OTP...")}>
            Resend OTP
          </button>
        </div>

        <button 
          className="otp-submit-button" 
          onClick={handleVerify} 
          disabled={otp.join("").length !== OTP_LENGTH}
        >
          Submit
        </button>
      </div>
    </div>
  );
}