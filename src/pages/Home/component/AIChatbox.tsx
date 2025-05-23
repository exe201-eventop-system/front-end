import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiX, FiMinimize2, FiMaximize2 } from 'react-icons/fi';
import { FaRobot } from 'react-icons/fa';
import axios from 'axios';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

const AIChatbox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Xin chào! Tôi là trợ lý AI của EventTop. Tôi có thể giúp gì cho bạn?",
            sender: 'ai',
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        // Add user message
        const userMessage: Message = {
            id: messages.length + 1,
            text: inputMessage,
            sender: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsTyping(true);

        try {
            // Call HuggingFace Inference API
            const response = await axios.post(
                'https://api-inference.huggingface.co/models/facebook/blenderbot-1B-distill',
                {
                    inputs: inputMessage,
                    options: {
                        wait_for_model: true
                    }
                },
                {
                    headers: {
                        'Authorization': `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Add AI response
            const aiMessage: Message = {
                id: messages.length + 2,
                text: response.data.generated_text || "Xin lỗi, tôi không thể xử lý yêu cầu của bạn lúc này.",
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Error getting AI response:', error);
            // Add error message
            const errorMessage: Message = {
                id: messages.length + 2,
                text: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.",
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            {/* Chat Button */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
                >
                    <FaRobot className="text-2xl" />
                </motion.button>
            )}

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className={`fixed bottom-6 right-6 w-96 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden z-50 ${isMinimized ? 'h-16' : 'h-[500px]'}`}
                    >
                        {/* Chat Header */}
                        <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FaRobot className="text-white text-xl" />
                                <span className="text-white font-medium">AI Assistant</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsMinimized(!isMinimized)}
                                    className="text-white hover:text-purple-200 transition-colors"
                                >
                                    {isMinimized ? <FiMaximize2 /> : <FiMinimize2 />}
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-white hover:text-purple-200 transition-colors"
                                >
                                    <FiX />
                                </button>
                            </div>
                        </div>

                        {!isMinimized && (
                            <>
                                {/* Chat Messages */}
                                <div className="h-[calc(500px-8rem)] overflow-y-auto p-4 space-y-4">
                                    {messages.map((message) => (
                                        <motion.div
                                            key={message.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[80%] rounded-2xl p-3 ${message.sender === 'user'
                                                    ? 'bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 text-white'
                                                    : 'bg-white/10 text-white'
                                                    }`}
                                            >
                                                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                                                <span className="text-xs opacity-70 mt-1 block">
                                                    {message.timestamp.toLocaleTimeString()}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                    {isTyping && (
                                        <div className="flex justify-start">
                                            <div className="bg-white/10 text-white rounded-2xl p-3">
                                                <div className="flex space-x-2">
                                                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                                                    <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100" />
                                                    <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Chat Input */}
                                <div className="p-4 border-t border-white/10">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={inputMessage}
                                            onChange={(e) => setInputMessage(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            placeholder="Nhập tin nhắn..."
                                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleSendMessage}
                                            className="bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 text-white p-2 rounded-lg hover:from-purple-700 hover:via-violet-700 hover:to-fuchsia-700 transition"
                                        >
                                            <FiSend />
                                        </motion.button>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIChatbox; 