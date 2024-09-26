import React, { useState, useEffect, useRef } from 'react';
import './pomodoroTimer.css';

function PomodoroTimer() {
  const [seconds, setSeconds] = useState(1500); 
  const [isActive, setIsActive] = useState(false);
  const [customTime, setCustomTime] = useState(25); 
  const [isPlayingStartSound, setIsPlayingStartSound] = useState(false); 

  
  const alarmSoundRef = useRef(new Audio('/sounds/Alarm Clock Sound Effect (Animated).mp3')); 
  const startSoundRef = useRef(new Audio('/sounds/30 Second Ticking Countdown Timer With Alarm.mp3')); 

  
  useEffect(() => {
    let interval = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds <= 1) {
            clearInterval(interval); 
            alarmSoundRef.current.play(); 
            setIsPlayingStartSound(false);
          }

          
          if (prevSeconds === 30 && !isPlayingStartSound) {
            startSoundRef.current.play();
            setIsPlayingStartSound(true); 
          }

          return prevSeconds - 1;
        });
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
      
      if (isPlayingStartSound) {
        startSoundRef.current.pause();
      }
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, isPlayingStartSound]);

  
  const resetTimer = () => {
    setSeconds(customTime * 60); 
    setIsActive(false);
    setIsPlayingStartSound(false); 

    
    startSoundRef.current.pause();
    startSoundRef.current.currentTime = 0; 

    alarmSoundRef.current.pause();
    alarmSoundRef.current.currentTime = 0; 
  };

  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${('0' + minutes).slice(-2)}:${('0' + secs).slice(-2)}`;
  };

  
  const handleTimeChange = (e) => {
    const inputMinutes = parseInt(e.target.value);
    if (!isNaN(inputMinutes) && inputMinutes > 0) {
      setCustomTime(inputMinutes);
      setSeconds(inputMinutes * 60);
    }
  };

  
  const handleStartPause = () => {
    setIsActive(!isActive);

    
    if (!isActive && isPlayingStartSound && seconds <= 30) {
      startSoundRef.current.play();
    }
  };

  return (
    <div className="pomodoro-timer">
      <h2 className='hp'>Pomodoro Timer</h2>
      <div className="timer-display">{formatTime(seconds)}</div>
      
      {/* Start and Reset Buttons */}
      <button className='pbutton' onClick={handleStartPause}>
        {isActive ? 'Pause' : 'Start'}
      </button>
      <button className='pbutton' onClick={resetTimer}>Reset</button>
      
      {/* Input for setting custom time */}
      <div className="custom-time-input">
        <label>Set Time (minutes):</label>
        <input
          type="number"
          min="1"
          value={customTime}
          onChange={handleTimeChange}
        />
      </div>
    </div>
  );
}

export default PomodoroTimer;
