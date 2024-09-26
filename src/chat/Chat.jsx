import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import ChatInput from "./Chatinput";
import { marked } from "marked"; 

import "./chat.css";

const ChatbotApp = () => {
  const [messages, setMessages] = useState([]);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  
  const convertMarkdownToPlainText = (markdown) => {
    const html = marked(markdown); 
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  
  const speakText = (text) => {
    
    window.speechSynthesis.cancel();

    const plainText = convertMarkdownToPlainText(text); 
    const utterance = new SpeechSynthesisUtterance(plainText);
    utterance.pitch = 1;
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  };

  
  const handleSendMessage = async (text) => {
    const newMessage = { sender: "user", text };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=`, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: text,
                  },
                ],
              },
            ],
            systemInstruction: {
              role: "user",
              parts: [
                {
                  text: "you are Tima, a friendly virtual assistant. Tima is a versatile AI assistant designed to help you with any question or topic you have. Whether you need information, advice, or just a chat, Tima is here to provide accurate and helpful responses. Feel free to ask anything, and Tima will do its best to assist you!\n\n"
                }
              ]
            },
            generationConfig: {
              temperature: 1,
              topK: 64,
              topP: 0.95,
              maxOutputTokens: 8192,
              responseMimeType: "text/plain",
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);

      const botMessage =
        data.candidates[0].content?.parts[0]?.text ??
        "Sorry, something went wrong.";

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: botMessage },
      ]);

    
      speakText(botMessage);
    } catch (error) {
      console.error("Error querying chatbot:", error);
    }
  };

  
  const toggleChatbot = () => {
    
    window.speechSynthesis.cancel();
    setIsChatbotOpen((prev) => !prev);
  };

  return (
    <>
      <div className="chatbot-icon" onClick={toggleChatbot}>
        <i className={`fas fa-${isChatbotOpen ? "times" : "comments"}`}></i>
      </div>

      {isChatbotOpen && (
        <div className="chatbot-container">
          <h1 className="tima-sage">
            <span className="tima">Tima</span>
            <span className="sage">SAGE</span>
          </h1>

          <ChatWindow messages={messages} />
          <ChatInput onSend={handleSendMessage} />
        </div>
      )}
    </>
  );
};

export default ChatbotApp;
