import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Minimize2 } from 'lucide-react';
import { aiChat } from '../services/aiService';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI shopping assistant. How can I help you find the perfect product today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const navigate = useNavigate();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessageText = inputMessage.trim();
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: userMessageText,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Show typing indicator
    const typingMessage = {
      id: messages.length + 2,
      text: 'Thinking...',
      sender: 'bot',
      timestamp: new Date(),
      isTyping: true
    };
    setMessages(prev => [...prev, typingMessage]);

    try {
      // Get conversation history (last 5 messages for context)
      const conversationHistory = messages.slice(-5).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      // Get AI response
      const aiResponse = await aiChat(userMessageText, conversationHistory);

      // Remove typing indicator
      setMessages(prev => prev.filter(msg => !msg.isTyping));

      // Add AI response
      let botResponseText = aiResponse.message || "I'm here to help! How can I assist you today?";
      
      // Add suggestions if available
      if (aiResponse.suggestions && aiResponse.suggestions.length > 0) {
        botResponseText += '\n\nSuggestions:\n' + aiResponse.suggestions.map((s, i) => `${i + 1}. ${s}`).join('\n');
      }

      const botResponse = {
        id: messages.length + 2,
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date(),
        department: aiResponse.department,
        subCategory: aiResponse.subCategory
      };
      setMessages(prev => [...prev, botResponse]);

      // If department is detected, offer to navigate
      if (aiResponse.department) {
        setTimeout(() => {
          const navigateMessage = {
            id: messages.length + 3,
            text: `Would you like to browse ${aiResponse.department} products? I can take you there!`,
            sender: 'bot',
            timestamp: new Date(),
            department: aiResponse.department,
            hasAction: true
          };
          setMessages(prev => [...prev, navigateMessage]);
        }, 1000);
      }
    } catch (error) {
      console.error('AI Chat Error:', error);
      // Remove typing indicator
      setMessages(prev => prev.filter(msg => !msg.isTyping));
      
      // Add error message
      const errorResponse = {
        id: messages.length + 2,
        text: "I apologize, but I encountered an error. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    }
  };

  const handleNavigateToDepartment = (department) => {
    navigate(`/department/${department}`);
    setIsOpen(false);
  };

  const chatVariants = {
    minimized: {
      y: 0,
      height: 'auto',
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    expanded: {
      y: 0,
      height: '500px',
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, rotate: -180 }}
          animate={{
            scale: 1,
            rotate: 0,
            boxShadow: [
              '0 4px 20px rgba(212, 175, 55, 0.4)',
              '0 8px 30px rgba(212, 175, 55, 0.6)',
              '0 4px 20px rgba(212, 175, 55, 0.4)'
            ],
            y: [0, -5, 0]
          }}
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 btn-academic rounded-full shadow-2xl flex items-center justify-center text-white transition-all"
          transition={{
            scale: { duration: 0.5 },
            rotate: { duration: 0.5 },
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            },
            y: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }
          }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            <MessageCircle className="w-6 h-6" />
          </motion.div>
          <motion.span
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.7, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </motion.button>
      )}

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            variants={chatVariants}
            animate={isMinimized ? 'minimized' : 'expanded'}
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-white dark:bg-academic-800 border-2 border-burgundy-200 dark:border-burgundy-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ height: isMinimized ? '60px' : '500px' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-academic-50 dark:bg-academic-900 border-b-2 border-academic-200 dark:border-academic-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-burgundy-600 to-burgundy-700 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-academic-900 dark:text-academic-50">
                    AI Assistant
                  </h3>
                  <p className="text-xs text-academic-600 dark:text-academic-400">Online</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 text-academic-600 dark:text-academic-400 hover:text-burgundy-600 dark:hover:text-burgundy-400 transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-academic-600 dark:text-academic-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-academic-50 dark:bg-academic-900">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`flex items-start space-x-2 max-w-[80%] ${
                        message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}
                    >
                      <motion.div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.sender === 'user'
                            ? 'bg-burgundy-600'
                            : 'bg-gradient-to-r from-burgundy-600 to-burgundy-700'
                        }`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        animate={{
                          boxShadow: message.sender === 'bot'
                            ? [
                                '0 0 10px rgba(220, 38, 38, 0.3)',
                                '0 0 20px rgba(220, 38, 38, 0.6)',
                                '0 0 10px rgba(220, 38, 38, 0.3)'
                              ]
                            : '0 0 0px rgba(220, 38, 38, 0)'
                        }}
                        transition={{
                          boxShadow: {
                            duration: 2,
                            repeat: message.sender === 'bot' ? Infinity : 0,
                            ease: 'easeInOut'
                          }
                        }}
                      >
                        {message.sender === 'user' ? (
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{
                              duration: 5,
                              repeat: Infinity,
                              ease: 'linear',
                              repeatDelay: 2
                            }}
                          >
                            <User className="w-4 h-4 text-white" />
                          </motion.div>
                        ) : (
                          <motion.div
                            animate={{ rotate: [0, -15, 15, 0] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'easeInOut'
                            }}
                          >
                            <Bot className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </motion.div>
                      <div
                        className={`rounded-2xl px-4 py-2 ${
                          message.sender === 'user'
                            ? 'bg-burgundy-600 text-white'
                            : 'bg-academic-100 dark:bg-academic-700 text-academic-900 dark:text-academic-50'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        {message.hasAction && message.department && (
                          <button
                            onClick={() => handleNavigateToDepartment(message.department)}
                            className="mt-2 px-4 py-2 bg-burgundy-100 dark:bg-burgundy-900/30 hover:bg-burgundy-200 dark:hover:bg-burgundy-900/50 border border-burgundy-300 dark:border-burgundy-700 rounded-lg text-burgundy-600 dark:text-burgundy-400 text-xs font-semibold transition-colors"
                          >
                            Browse {message.department} Products →
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Input */}
            {!isMinimized && (
              <form onSubmit={handleSendMessage} className="p-4 border-t-2 border-academic-200 dark:border-academic-700 bg-academic-50 dark:bg-academic-900">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 bg-white dark:bg-academic-800 border-2 border-academic-200 dark:border-academic-700 rounded-lg text-academic-900 dark:text-academic-50 placeholder-academic-400 focus:outline-none focus:ring-2 focus:ring-burgundy-500 focus:border-burgundy-500 transition-all"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 btn-academic rounded-lg transition-all"
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;

