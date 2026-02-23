// src/components/HeroName.tsx
"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from './AnimatedBackground';

const adjectives = ["a high school student", "a software engineer", "a full stack developer", "a video game designer", "a robotics programmer", "a data scientist", "a passionate learner"];

const HeroName = () => {
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
        setTimeout(() => setIsDeleting(true), 2500); // Wait longer before deleting
      } else if (isDeleting && displayedAdjective === "") {
        setIsDeleting(false);
        setCurrentAdjectiveIndex((prev) => (prev + 1) % adjectives.length);
      }
    };

    // Make typing slightly smoother and deletion faster
    const typingSpeed = isDeleting ? 30 : 80;
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedAdjective, isDeleting, currentAdjectiveIndex]);

  // Framer motion variants
  const containerVariants: import('framer-motion').Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger text reveals
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: import('framer-motion').Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center relative w-full max-w-full overflow-hidden">
      {/* Background glow for premium feel */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none" />

      <AnimatedBackground />

      <motion.div
        className="z-10 relative p-6 max-w-4xl w-full flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/60 drop-shadow-sm leading-none"
        >
          I'm Shubham,
        </motion.h1>

        <motion.div variants={itemVariants} className="h-[60px] sm:h-[90px] flex items-center justify-center">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-neutral-400 mb-6 flex items-center">
            {displayedAdjective}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
              className="ml-1 w-[2px] md:w-[3px] h-[28px] sm:h-[40px] md:h-[48px] bg-white inline-block"
            />
          </h2>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-xl text-neutral-400/80 max-w-2xl font-light leading-relaxed mt-2"
        >
          A passionate 17-year-old high school senior using computer science to build innovative solutions and empower others.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-10 flex gap-4">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full bg-white text-black font-semibold tracking-wide transition-colors duration-300"
          >
            View Projects
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ backgroundColor: "rgba(38, 38, 38, 1)" }} // bg-neutral-800 equivalent
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full bg-neutral-900 border border-neutral-800 text-white font-medium transition-colors duration-300"
          >
            Contact Me
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroName;
