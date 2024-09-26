import React, { useState, useEffect } from 'react';
import './suggest.css'

function Suggestions({ tasks }) {
  const [suggestions, setSuggestions] = useState('');

  useEffect(() => {
    const suggest = () => {
      if (tasks.length === 0) return 'No tasks to suggest.';

      const nextTask = tasks.reduce((prev, current) => {
        const prevDate = new Date(prev.deadline);
        const currDate = new Date(current.deadline);
        return prevDate < currDate ? prev : current;
      });

      return `You should prioritize: "${nextTask.name}" with deadline: ${nextTask.deadline}`;
    };

    setSuggestions(suggest());
  }, [tasks]);

  return (
    <div className="suggestions">
      <h3>Advice</h3>
      <p>{suggestions}</p>
    </div>
  );
}

export default Suggestions;
