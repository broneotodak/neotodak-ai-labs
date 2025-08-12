'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AnimatedGradientBgProps {
  className?: string;
  colors?: string[];
  speed?: number;
  mouseInteraction?: boolean;
}

export default function AnimatedGradientBg({
  className = "",
  colors = [
    '#000011',
    '#001122',
    '#002233',
    '#003344',
    '#001133',
    '#000022'
  ],
  speed = 0.5,
  mouseInteraction = true
}: AnimatedGradientBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  
  // Convert hex colors to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };
  
  const rgbColors = colors.map(hexToRgb);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    let time = 0;
    
    const animate = () => {
      if (!canvas || !ctx) return;
      
      time += speed;
      
      // Create gradient data
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      
      const centerX = canvas.width * 0.5;
      const centerY = canvas.height * 0.5;
      
      // Mouse influence
      const mouseX = mouseRef.current.x * canvas.width;
      const mouseY = mouseRef.current.y * canvas.height;
      
      for (let y = 0; y < canvas.height; y += 2) {
        for (let x = 0; x < canvas.width; x += 2) {
          const index = (y * canvas.width + x) * 4;
          
          // Distance from center
          const distFromCenter = Math.sqrt(
            Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
          ) / Math.max(canvas.width, canvas.height);
          
          // Distance from mouse
          const distFromMouse = Math.sqrt(
            Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2)
          ) / 200;
          
          // Create wave patterns
          const wave1 = Math.sin(time * 0.01 + distFromCenter * 10) * 0.5 + 0.5;
          const wave2 = Math.cos(time * 0.015 + x * 0.01 + y * 0.005) * 0.5 + 0.5;
          const wave3 = Math.sin(time * 0.008 + distFromMouse * 5) * 0.5 + 0.5;
          
          // Blend waves
          const blendFactor = (wave1 + wave2 + wave3) / 3;
          
          // Mouse interaction influence
          const mouseInfluence = mouseInteraction ? 
            Math.max(0, 1 - distFromMouse) * 0.3 : 0;
          
          // Color selection based on waves and position
          const colorIndex = Math.floor(
            (blendFactor + mouseInfluence + distFromCenter * 0.5) * 
            (rgbColors.length - 1)
          ) % rgbColors.length;
          
          const nextColorIndex = (colorIndex + 1) % rgbColors.length;
          const colorBlend = (blendFactor * rgbColors.length) % 1;
          
          const color1 = rgbColors[colorIndex];
          const color2 = rgbColors[nextColorIndex];
          
          // Interpolate colors
          const r = Math.floor(color1.r * (1 - colorBlend) + color2.r * colorBlend);
          const g = Math.floor(color1.g * (1 - colorBlend) + color2.g * colorBlend);
          const b = Math.floor(color1.b * (1 - colorBlend) + color2.b * colorBlend);
          
          // Apply to 2x2 pixel block for performance
          for (let dy = 0; dy < 2 && y + dy < canvas.height; dy++) {
            for (let dx = 0; dx < 2 && x + dx < canvas.width; dx++) {
              const pixelIndex = ((y + dy) * canvas.width + (x + dx)) * 4;
              
              data[pixelIndex] = r;     // Red
              data[pixelIndex + 1] = g; // Green
              data[pixelIndex + 2] = b; // Blue
              data[pixelIndex + 3] = 255; // Alpha
            }
          }
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
      
      // Add subtle overlay effects
      const gradient = ctx.createRadialGradient(
        mouseX, mouseY, 0,
        mouseX, mouseY, 300
      );
      gradient.addColorStop(0, 'rgba(0, 255, 255, 0.1)');
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [colors, speed, mouseInteraction, rgbColors]);
  
  const handleMouseMove = (event: React.MouseEvent) => {
    if (!mouseInteraction) return;
    
    mouseRef.current = {
      x: event.clientX / window.innerWidth,
      y: event.clientY / window.innerHeight
    };
  };
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Animated gradient canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        onMouseMove={handleMouseMove}
        style={{ 
          filter: 'blur(0.5px)',
          transform: 'scale(1.02)' // Slight scale to avoid edge artifacts
        }}
      />
      
      {/* Overlay effects */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 50% 80% at 50% 20%,
              rgba(0, 255, 255, 0.1),
              transparent 50%
            ),
            radial-gradient(
              ellipse 50% 80% at 80% 50%,
              rgba(255, 0, 255, 0.08),
              transparent 50%
            ),
            radial-gradient(
              ellipse 50% 80% at 20% 80%,
              rgba(0, 255, 128, 0.06),
              transparent 50%
            )
          `
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")
          `
        }}
      />
    </div>
  );
}