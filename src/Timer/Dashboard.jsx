// src/Timer/Dashimport React from 'react';
import { Link } from 'react-router-dom';
import './D.css';

function Dashboard({ tasks, onToggleFocusMode, isFocusMode }) {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>TimaFlow</h1>
      </header>
      
        <nav className="dashboard-nav">
          <ul>
          <li><Link to="/tasks">Tasks</Link></li>

            <li><Link to="/pomodoro">Timer</Link></li>
            <li><Link to="/quiz">Quiz</Link></li>
            
          </ul>
        </nav>
      </div>
    
  );
}

export default Dashboard;
