// src/components/HeroName.tsx
"use client";
import React, { useRef, useState, useEffect } from 'react';
import { useScrollAnimate } from '@/hooks/useScrollAnimate'; 
import AnimatedBackground from '././AnimatedBackground'; // New component for the background

const adjectives = ["a high school student", "a software engineer", "a full stack developer", "a video game designer", "a robotics programmer", "a data scientist", "a passionate learner"];

const HeroName = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollAnimate(sectionRef as React.RefObject<HTMLElement>);

  const [currentAdjectiveIndex, setCurrentAdjectiveIndex] = useState(0);
  const [displayedAdjective, setDisplayedAdjective] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = adjectives[currentAdjectiveIndex];
      if (isDeleting) {
        setDisplayedAdjective(fullText.substring(0, displayedAdjective.length - 1));
      } else {
        setDisplayedAdjective(fullText.substring(0, displayedAdjective.length + 1));
      }

      if (!isDeleting && displayedAdjective === fullText) {
        // Pause at end of word
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayedAdjective === "") {
        setIsDeleting(false);
        setCurrentAdjectiveIndex((prev) => (prev + 1) % adjectives.length);
      }
    };

    const typingSpeed = isDeleting ? 50 : 100;
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedAdjective, isDeleting, currentAdjectiveIndex]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center text-center relative w-full max-w-full" // Removed overflow-hidden
    >
      <AnimatedBackground /> {/* Add the animated background */}
      <div className="z-10 relative p-8"> {/* Added p-8 here for content padding */}
        <h1 className="text-6xl sm:text-8xl font-bold tracking-tight mb-2">
          I&apos;m Shubham,
        </h1>
        <h2 className="text-5xl sm:text-7xl font-semibold tracking-tight text-gray-300 mb-6 min-h-[80px] sm:min-h-[100px]"> {/* Changed text-cyan-400 to text-gray-300 for monochrome */}
          {displayedAdjective}
          <span className="animate-pulse">|</span> {/* Blinking cursor */}
        </h2>
        <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl"> {/* Increased max-width for longer description */}
          A passionate 16-year-old high school senior using computer science to build innovative solutions and empower others.
        </p>
      </div>
    </section>
  );
};

export default HeroName;
