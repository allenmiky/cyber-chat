import { useState, useEffect, useRef, useCallback } from "react";
import io from "socket.io-client";
import {
  FiMic,
  FiMicOff,
  FiPaperclip,
  FiSend,
  FiAlertTriangle,
  FiEye,
  FiEyeOff,
  FiUser,
  FiRadio,
  FiGlobe,
  FiHash
} from "react-icons/fi";
import {
  GiBlood,
  GiSpiderWeb,
  GiCctvCamera,
  GiHeartBeats,
  GiBrokenHeart,
  GiNetworkBars,
  GiSightDisabled,
  GiFingerPrint
} from "react-icons/gi";
import { FaBolt, FaSkull } from "react-icons/fa";

// Replace with your server URL
const socket = io("http://localhost:5000");
const notificationSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3");
const mentionSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-unlock-game-notification-253.mp3");
const sendSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3");
const heartbeatSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-heartbeat-1205.mp3");

function CyberpunkHorrorChat({ user }) {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [bloodSplatters, setBloodSplatters] = useState([]);
  const [systemCorruption, setSystemCorruption] = useState(0);
  const [heartbeat, setHeartbeat] = useState(false);
  const [securityAlert, setSecurityAlert] = useState(false);
  const [terminalMessages, setTerminalMessages] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [neonColor, setNeonColor] = useState(user.color || "#ff0000");

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);

  // Initialize sounds
  useEffect(() => {
    [notificationSound, mentionSound, sendSound, heartbeatSound].forEach(sound => {
      sound.volume = 0.3;
      sound.preload = 'auto';
    });
    
    // Initialize terminal messages
    setTerminalMessages([
      "> SYSTEM INIT: DEMONIC CHAT HUB v9.6.6",
      "> SECURITY: MULTIPLE ENTITIES DETECTED",
      "> WARNING: THEY ARE WATCHING THROUGH THE SCREEN",
      "> READY FOR VOID COMMUNICATION"
    ]);
  }, []);

  // Cyberpunk horror effects
  useEffect(() => {
    const effectsInterval = setInterval(() => {
      // Glitch effect
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), Math.random() * 100 + 50);
      
      // Heartbeat effect
      setHeartbeat(prev => !prev);
      if (heartbeat && Math.random() > 0.7 && !isMuted) {
        heartbeatSound.currentTime = 0;
        heartbeatSound.play();
      }
      
      // Blood splatter effects
      if (Math.random() > 0.95) {
        const newSplatters = [...bloodSplatters];
        if (newSplatters.length > 8) newSplatters.shift();
        newSplatters.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 30 + 15,
          opacity: Math.random() * 0.4 + 0.3
        });
        setBloodSplatters(newSplatters);
      }
      
      // Random terminal messages
      if (Math.random() > 0.8) {
        const horrorMessages = [
          "> WARNING: UNKNOWN ENTITY JOINED CHANNEL",
          "> AUDIO: WHISPERS DETECTED IN VOID FREQUENCY",
          "> SECURITY: SOUL SIGNATURES BEING MONITORED",
          "> ERROR: REALITY SYNTAX CORRUPTION DETECTED",
          "> ALERT: SHADOWS ARE MOVING IN THE TERMINAL"
        ];
        const randomMsg = horrorMessages[Math.floor(Math.random() * horrorMessages.length)];
        setTerminalMessages(prev => [...prev.slice(-4), randomMsg]);
      }
      
    }, 2000);
    
    return () => clearInterval(effectsInterval);
  }, [heartbeat, bloodSplatters, isMuted]);

  // Pulse effect for UI elements
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulse(!pulse);
    }, 1500);
    return () => clearInterval(pulseInterval);
  }, [pulse]);

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const chars = "血鬼悪魔恐怖闇死霊亡霊呪い怨念災い凶";
    const drops = [];
    const fontSize = 18;
    const columns = Math.floor(canvas.width / fontSize);
    
    for(let i = 0; i < columns; i++) {
      drops[i] = {
        y: Math.random() * -canvas.height,
        speed: Math.random() * 4 + 2,
        length: Math.floor(Math.random() * 20) + 8,
        hue: Math.random() * 30 + 330 // Red-purple range
      };
    }
    
    const draw = () => {
      ctx.fillStyle = 'rgba(10, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = `bold ${fontSize}px monospace`;
      
      for(let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        
        for(let j = 0; j < drop.length; j++) {
          const charY = drop.y - (j * fontSize);
          if (charY > -fontSize && charY < canvas.height) {
            const opacity = 1 - (j / drop.length);
            ctx.fillStyle = `hsla(${drop.hue}, 100%, ${70 - j * 3}%, ${opacity * 0.7})`;
            
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, charY);
          }
        }
        
        drop.y += drop.speed;
        
        if (drop.y - (drop.length * fontSize) > canvas.height) {
          drops[i] = {
            y: Math.random() * -200,
            speed: Math.random() * 4 + 2,
            length: Math.floor(Math.random() * 20) + 8,
            hue: Math.random() * 30 + 330
          };
        }
      }
    };
    
    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, []);

  // Socket listeners (keep your existing socket logic)
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
      
      // Update corruption level
      if (Math.random() > 0.7) {
        setSystemCorruption(prev => Math.min(prev + 5, 100));
      }

      if (!isMuted && data.user.username !== user.username) {
        if (data.mentions && data.mentions.includes(user.username)) {
          mentionSound.currentTime = 0;
          mentionSound.play();
          setSecurityAlert(true);
          setTimeout(() => setSecurityAlert(false), 2000);
        } else {
          notificationSound.currentTime = 0;
          notificationSound.play();
        }
      }
    });

    // ... keep your other socket listeners
    return () => {
      socket.off("receiveMessage");
      socket.off("userConnected");
      socket.off("userDisconnected");
      socket.off("typing");
      socket.off("userList");
    };
  }, [isMuted, user.username]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Typing indicator (keep your existing logic)
  useEffect(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (message.trim()) {
      socket.emit("typing", { username: user.username, isTyping: true });
      setIsTyping(true);
    } else {
      socket.emit("typing", { username: user.username, isTyping: false });
      setIsTyping(false);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("typing", { username: user.username, isTyping: false });
      setIsTyping(false);
    }, 1000);
  }, [message, user.username]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim() && !file) return;

    sendSound.currentTime = 0;
    sendSound.play();

    // Mention detection
    const mentionedUsers = [];
    const regex = /@(\w+)/g;
    let match;
    while ((match = regex.exec(message)) !== null) {
      mentionedUsers.push(match[1]);
    }

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = {
      user,
      text: message,
      mentions: mentionedUsers,
      file,
      timestamp,
      id: Date.now() + Math.random()
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        newMsg.file = reader.result;
        newMsg.fileType = file.type;
        socket.emit("sendMessage", newMsg);
        setMessage("");
        setFile(null);
      };
      reader.readAsDataURL(file);
    } else {
      socket.emit("sendMessage", newMsg);
      setMessage("");
    }
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const renderMessageContent = (msg) => {
    if (!msg.text) return null;
    
    return msg.text.split(" ").map((word, index) => {
      if (word.startsWith("@") && msg.mentions?.includes(word.substring(1))) {
        const mentionedUser = word.substring(1);
        const userColor = neonColor;
        
        return (
          <span
            key={index}
            className="px-2 py-1 rounded bg-black/50 font-bold animate-pulse"
            style={{
              color: userColor,
              textShadow: `0 0 8px ${userColor}`
            }}
          >
            {word}
          </span>
        );
      }
      return <span key={index} className="text-gray-200">{word} </span>;
    });
  };

  return (
    <div className={`
      relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black
      text-red-500 font-mono p-4 md:p-6 overflow-hidden
      ${securityAlert ? 'animate-pulse' : ''}
      ${heartbeat ? 'scale-[1.001]' : 'scale-100'}
      transition-all duration-300
    `}>
      {/* Matrix Background */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-30 z-0" />
      
      {/* Blood Splatters */}
      {bloodSplatters.map((splatter, index) => (
        <div
          key={index}
          className="absolute pointer-events-none animate-fade-in"
          style={{
            left: `${splatter.x}%`,
            top: `${splatter.y}%`,
            width: `${splatter.size}px`,
            height: `${splatter.size}px`,
            background: `radial-gradient(circle, rgba(139,0,0,${splatter.opacity}) 0%, rgba(139,0,0,0) 70%)`,
            zIndex: 1
          }}
        >
          <GiBlood className="w-full h-full text-red-900/50" />
        </div>
      ))}

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`
            text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter
            ${glitchEffect ? 'translate-x-1 translate-y-1' : ''}
            transition-transform duration-75
            bg-clip-text text-transparent
            bg-gradient-to-r from-red-500 via-red-600 to-red-800
            drop-shadow-[0_0_15px_rgba(255,0,0,0.7)]
            leading-tight mb-4
          `}>
            VOID COMMUNICATION HUB
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-3 px-4 py-2 bg-black/50 border border-red-900/50 rounded-xl">
              {user.profilePic && (
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-red-600"
                />
              )}
              <div>
                <div className="font-bold text-red-400">{user.username}</div>
                <div className="text-xs text-red-500 flex items-center gap-1">
                  <GiNetworkBars />
                  <span>VOID CONNECTED</span>
                </div>
              </div>
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse ml-2"></div>
            </div>
            
            {/* Corruption Meter */}
            <div className="flex items-center gap-3 px-4 py-2 bg-black/50 border border-red-900/50 rounded-xl">
              <GiBrokenHeart className={heartbeat ? 'animate-pulse' : ''} />
              <div className="text-xs">
                <div>SYSTEM INTEGRITY</div>
                <div className="w-32 h-2 bg-black/70 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${100 - systemCorruption}%`,
                      background: `linear-gradient(90deg, #8b0000, ${neonColor})`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Terminal Output */}
        <div className="bg-black/90 border-2 border-red-900/50 p-4 mb-6 rounded-xl shadow-2xl shadow-red-900/20">
          <div className="flex items-center gap-2 text-red-400 text-sm mb-2">
            <FaBolt />
            <span>VOID TERMINAL OUTPUT</span>
          </div>
          <div className="h-24 overflow-y-auto font-mono text-red-300 text-xs leading-relaxed">
            {terminalMessages.map((msg, index) => (
              <div key={index} className={`mb-1 ${index === terminalMessages.length - 1 ? 'animate-pulse' : ''}`}>
                <span className="text-red-500">$</span> {msg}
              </div>
            ))}
            <div className="flex items-center mt-2">
              <span className="animate-pulse">▊</span>
              <span className="ml-2 text-red-400">_</span>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Sidebar - Online Users */}
          <div className="lg:w-1/4 bg-black/60 border-2 border-red-900/50 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-red-400 text-lg mb-4">
              <FiUser />
              <h2 className="font-bold uppercase tracking-wider">ACTIVE SOULS</h2>
              <span className="text-xs bg-red-900/50 px-2 py-1 rounded ml-auto">
                {onlineUsers.length} LIVE
              </span>
            </div>
            
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {onlineUsers.map((username, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-black/30 rounded-lg hover:bg-red-900/20 transition-colors"
                >
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                    <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-30"></div>
                  </div>
                  <span className="text-red-300">{username}</span>
                  {username === user.username && (
                    <span className="text-xs text-red-500 ml-auto bg-black/50 px-2 py-1 rounded">
                      YOU
                    </span>
                  )}
                </div>
              ))}
            </div>
            
            {/* Typing Indicator */}
            {typingUsers.length > 0 && (
              <div className="mt-4 p-3 bg-red-900/20 rounded-lg border border-red-900/30">
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <GiCctvCamera className="animate-pulse" />
                  <span>ACTIVITY DETECTED:</span>
                </div>
                <div className="text-xs text-red-300 mt-1">
                  {typingUsers.join(', ')} is communicating with the void...
                </div>
              </div>
            )}
          </div>

          {/* Chat Messages */}
          <div className="lg:w-3/4 flex flex-col">
            <div className="flex-1 bg-black/60 border-2 border-red-900/50 rounded-xl p-4 backdrop-blur-sm mb-4">
              <div className="h-[500px] overflow-y-auto space-y-4 p-2">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-4 rounded-lg border-l-4 ${
                      msg.user?.username === user.username
                        ? 'bg-red-900/10 border-red-600'
                        : 'bg-black/40 border-red-800'
                    }`}
                  >
                    {/* Message Header */}
                    <div className="flex items-center gap-3 mb-2">
                      {msg.user?.profilePic && (
                        <img
                          src={msg.user.profilePic}
                          alt="profile"
                          className="w-8 h-8 rounded-full border-2 border-red-700"
                        />
                      )}
                      <div className="flex-1">
                        <span
                          className="font-bold"
                          style={{ color: msg.user?.color || neonColor }}
                        >
                          {msg.user?.username}
                        </span>
                        <span className="text-xs text-red-500 ml-2">
                          {msg.timestamp}
                        </span>
                      </div>
                      <GiFingerPrint className="text-red-900/50" />
                    </div>
                    
                    {/* Message Content */}
                    <div className="text-gray-200 text-sm leading-relaxed">
                      {renderMessageContent(msg)}
                    </div>

                    {/* File Attachment */}
                    {msg.file && (
                      <div className="mt-3 p-3 bg-black/50 rounded-lg border border-red-900/30">
                        {msg.fileType?.startsWith('image/') ? (
                          <img
                            src={msg.file}
                            alt="Uploaded"
                            className="max-w-full max-h-48 rounded-lg border border-red-900/50"
                          />
                        ) : msg.fileType?.startsWith('video/') ? (
                          <video
                            src={msg.file}
                            controls
                            className="max-w-full max-h-48 rounded-lg border border-red-900/50"
                          />
                        ) : (
                          <div className="flex items-center gap-2 text-red-400">
                            <FiPaperclip />
                            <span>VOID ATTACHMENT</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="p-3 bg-red-900/10 rounded-lg border border-red-900/30">
                    <div className="flex items-center gap-2 text-red-400">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse delay-150"></span>
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse delay-300"></span>
                      <span className="text-sm ml-2">{user.username} is channeling the void...</span>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <div className="bg-black/60 border-2 border-red-900/50 rounded-xl p-4 backdrop-blur-sm">
              <form onSubmit={handleSend} className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="CHANNEL YOUR THOUGHTS INTO THE VOID..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 bg-black/70 border-2 border-red-800/50 text-red-300 
                               placeholder-red-500/50 font-mono rounded-lg focus:outline-none 
                               focus:border-red-500 focus:shadow-[0_0_20px_rgba(255,0,0,0.3)] 
                               transition-all"
                    />
                    <FiHash className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500/50" />
                  </div>
                  
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                  />
                  
                  <button
                    type="button"
                    onClick={handleFileClick}
                    className="px-4 py-3 bg-black/70 border-2 border-red-800/50 text-red-400 
                             rounded-lg hover:bg-red-900/30 hover:border-red-500 
                             transition-all flex items-center gap-2"
                  >
                    <FiPaperclip />
                    <span className="hidden sm:inline">ATTACH</span>
                  </button>
                  
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-red-900/40 to-black 
                             border-2 border-red-600 text-red-300 font-bold rounded-lg
                             hover:from-red-800/50 hover:to-black hover:border-red-500
                             hover:shadow-[0_0_30px_rgba(255,0,0,0.4)]
                             transition-all flex items-center gap-2"
                  >
                    <FiSend />
                    <span className="hidden sm:inline">TRANSMIT</span>
                  </button>
                </div>
                
                {/* File Preview */}
                {file && (
                  <div className="p-3 bg-red-900/10 rounded-lg border border-red-900/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-red-400">
                        <FiPaperclip />
                        <span className="text-sm">READY FOR VOID TRANSMISSION:</span>
                      </div>
                      <span className="text-xs text-red-500">{file.name}</span>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Footer Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`px-4 py-2 rounded-lg border-2 flex items-center gap-2 transition-all ${
              isMuted
                ? 'bg-black/50 border-red-900 text-red-700'
                : 'bg-red-900/20 border-red-600 text-red-400 hover:bg-red-900/30'
            }`}
          >
            {isMuted ? <FiMicOff /> : <FiMic />}
            <span>{isMuted ? 'AUDIO MUTED' : 'AUDIO ACTIVE'}</span>
          </button>
          
          <div className="flex items-center gap-4 text-sm text-red-500">
            <div className="flex items-center gap-2">
              <GiHeartBeats className={heartbeat ? 'animate-pulse' : ''} />
              <span>VOID PULSE: {heartbeat ? 'ACTIVE' : 'STABLE'}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaSkull />
              <span>SOULS ONLINE: {onlineUsers.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiRadio />
              <span>ENCRYPTION: AES-666</span>
            </div>
          </div>
        </div>

        {/* System Status Footer */}
        <div className="mt-8 pt-4 border-t border-red-900/30 text-center text-xs text-red-500/60">
          <div className="flex flex-wrap justify-center gap-4 mb-2">
            <span>⚡ VOID CHANNEL SECURE</span>
            <span>•</span>
            <span>👁️ ALL COMMUNICATIONS MONITORED</span>
            <span>•</span>
            <span>🔗 PERMANENT SOUL BINDING ACTIVE</span>
          </div>
          <div>
            SYSTEM TIME: {new Date().toLocaleTimeString()} | SERVER: VOID-HUB-666 | PROTOCOL: DEMONIC-TCP
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-in;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(139, 0, 0, 0.8);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 0, 0, 0.6);
        }
        
        body {
          background: #000;
          margin: 0;
          overflow-x: hidden;
        }
        
        input::placeholder {
          color: rgba(255, 0, 0, 0.3) !important;
        }
      `}</style>
    </div>
  );
}

export default CyberpunkHorrorChat;