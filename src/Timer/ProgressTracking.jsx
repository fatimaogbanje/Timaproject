import React from 'react';
import './progress.css'

function ProgressTracking({ tasks, calculateTaskProgress }) {
  const totalTasks = tasks.length;

  // Calculate the overall progress based on milestone completion for all tasks
  const totalProgress = tasks.reduce((acc, task) => acc + calculateTaskProgress(task), 0);
  const overallProgress = totalTasks > 0 ? totalProgress / totalTasks : 0;

  return (
    <div className="progress-tracking">
      <h3>Progress Tracking</h3>

      {/* Progress bar container */}
      <div className="progress-bar">
        {/* Progress line */}
        <div className="progress" style={{ width: `${overallProgress}%` }}></div>
        {/* Display percentage on top of the bar */}
        <span className="progress-text">{Math.round(overallProgress)}%</span>
      </div>

      <p>{Math.round(overallProgress)}% overall task progress</p>
    </div>
  );
}

export default ProgressTracking;
