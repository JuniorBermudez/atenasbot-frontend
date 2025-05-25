// src/ChatbotApp.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const temasRapidos = [
  '¿Cómo ingreso al campus virtual?',
  '¿Qué hago si olvidé mi contraseña del correo institucional?',
  '¿Cómo conectarme al Wi-Fi de la universidad?'
];

export default function ChatbotApp() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hola 👋 Soy UniBot, tu asistente de soporte técnico universitario. ¿En qué puedo ayudarte?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      const parsed = JSON.parse(savedHistory);
      setMessages(parsed.messages);
      setHistory(parsed.history);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify({ messages, history }));
  }, [messages, history]);

  const handleSend = async (text) => {
    if (!text.trim()) return;
    const userMessage = { sender: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}ask`, {
        question: text
      });

      const botMessage = { sender: 'bot', text: response.data.answer };
      setMessages(prev => [...prev, botMessage]);

    } catch (err) {
      console.error('Error al contactar al backend:', err);
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: 'Lo siento, hubo un error al procesar tu mensaje.'
      }]);
    }

    setLoading(false);
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} min-h-screen flex flex-col items-center p-4 transition-colors`}>
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-center">⚡ AtenasBot - Soporte Técnico</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-sm bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-lg"
          >
            {darkMode ? '☀️ Claro' : '🌙 Oscuro'}
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {temasRapidos.map((tema, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(tema)}
              className="bg-blue-100 dark:bg-blue-700 text-sm px-3 py-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-600 transition"
            >
              {tema}
            </button>
          ))}
        </div>

        <div className="flex-1 max-h-[400px] overflow-y-auto space-y-2">
          {messages.map((msg, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              key={idx}
              className={`p-3 rounded-xl w-fit max-w-[80%] whitespace-pre-wrap ${
                msg.sender === 'user'
                  ? 'ml-auto bg-blue-100 dark:bg-blue-600'
                  : 'mr-auto bg-gray-200 dark:bg-gray-700'
              }`}
            >
              {msg.text}
            </motion.div>
          ))}
          {loading && <div className="text-sm text-gray-500">Escribiendo...</div>}
        </div>

        <div className="flex items-center space-x-2">
          <input
            className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="Escribe tu duda aquí..."
          />
          <button
            onClick={() => handleSend(input)}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
