// src/components/AnimatedBackground.tsx
"use client";
import React, { useEffect, useRef } from "react";

// Updated to generate monochrome colors
const getMonochromeColor = (opacity: number = 1) => {
  const intensity = Math.floor(Math.random() * 105) + 180; // Range: 150-255 (lighter grays to white)
  return `rgba(${intensity}, ${intensity}, ${intensity}, ${opacity})`;
};

interface CircuitLine {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  color: string;
  isVertical: boolean; // To draw vertical or horizontal lines
  width: number;
}

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    
    const setCanvasDimensions = () => {
      // Full viewport width, height extends beyond section for blending
      canvas.width = window.innerWidth;
      const parentHeight = canvas.parentElement
        ? canvas.parentElement.offsetHeight
        : window.innerHeight;
      canvas.height = parentHeight + 400; // Extend 400px downwards for smooth blend
    };
    
    setCanvasDimensions(); 

    const lineCount = 750; // Increased for more density, adjust as needed
    const lines: CircuitLine[] = [];

    function initLines() {
      if (canvas == null) return;
    
      lines.length = 0; 
      const currentWidth = canvas.width; // Changed from canvas.width + 300
      const currentHeight = canvas.height;
      for (let i = 0; i < lineCount; i++) {
        const isVertical = Math.random() > 0.4; // Balance between vertical and horizontal
        lines.push({
          x: Math.random() * currentWidth,
          y: Math.random() * currentHeight,
          length: Math.random() * (isVertical ? 80 : 60) + (isVertical ? 30 : 20), // Slightly longer lines
          speed: Math.random() * 0.6 + 0.15, // Slightly slower and more consistent speeds
          opacity: Math.random() * 0.2 + 0.08, // Subtle but visible
          color: getMonochromeColor(Math.random() * 0.2 + 0.08),
          isVertical: isVertical,
          width: Math.random() * 1.0 + 0.2 // Slightly thinner for subtlety
        });
      }
    }
    initLines();

    const draw = () => {
      if (!ctx || !canvas) return;
      const currentWidth = canvas.width;
      const currentHeight = canvas.height;
      ctx.clearRect(0, 0, currentWidth, currentHeight); 

      lines.forEach((line) => {
        line.y += line.speed; // All lines drift downwards

        // Reset logic
        if (line.y > currentHeight + line.length) { // Common reset for both vertical and horizontal
          line.y = -line.length; 
          // Ensure x is reset within the current canvas width
          line.x = Math.random() * currentWidth; 
          // Optionally re-randomize other properties for variation upon reset
          line.opacity = Math.random() * 0.2 + 0.08;
          line.color = getMonochromeColor(line.opacity);
          line.speed = Math.random() * 0.6 + 0.15;
          line.length = Math.random() * (line.isVertical ? 80 : 60) + (line.isVertical ? 30 : 20);
        }

        ctx.beginPath();
        ctx.strokeStyle = line.color;
        ctx.lineWidth = line.width;
        
        if (line.isVertical) {
          ctx.moveTo(line.x, line.y - line.length);
          ctx.lineTo(line.x, line.y);
        } else {
          ctx.moveTo(line.x - line.length / 2, line.y);
          ctx.lineTo(line.x + line.length / 2, line.y);
        }
        ctx.stroke();
        
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      setCanvasDimensions(); // This will now use offsetWidth/Height
      initLines(); 
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-[calc(100%+400px)] z-0 pointer-events-none select-none"
      style={{
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0))',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0))'
      }}
      aria-hidden="true"
    />
  );
};

export default AnimatedBackground;
