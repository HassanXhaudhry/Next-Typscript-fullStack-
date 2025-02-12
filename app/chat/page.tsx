"use client";

import { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("/api/chat", { message: input });
      const botMessage = { text: res.data.reply, isUser: false };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [...prev, { text: "Error getting response", isUser: false }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white border shadow-lg rounded-lg">
      <div className="p-4 h-80 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`my-2 p-2 rounded-md ${msg.isUser ? "bg-blue-500 text-white ml-auto" : "bg-gray-300 text-black"}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="p-2 flex border-t">
        <input
          type="text"
          className="flex-1 p-2 border rounded-l-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me something..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded-r-md" disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
