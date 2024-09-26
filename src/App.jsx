import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Timer/Dashboard';
import TaskList from './Timer/Tlist';
import ChatbotApp from './chat/chat.jsx';
import QuizApp from './quiz/QuizApp';
import TimeManagement from './Timer/TimeManagement';
import DragAndDrop from './drag/DragAndDrop';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Complete project proposal', completed: false },
    { id: 2, name: 'Prepare for the meeting', completed: false },
  ]);

  const [focusMode, setFocusMode] = useState(false);

  const toggleFocusMode = () => {
    setFocusMode(prevMode => !prevMode);
  };

  return (
    <Router>
      <div className={`App ${focusMode ? 'focus-mode' : ''}`}>
        {/* The focus button should always be rendered */}
        <div className="focus-toggle-container">
          <label className="switch">
            <input
              type="checkbox"
              checked={focusMode}
              onChange={toggleFocusMode}
            />
            <span className="slider round"></span>
          </label>
          <span className="focus-mode-label">{focusMode ? 'Focus mode off' : 'focus mode on'}</span>
        </div>

        {/* Conditionally render the dashboard only when focusMode is off */}
        {!focusMode && (
          <Dashboard
            tasks={tasks}
            onToggleFocusMode={toggleFocusMode}
            isFocusMode={focusMode}
          />
        )}

        {/* Main content changes based on focusMode */}
        <main className={`content ${focusMode ? 'focus-mode' : ''}`}>
          {focusMode ? (
            <div className="focus-mode-container">
              <div className="focus-playlist">
                <h2>Focus Playlist</h2>
                <audio controls autoPlay loop>
                  <source src="public/sounds/12. Conqueror (feat. Estelle and Jussie Smollett).mp3" type="audio/mp3" />
                </audio>
              </div>
              <DragAndDrop />
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<div>Select a link to view content</div>} />
              <Route path="/pomodoro" element={<TimeManagement />} />
              <Route path="/quiz" element={<QuizApp />} />
              <Route path="/tasks" element={<TaskList />} />
            </Routes>
          )}
        </main>

        {/* The chatbot remains visible on all pages regardless of focusMode */}
        <ChatbotApp />
      </div>
    </Router>
  );
}

export default App;
