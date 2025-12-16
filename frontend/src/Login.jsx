import { useState, useRef, useEffect, useCallback } from "react";
import { 
  FiEye, 
  FiEyeOff, 
  FiUpload, 
  FiLock, 
  FiUser, 
  FiAlertTriangle,
  FiCamera,
  FiMic,
  FiGlobe,
  FiRadio
} from "react-icons/fi";
import { 
  GiBlood, 
  GiBrokenHeart, 
  GiCctvCamera,
  GiSpiderWeb,
  GiFingerPrint,
  GiHeartBeats
} from "react-icons/gi";

function CyberpunkRedHorrorLogin({ onLogin }) {
  const [profilePic, setProfilePic] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [color, setColor] = useState("#ff0000");
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [hackingText, setHackingText] = useState("");
  const [scanLine, setScanLine] = useState(0);
  const [terminalText, setTerminalText] = useState([]);
  const [eyeOpen, setEyeOpen] = useState(false);
  const [bloodSplatter, setBloodSplatter] = useState([]);
  const [securityAlarm, setSecurityAlarm] = useState(false);
  const [biometricScan, setBiometricScan] = useState(false);
  const [faceDetection, setFaceDetection] = useState(false);
  const [voiceRecognition, setVoiceRecognition] = useState(false);
  const [systemCorruption, setSystemCorruption] = useState(0);
  const [pulse, setPulse] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [heartbeat, setHeartbeat] = useState(false);
  const [spiderWeb, setSpiderWeb] = useState([]);
  const [breathing, setBreathing] = useState(false);
  const [whisperAudio, setWhisperAudio] = useState(false);
  
  const canvasRef = useRef(null);
  const terminalRef = useRef(null);
  const heartbeatRef = useRef(null);
  const whisperRef = useRef(null);
  const breathingIntervalRef = useRef(null);

  // Terminal messages with horror themes
  const terminalMessages = [
    "> SYSTEM BOOT: WELCOME TO NIGHTMARE OS",
    "> BIOS: MULTIPLE ENTITIES DETECTED IN MEMORY",
    "> SCANNING: HEARTBEAT IRREGULAR - 180 BPM",
    "> WARNING: THEY ARE WATCHING THROUGH THE CAMERA",
    "> SECURITY: UNAUTHORIZED PRESENCE IN TERMINAL",
    "> AUDIO: WHISPERS DETECTED IN FEEDBACK LOOP",
    "> CORRUPTION: MEMORY SECTORS INFECTED",
    "> NETWORK: CONNECTION TO VOID ESTABLISHED",
    "> WARNING: DO NOT TRUST THE REFLECTION",
    "> ALERT: SYSTEM IS BREATHING WITH YOU",
    "> ENTITY: IT KNOWS YOUR NAME",
    "> CRITICAL: SHADOWS ARE MOVING",
    "> WARNING: THE SCREEN IS WATCHING BACK",
    "> ERROR: REALITY SYNTAX MALFUNCTION",
    "> FINAL WARNING: DO NOT COMPLETE THE LOGIN"
  ];

  // Play sound effect
  const playSound = useCallback((type) => {
    try {
      const audio = new Audio();
      if (type === 'click') {
        audio.src = 'https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3';
      } else if (type === 'glitch') {
        audio.src = 'https://assets.mixkit.co/sfx/preview/mixkit-computer-glitch-2344.mp3';
      } else if (type === 'heartbeat') {
        audio.src = 'https://assets.mixkit.co/sfx/preview/mixkit-heartbeat-1205.mp3';
      } else if (type === 'scream') {
        audio.src = 'https://assets.mixkit.co/sfx/preview/mixkit-horror-scream-387.mp3';
      }
      audio.volume = type === 'scream' ? 0.2 : 0.3;
      audio.play().catch(() => {});
    } catch (error) {
      console.error("Sound error");
    }
  }, []);

  // Add terminal message
  const addTerminalMessage = useCallback((message) => {
    setTerminalText(prev => {
      const newMessages = [...prev, message];
      if (newMessages.length > 8) newMessages.shift();
      return newMessages;
    });
  }, []);

  // Initialize terminal
  useEffect(() => {
    const initMessages = [
      "> INITIALIZING NIGHTMARE OS v9.6.6",
      "> SCANNING FOR HOSTILE ENTITIES...",
      "> WARNING: SYSTEM COMPROMISED",
      "> ENTER CREDENTIALS AT YOUR OWN RISK"
    ];
    setTerminalText(initMessages);
  }, []);

  // Glitch animation with horror effects
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true);
      playSound('glitch');
      setTimeout(() => setGlitchEffect(false), Math.random() * 150 + 50);
      
      // Random horror effects
      if (Math.random() > 0.6) {
        setEyeOpen(true);
        setTimeout(() => setEyeOpen(false), 800);
      }
      
      // Add blood splatter randomly
      if (Math.random() > 0.9) {
        const newSplatter = [...bloodSplatter];
        if (newSplatter.length > 8) newSplatter.shift();
        newSplatter.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 25 + 15,
          opacity: Math.random() * 0.4 + 0.3
        });
        setBloodSplatter(newSplatter);
      }
      
      // Add spider webs
      if (Math.random() > 0.95) {
        const newWebs = [...spiderWeb];
        if (newWebs.length > 3) newWebs.shift();
        newWebs.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 30 + 20
        });
        setSpiderWeb(newWebs);
      }
      
      // Random terminal messages
      if (Math.random() > 0.7 && terminalText.length > 0) {
        const randomMessage = terminalMessages[Math.floor(Math.random() * terminalMessages.length)];
        addTerminalMessage(randomMessage);
      }
      
      // Random scream
      if (Math.random() > 0.98) {
        playSound('scream');
      }
      
    }, 2000);
    
    return () => clearInterval(glitchInterval);
  }, [bloodSplatter, spiderWeb, terminalText]);

  // Scan line animation
  useEffect(() => {
    const interval = setInterval(() => {
      setScanLine((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Heartbeat effect
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartbeat(!heartbeat);
      if (heartbeat && Math.random() > 0.7) {
        playSound('heartbeat');
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [heartbeat]);

  // Breathing effect
  useEffect(() => {
    breathingIntervalRef.current = setInterval(() => {
      setBreathing(prev => !prev);
    }, 3000);
    return () => clearInterval(breathingIntervalRef.current);
  }, []);

  // Matrix rain effect on canvas - RED VERSION
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
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
      // Dark red background
      ctx.fillStyle = 'rgba(10, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw blood drips
      for(let i = 0; i < 5; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const length = Math.random() * 100 + 50;
        
        ctx.strokeStyle = `rgba(255, 0, 0, ${Math.random() * 0.2})`;
        ctx.lineWidth = Math.random() * 2 + 1;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + length);
        ctx.stroke();
      }
      
      // Draw the rain
      ctx.font = `bold ${fontSize}px 'Noto Sans JP', monospace`;
      
      for(let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        
        for(let j = 0; j < drop.length; j++) {
          const charY = drop.y - (j * fontSize);
          if (charY > -fontSize && charY < canvas.height) {
            const opacity = 1 - (j / drop.length);
            const brightness = 80 - j * 3;
            ctx.fillStyle = `hsla(${drop.hue}, 100%, ${brightness}%, ${opacity * 0.8})`;
            
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
      
      // Draw glitch effect
      if (glitchEffect) {
        for(let x = 0; x < canvas.width; x += 20) {
          for(let y = 0; y < canvas.height; y += 20) {
            if (Math.random() > 0.7) {
              ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
              ctx.fillRect(x, y, 3, 3);
            }
          }
        }
      }
    };
    
    const interval = setInterval(draw, 50);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [color, glitchEffect]);

  // Security alarm effect
  useEffect(() => {
    if (!securityAlarm) return;
    
    const interval = setInterval(() => {
      setColor(prev => prev === '#ff0000' ? '#990000' : '#ff0000');
    }, 200);
    
    return () => {
      clearInterval(interval);
      setColor('#ff0000');
    };
  }, [securityAlarm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    playSound('click');
    
    if (username.trim() === "" || password.trim() === "") {
      setHackingText("ACCESS DENIED: CREDENTIALS REQUIRED");
      setSecurityAlarm(true);
      addTerminalMessage("> ERROR: INCOMPLETE CREDENTIALS");
      setTimeout(() => setSecurityAlarm(false), 2000);
      return;
    }
    
    // Start biometric scan
    setBiometricScan(true);
    setHackingText("INITIATING BIO-HAZARD SCAN...");
    addTerminalMessage("> SCANNING BIO-SIGNATURES...");
    
    setTimeout(() => {
      setFaceDetection(true);
      setHackingText("FACE SCAN: MULTIPLE ENTITIES DETECTED");
      addTerminalMessage("> WARNING: MULTIPLE FACES IN FRAME");
      playSound('glitch');
    }, 1000);
    
    setTimeout(() => {
      setVoiceRecognition(true);
      setHackingText("VOICE ANALYSIS: DEMONIC PRESENCE CONFIRMED");
      addTerminalMessage("> VOICE PRINT: NON-HUMAN ENTITY");
      playSound('scream');
    }, 2000);
    
    setTimeout(() => {
      setHackingText("SYSTEM CORRUPTION: 66.6%");
      setSystemCorruption(66);
      addTerminalMessage("> WARNING: DEMONIC INFESTATION DETECTED");
    }, 3000);
    
    setTimeout(() => {
      setHackingText("CREDENTIALS ACCEPTED - WELCOME TO HELL");
      setSystemCorruption(100);
      addTerminalMessage("> ACCESS GRANTED: GATES OF HELL OPENED");
      
      onLogin({ 
        username, 
        profilePic, 
        color,
        accessLevel: 666,
        corruption: systemCorruption
      });
    }, 4000);
    
    setTimeout(() => {
      setBiometricScan(false);
      setFaceDetection(false);
      setVoiceRecognition(false);
      setHackingText("");
    }, 5000);
  };

  const handleFileUpload = (e) => {
    if (e.target.files[0]) {
      setProfilePic(URL.createObjectURL(e.target.files[0]));
      playSound('glitch');
      addTerminalMessage("> IMAGE ANALYSIS: SOUL CAPTURED");
      addTerminalMessage("> WARNING: ENTITY BOUND TO PROFILE");
    }
  };

  return (
    <div 
      ref={heartbeatRef}
      className={`
        relative overflow-hidden min-h-screen p-4 md:p-6
        bg-gradient-to-br from-black via-gray-900 to-black
        font-['Share_Tech_Mono'] text-red-500
        border-4 border-red-900
        ${securityAlarm ? 'animate-pulse' : ''}
        ${heartbeat ? 'scale-[1.001]' : 'scale-100'}
        transition-transform duration-300
      `}
      style={{
        boxShadow: `
          inset 0 0 100px rgba(255, 0, 0, 0.2),
          0 0 60px rgba(255, 0, 0, 0.4),
          0 0 20px rgba(139, 0, 0, 0.6)
        `
      }}
    >
      {/* Scan Line */}
      <div 
        className="absolute left-0 w-full h-[2px] z-10 pointer-events-none"
        style={{
          top: `${scanLine}%`,
          background: `linear-gradient(90deg, transparent, ${color}, ${color}, transparent)`,
          opacity: 0.9,
          filter: 'blur(1px)',
          boxShadow: '0 0 20px rgba(255, 0, 0, 0.8)'
        }}
      />
      
      {/* Blood Splatters */}
      {bloodSplatter.map((splatter, index) => (
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
          <GiBlood className="w-full h-full text-red-900 opacity-50" />
        </div>
      ))}
      
      {/* Spider Webs */}
      {spiderWeb.map((web, index) => (
        <div
          key={index}
          className="absolute pointer-events-none animate-spin-slow"
          style={{
            left: `${web.x}%`,
            top: `${web.y}%`,
            width: `${web.size}px`,
            height: `${web.size}px`,
            zIndex: 1
          }}
        >
          <GiSpiderWeb className="w-full h-full text-red-900 opacity-30" />
        </div>
      ))}
      
      {/* Matrix Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full opacity-40 z-0"
      />
      
      {/* Main Container */}
      <div className="relative z-20 max-w-4xl mx-auto mt-4 md:mt-12 lg:mt-20 px-2 sm:px-4">
        
        {/* Header */}
        <div className="text-center mb-6 md:mb-10">
          <div className="relative inline-block mb-4">
            <h1 className={`
              text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
              font-black uppercase tracking-tighter
              ${glitchEffect ? 'translate-x-1 translate-y-1' : ''}
              transition-transform duration-75
              bg-clip-text text-transparent
              bg-gradient-to-r from-red-500 via-red-600 to-red-800
              drop-shadow-[0_0_15px_rgba(255,0,0,0.7)]
              leading-tight
            `}>
              {glitchEffect ? "HELL_PORTAL v9.6.6" : "NIGHTMARE TERMINAL"}
            </h1>
            <div className="absolute -inset-1 bg-red-900/20 blur-xl -z-10"></div>
          </div>
          
          {/* Subtitle */}
          <div className="text-red-400 text-sm sm:text-base md:text-lg tracking-widest mb-6 animate-pulse">
            <FiAlertTriangle className="inline mr-2 mb-1" />
            DEMONIC ACCESS POINT • AUTHORIZED PERSONNEL ONLY
          </div>
          
          {/* Terminal Output */}
          <div 
            ref={terminalRef}
            className="
              bg-black/90 border-2 border-red-900/50 p-3 sm:p-4 mb-6
              h-32 sm:h-40 md:h-48 overflow-y-auto font-mono
              text-red-300 leading-relaxed text-xs sm:text-sm
              shadow-2xl shadow-red-900/30
              rounded-lg
              scrollbar-thin scrollbar-thumb-red-900 scrollbar-track-black
            "
            style={{
              background: 'linear-gradient(135deg, rgba(0,0,0,0.95), rgba(20,0,0,0.9))'
            }}
          >
            {terminalText.map((line, index) => (
              <div 
                key={index} 
                className={`mb-1 ${index === terminalText.length - 1 ? 'animate-pulse' : ''}`}
              >
                <span className="text-red-500">$</span> {line}
              </div>
            ))}
            <div className="flex items-center mt-2 text-red-500">
              <span className="animate-pulse">▊</span>
              <span className="ml-2 text-red-400">_</span>
            </div>
          </div>
          
          {/* Corruption Meter */}
          <div className="mb-6 md:mb-8">
            <div className="flex justify-between items-center text-xs sm:text-sm mb-2">
              <div className="flex items-center gap-2">
                <GiBrokenHeart className={`${heartbeat ? 'animate-pulse' : ''}`} />
                <span>SYSTEM INTEGRITY</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">{100 - systemCorruption}%</span>
                <GiHeartBeats className={`${heartbeat ? 'animate-pulse' : ''}`} />
              </div>
            </div>
            <div className="w-full h-3 bg-black/50 border border-red-900/50 rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-700 rounded-full"
                style={{
                  width: `${100 - systemCorruption}%`,
                  background: `linear-gradient(90deg, 
                    rgba(139,0,0,0.8), 
                    rgba(255,0,0,0.9),
                    rgba(255,100,100,1)
                  )`,
                  boxShadow: 'inset 0 0 10px rgba(255,0,0,0.5), 0 0 20px rgba(255,0,0,0.3)'
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Hacking Text */}
        <div className={`
          text-center mb-6 md:mb-8 font-bold 
          uppercase tracking-widest text-sm sm:text-base
          ${securityAlarm ? 'text-red-500 animate-pulse-fast' : 'text-red-400'}
          drop-shadow-[0_0_10px_rgba(255,0,0,0.7)]
          min-h-[24px] sm:min-h-[28px]
        `}>
          {hackingText || "AWAITING DEMONIC CREDENTIALS..."}
        </div>
        
        {/* Biometric Scanner */}
        {biometricScan && (
          <div className="flex flex-col sm:flex-row justify-around items-center gap-4 bg-black/60 border-2 border-red-900/50 p-4 mb-6 rounded-xl shadow-2xl shadow-red-900/20">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm mb-2">
                <FiCamera />
                <span>DEMONIC FACE SCAN</span>
              </div>
              <div className={`
                relative w-12 h-12 sm:w-16 sm:h-16 rounded-full mx-auto mb-2
                flex items-center justify-center
                ${faceDetection ? 'animate-pulse-fast' : pulse ? 'animate-pulse' : ''}
                border-2 ${faceDetection ? 'border-red-500' : 'border-red-700'}
              `}
              style={{
                background: faceDetection ? 
                  'radial-gradient(circle, rgba(255,0,0,0.3), transparent)' :
                  'radial-gradient(circle, rgba(139,0,0,0.2), transparent)',
                boxShadow: `0 0 ${faceDetection ? '30px' : '20px'} ${faceDetection ? '#ff0000' : '#8b0000'}`
              }}>
                <GiCctvCamera className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className={`text-xs sm:text-sm ${faceDetection ? 'text-red-500 font-bold' : 'text-red-400'}`}>
                {faceDetection ? "DEMONIC PRESENCE" : "SCANNING SOUL..."}
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm mb-2">
                <FiMic />
                <span>VOID VOICE SCAN</span>
              </div>
              <div className={`
                relative w-12 h-12 sm:w-16 sm:h-16 rounded-full mx-auto mb-2
                flex items-center justify-center
                ${voiceRecognition ? 'animate-pulse-fast' : pulse ? 'animate-pulse' : ''}
                border-2 ${voiceRecognition ? 'border-red-500' : 'border-red-700'}
              `}
              style={{
                background: voiceRecognition ? 
                  'radial-gradient(circle, rgba(255,0,0,0.3), transparent)' :
                  'radial-gradient(circle, rgba(139,0,0,0.2), transparent)',
                boxShadow: `0 0 ${voiceRecognition ? '30px' : '20px'} ${voiceRecognition ? '#ff0000' : '#8b0000'}`
              }}>
                <FiRadio className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className={`text-xs sm:text-text-sm ${voiceRecognition ? 'text-red-500 font-bold' : 'text-red-400'}`}>
                {voiceRecognition ? "HELLSPAWN DETECTED" : "ANALYZING WHISPERS..."}
              </div>
            </div>
          </div>
        )}
        
        {/* Login Form */}
        <div className="
          bg-gradient-to-br from-black/90 via-gray-900/90 to-black/90
          backdrop-blur-sm p-4 sm:p-6 md:p-8 lg:p-10
          border-2 border-red-900/50
          shadow-2xl shadow-red-900/30
          rounded-2xl
          mb-8
        ">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            
            {/* File Upload */}
            <label className={`
              block w-full p-3 sm:p-4 cursor-pointer
              border-3 border-dashed border-red-800
              bg-gradient-to-r from-black to-gray-900/80
              hover:from-gray-900 hover:to-black
              active:scale-[0.98]
              transition-all duration-300
              uppercase tracking-widest text-xs sm:text-sm
              text-center rounded-xl
              group
              ${breathing ? 'border-red-600' : 'border-red-800'}
            `}>
              <div className="flex items-center justify-center gap-2">
                <FiUpload className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
                <span>UPLOAD SOUL IMPRINT (REQUIRED)</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                required
              />
              <div className="text-red-400/60 text-xs mt-2">
                DEMONS CAN SEE YOUR FACE
              </div>
            </label>
            
            {/* Profile Preview */}
            {profilePic && (
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto mb-4 sm:mb-6">
                <div className={`
                  w-full h-full rounded-full overflow-hidden
                  border-4 border-red-700
                  shadow-2xl shadow-red-900/50
                  relative
                  ${eyeOpen ? 'animate-pulse-fast' : ''}
                `}
                style={{
                  boxShadow: `
                    0 0 30px rgba(255, 0, 0, 0.5),
                    inset 0 0 20px rgba(0, 0, 0, 0.8)
                  `
                }}>
                  <img 
                    src={profilePic} 
                    alt="Soul Imprint" 
                    className="w-full h-full object-cover filter grayscale brightness-75 contrast-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-red-900/20 to-transparent"></div>
                </div>
                <div className="
                  absolute -bottom-2 left-1/2 transform -translate-x-1/2
                  bg-black/90 text-red-500 text-xs px-3 py-1
                  border border-red-800 rounded-full
                  uppercase tracking-widest
                  shadow-lg shadow-red-900/50
                  flex items-center gap-1
                ">
                  <GiFingerPrint />
                  <span>SOUL BOUND</span>
                </div>
              </div>
            )}
            
            {/* Username Input */}
            <div className="relative">
              <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-red-500/70">
                <FiUser className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <input
                type="text"
                placeholder="ENTER DEMONIC CODENAME"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => playSound('click')}
                className={`
                  w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4
                  bg-black/70 border-2 border-red-800/50
                  text-red-300 placeholder-red-500/50
                  font-mono uppercase tracking-widest text-xs sm:text-sm
                  focus:outline-none focus:border-red-500
                  focus:shadow-[0_0_20px_rgba(255,0,0,0.3)]
                  transition-all duration-300
                  rounded-xl
                  ${username && 'border-red-500'}
                `}
                style={{
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.8), rgba(20,0,0,0.7))'
                }}
                required
              />
            </div>
            
            {/* Password Input */}
            <div className="relative">
              <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-red-500/70">
                <FiLock className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="ENTER INFERNAL ENCRYPTION KEY"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => playSound('click')}
                className={`
                  w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4
                  bg-black/70 border-2 border-red-800/50
                  text-red-300 placeholder-red-500/50
                  font-mono uppercase tracking-widest text-xs sm:text-sm
                  focus:outline-none focus:border-red-500
                  focus:shadow-[0_0_20px_rgba(255,0,0,0.3)]
                  transition-all duration-300
                  rounded-xl
                  ${password && 'border-red-500'}
                `}
                style={{
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.8), rgba(20,0,0,0.7))'
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-red-500/70 hover:text-red-400 transition-colors"
              >
                {showPassword ? <FiEyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <FiEye className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </div>
            
            {/* Warning Text */}
            <div className="text-center py-3 sm:py-4 border-2 border-red-900/30 rounded-xl bg-black/40">
              <div className="flex items-center justify-center gap-2 text-red-500 text-xs sm:text-sm uppercase tracking-widest animate-pulse mb-1">
                <FiAlertTriangle />
                <span>WARNING: DEMONIC ENTITIES ACTIVE</span>
              </div>
              <div className="text-red-400/70 text-xs">
                ALL SOULS ARE PERMANENTLY BOUND TO SYSTEM
              </div>
            </div>
            
            {/* Submit Button */}
            <button 
              type="submit"
              className={`
                w-full py-3 sm:py-4 md:py-5
                bg-gradient-to-r from-black via-red-900/30 to-black
                border-2 border-red-700
                text-red-300 font-black uppercase tracking-widest
                text-sm sm:text-base
                hover:from-red-900/40 hover:to-black
                hover:border-red-500
                hover:shadow-[0_0_40px_rgba(255,0,0,0.5)]
                active:scale-[0.98]
                transition-all duration-300
                rounded-xl
                relative overflow-hidden
                ${pulse ? 'animate-pulse-slow' : ''}
                group
              `}
              style={{
                boxShadow: `
                  inset 0 0 20px rgba(255, 0, 0, 0.2),
                  0 0 30px rgba(255, 0, 0, 0.3)
                `
              }}
              onMouseEnter={() => {
                playSound('click');
                setHeartbeat(true);
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <FiGlobe className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-spin" />
                INITIATE DEMONIC CONNECTION
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent animate-shimmer"></div>
            </button>
          </form>
          
          {/* Footer */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-red-900/30 text-center text-xs sm:text-sm text-red-400/60 tracking-widest leading-relaxed">
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 mb-3">
              <span className="flex items-center gap-1">
                <GiCctvCamera className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>24/7 SOUL MONITORING</span>
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <GiFingerPrint className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>BIOMETRIC TRACKING</span>
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <GiHeartBeats className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>HEARTBEAT ANALYSIS</span>
              </span>
            </div>
            <div className="text-red-500/40 text-xs">
              SYSTEM TIME: {new Date().toLocaleTimeString()} • VERSION: 9.6.6 • SOULS BOUND: ∞
            </div>
            <div className="mt-2 text-red-900 text-[10px] sm:text-xs">
              ⚠️ THIS TERMINAL IS A GATEWAY TO THE VOID • ESCAPE IS IMPOSSIBLE
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom CSS */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        
        @keyframes pulse-fast {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-pulse-fast {
          animation: pulse-fast 0.5s infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-in;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        
        .scrollbar-thumb-red-900::-webkit-scrollbar-thumb {
          background-color: rgba(139, 0, 0, 0.8);
          border-radius: 4px;
        }
        
        .scrollbar-track-black::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        body {
          background: #000;
          margin: 0;
          overflow-x: hidden;
        }
        
        input::placeholder {
          color: rgba(255, 0, 0, 0.3) !important;
        }
        
        input:focus {
          outline: none !important;
        }
      `}</style>
    </div>
  );
}

export default CyberpunkRedHorrorLogin;