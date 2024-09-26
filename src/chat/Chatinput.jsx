import React, { useState } from 'react';


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input); 
      setInput('');  
    }
  };

  const startListening = () => {
    if (!recognition) {
      alert('Speech Recognition not supported in this browser.');
      return;
    }

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
       
      onSend(speechToText);  
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech Recognition error:', event.error);
      setIsListening(false);
    };
  };

  return (
    
    <div className="chat-input">
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message or click the mic..."
        />

     <button 
        onClick={startListening} 
        className="mic-button" 
        disabled={isListening} 
      >
        <i className={`fas fa-microphone${isListening ? '-slash' : ''}`}></i>
      </button>
        <button type="submit">
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>

      
      
      
    </div>
  );
};

export default ChatInput;
