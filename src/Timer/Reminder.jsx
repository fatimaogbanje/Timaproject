import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './Reminder.css'

function Reminder() {
  const [showReminder, setShowReminder] = useState(false);
  const [task, setTask] = useState('');
  const [time, setTime] = useState('');

  const handleIconClick = () => {
    setShowReminder(!showReminder);
  };

  const playSound = () => {
    const audio = new Audio('/public/sounds/Wake up!!!.mp3'); 
    audio.play();
  };

  const setReminder = () => {
    if (time) {
      const currentTime = new Date();
      const reminderTime = new Date(time);
      const timeDifference = reminderTime - currentTime;

      if (timeDifference > 0) {
        setTimeout(() => {
          playSound(); 
          Swal.fire({
            title: 'Reminder',
            text: `Task: ${task}`,
            icon: 'info',
            confirmButtonText: 'Okay',
            timer: 16000, // Auto close after 5 seconds
            timerProgressBar: true,
          });
        }, timeDifference);
      } else {
        alert('Please set a future time!');
      }
    }
  };

  return (
    <div className="reminder">
        <div className='alerticon'>
      <FaBell onClick={handleIconClick} size={32} style={{ cursor: 'pointer' }} />
      </div>
      {showReminder && (
        <div className="reminder-form">
          <h3 className='hset'>Set Reminder</h3>
          <input 
            type="text" 
            placeholder="Task" 
            value={task} 
            onChange={(e) => setTask(e.target.value)} 
          />
          <input 
            type="datetime-local" 
            value={time} 
            onChange={(e) => setTime(e.target.value)} 
          />
          <button onClick={setReminder}>Set</button>
        </div>
      )}
    </div>
  );
}

export default Reminder;
