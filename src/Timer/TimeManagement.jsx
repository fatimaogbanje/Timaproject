import React from 'react';
import PomodoroTimer from './Pomodoro';
import DailyPlanner from './DailyPlanner';
import MotivationalQuotes from './MotivationalQuotes';
import Reminder from './Reminder';  // Import the new Reminder component

function TimeManagement() {
  return (
    <div className="time-management">
      <div className="left-section">
        <PomodoroTimer />
        <DailyPlanner />
        <MotivationalQuotes />
      </div>
      <div className="right-section">
        <Reminder /> {/* Add the Reminder component on the right */}
      </div>
    </div>
  );
}

export default TimeManagement;
