"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/navbar";
import { Typewriter } from "react-simple-typewriter";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

export default function Chat() {
  const [message, setMessage] = useState<string>("");
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showTyping, setShowTyping] = useState<boolean>(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    // Add user message to chat
    const userMessage: ChatMessage = { sender: "user", text: message };
    setChats((prevChats) => [...prevChats, userMessage]);
    setMessage("");
    setLoading(true);
    setShowTyping(true);

    try {
      // Send JSON request to the chatbot API
      const response = await fetch("http://127.0.0.1:8081/output", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      });

      const data = await response.json(); // Get the bot's response

      // Add bot message to chat
      const botMessage: ChatMessage = { sender: "bot", text: data.response }; // Assuming API returns { "response": "message text" }
      setChats((prevChats) => [...prevChats, botMessage]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setChats((prevChats) => [
        ...prevChats,
        { sender: "bot", text: "Error fetching response. Please try again." },
      ]);
    } finally {
      setShowTyping(false);
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-blue-900/90 via-blue-400/90 to-blue-200/90">
      <Navbar />
      <div className="w-full max-w-4xl flex flex-col justify-between flex-grow p-6 bg-white rounded-2xl shadow-lg m-6">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chats.map((chat, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-md max-w-xs ${
                chat.sender === "user"
                  ? "bg-blue-500 text-white self-end ml-auto"
                  : "bg-gray-100 text-gray-800 self-start"
              }`}
            >
              <strong>{chat.sender === "user" ? "You" : "Bot"}:</strong>{" "}
              {chat.sender === "bot" ? (
                <Typewriter words={[chat.text]} loop={1} typeSpeed={25} />
              ) : (
                chat.text
              )}
            </div>
          ))}
          {showTyping && (
            <div className="p-4 bg-gray-100 rounded-lg shadow-md text-gray-800 self-start">
              <strong>Bot:</strong>{" "}
              <span className="animate-pulse">Typing...</span>
            </div>
          )}
        </div>
        <div className="border-t border-gray-300 pt-4">
          <Textarea
            className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-300"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <Button
            className="w-full mt-4 bg-blue-500 hover:bg-blue-600 transition-all duration-200 rounded-lg shadow-md"
            onClick={sendMessage}
            disabled={loading}
          >
            {loading ? "Generating..." : "Send"}
          </Button>
        </div>
      </div>
    </main>
  );
}