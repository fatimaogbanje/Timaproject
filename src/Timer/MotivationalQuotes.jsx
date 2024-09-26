import React, { useState, useEffect } from 'react';
import './motivationalQuotes.css';

const quotes = [
  "The only way to do great work is to love what you do. – Steve Jobs",
  "Success is not the key to happiness. Happiness is the key to success. – Albert Schweitzer",
  "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
  "Your time is limited, don’t waste it living someone else’s life. – Steve Jobs",
  "The future depends on what you do today. – Mahatma Gandhi",
  "Hard work beats talent when talent doesn't work hard. – Tim Notke",
  "Don’t wish it were easier; wish you were better. – Jim Rohn"
];

function MotivationalQuotes() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 2000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="motivational-quotes">
      <p>{quotes[currentQuoteIndex]}</p>
    </div>
  );
}

export default MotivationalQuotes;
