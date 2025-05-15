"use client";
import React, { useEffect, useRef } from "react";

const getMonochromeColor = (opacity: number = 1) => {
  const intensity = Math.floor(Math.random() * 105) + 180;
  return `rgba(${intensity}, ${intensity}, ${intensity}, ${opacity})`;
};

interface CircuitLine {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  color: string;
  isVertical: boolean;
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
      canvas.width = window.innerWidth;
      const parentHeight = canvas.parentElement
        ? canvas.parentElement.offsetHeight
        : window.innerHeight;
      canvas.height = parentHeight + 400;
    };
    
    setCanvasDimensions();

    const lineCount = 750;
    const lines: CircuitLine[] = [];

    function initLines() {
      if (canvas == null) return;
      lines.length = 0;
      const currentWidth = canvas.width;
      const currentHeight = canvas.height;
      for (let i = 0; i < lineCount; i++) {
        const isVertical = Math.random() > 0.4;
        lines.push({
          x: Math.random() * currentWidth,
          y: Math.random() * currentHeight,
          length: Math.random() * (isVertical ? 80 : 60) + (isVertical ? 30 : 20),
          speed: Math.random() * 0.6 + 0.15,
          opacity: Math.random() * 0.2 + 0.08,
          color: getMonochromeColor(Math.random() * 0.2 + 0.08),
          isVertical: isVertical,
          width: Math.random() * 1.0 + 0.2
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
        line.y += line.speed;

        if (line.y > currentHeight + line.length) {
          line.y = -line.length;
          line.x = Math.random() * currentWidth;
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
      setCanvasDimensions();
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
