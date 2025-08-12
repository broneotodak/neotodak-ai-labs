'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypewriterGlowProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  glowColor?: string;
}

export default function TypewriterGlow({
  text,
  className = "",
  delay = 0,
  speed = 100,
  glowColor = "#00ffff"
}: TypewriterGlowProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  
  // Typewriter effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }
    }, currentIndex === 0 ? delay : speed);
    
    return () => clearTimeout(timer);
  }, [currentIndex, text, delay, speed]);
  
  // Cursor blinking
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    // Stop cursor blinking when typing is complete
    if (currentIndex >= text.length) {
      setTimeout(() => {
        setShowCursor(false);
      }, 2000);
    }
    
    return () => clearInterval(cursorTimer);
  }, [currentIndex, text.length]);
  
  return (
    <div className={`relative ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Main text with multiple glow layers */}
        <span
          className="relative z-10"
          style={{
            textShadow: `
              0 0 5px ${glowColor},
              0 0 10px ${glowColor},
              0 0 15px ${glowColor},
              0 0 20px ${glowColor}80,
              0 0 35px ${glowColor}60,
              0 0 40px ${glowColor}40
            `,
            filter: 'brightness(1.2)',
          }}
        >
          {displayedText.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.1,
                delay: index * 0.02,
                ease: "easeOut"
              }}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
          
          {/* Animated cursor */}
          <AnimatePresence>
            {showCursor && (
              <motion.span
                initial={{ opacity: 1 }}
                animate={{ opacity: [1, 0, 1] }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="ml-1 text-cyan-400"
                style={{
                  textShadow: `
                    0 0 5px ${glowColor},
                    0 0 10px ${glowColor},
                    0 0 15px ${glowColor}
                  `,
                }}
              >
                |
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        
        {/* Background glow effect */}
        <div
          className="absolute inset-0 blur-xl opacity-30"
          style={{
            background: `linear-gradient(90deg, transparent, ${glowColor}20, transparent)`,
            animation: 'pulse 2s ease-in-out infinite'
          }}
        />
        
        {/* Additional ambient glow */}
        <div
          className="absolute inset-0 -m-4 rounded-lg opacity-20"
          style={{
            background: `radial-gradient(ellipse at center, ${glowColor}30, transparent 70%)`,
            filter: 'blur(20px)'
          }}
        />
      </motion.div>
      
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}