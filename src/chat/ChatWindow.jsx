import React from 'react';
import ReactMarkdown from 'react-markdown'; 

const ChatWindow = ({ messages }) => {
  return (
    <div className="chat-window">
      {messages.map((message, index) => (
        <div key={index} className={`chat-message ${message.sender}`}>
          <ReactMarkdown>{message.text}</ReactMarkdown> 
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
