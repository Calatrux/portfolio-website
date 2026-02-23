// src/components/ToolkitSection.tsx
"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Tool {
  name: string;
  description: string;
  logo: string;
  category: 'Frontend' | 'Backend & General' | 'Database' | 'Game Development';
}

const tools: Tool[] = [
  { name: 'React', description: 'A JavaScript library for building user interfaces.', logo: '/logos/react.svg', category: 'Frontend' },
  { name: 'Next.js', description: 'The React framework for production web applications.', logo: '/logos/nextjs.svg', category: 'Frontend' },
  { name: 'TypeScript', description: 'JavaScript with syntax for types, enhancing code quality.', logo: '/logos/typescript.svg', category: 'Frontend' },
  { name: 'JavaScript', description: 'The programming language of the Web.', logo: '/logos/javascript.svg', category: 'Frontend' },
  { name: 'HTML', description: 'The markup language for structuring web content.', logo: '/logos/htmlcss.svg', category: 'Frontend' },
  { name: 'CSS', description: 'The style sheet language for designing web pages.', logo: '/logos/css.svg', category: 'Frontend' },
  { name: 'Java', description: 'Versatile, object-oriented language for large-scale apps.', logo: '/logos/java.svg', category: 'Backend & General' },
  { name: 'Python', description: 'High-level language for web, data science, and AI.', logo: '/logos/python.svg', category: 'Backend & General' },
  { name: 'C#', description: 'Modern language by Microsoft for web, game, and enterprise.', logo: '/logos/csharp.svg', category: 'Backend & General' },
  { name: 'PostgreSQL', description: 'Powerful, open-source object-relational database system.', logo: '/logos/postgresql.svg', category: 'Database' },
  { name: 'MongoDB', description: 'Source-available cross-platform document-oriented database.', logo: '/logos/mongodb.svg', category: 'Database' },
  { name: 'Unity', description: 'Cross-platform game engine for 2D and 3D games.', logo: '/logos/unity.svg', category: 'Game Development' },
];

const ToolCard = ({ tool, index }: { tool: Tool, index: number }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -5, boxShadow: "0 8px 30px rgba(0,0,0,0.4)" }}
      onMouseMove={handleMouseMove}
      className="group relative rounded-2xl p-[1px] overflow-hidden bg-white/5 transition-colors"
    >
      {/* Glowing border effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.4), transparent 40%)`,
        }}
      />

      {/* Inner solid part of the card */}
      <div className="relative h-full w-full rounded-[15px] bg-neutral-950 p-5 md:p-6 flex flex-col items-center text-center z-10 transition-colors duration-300 group-hover:bg-neutral-900/90">
        <Image
          src={tool.logo}
          alt={tool.name + ' logo'}
          width={40}
          height={40}
          className="mb-4 w-10 h-10 object-contain transition-transform duration-300 ease-in-out group-hover:scale-110 drop-shadow-sm"
          loading="lazy"
        />
        <h3 className="text-lg md:text-xl font-semibold text-gray-100 mb-2 group-hover:text-white tracking-tight">
          {tool.name}
        </h3>
        <p className="text-neutral-400 text-xs md:text-sm leading-relaxed group-hover:text-neutral-300 font-light">
          {tool.description}
        </p>

        {/* Inner subtle glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-[15px]"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.03), transparent 40%)`,
          }}
        />
      </div>
    </motion.div>
  );
};


const ToolkitSection = () => {
  return (
    <section
      id="toolkit"
      className="min-h-screen flex flex-col justify-center items-center py-24 px-4 md:px-8 w-full relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center z-10"
      >
        <h2 className="text-5xl md:text-[4rem] font-bold mb-6 tracking-tighter text-white">My Tech Stack</h2>
        <p className="text-neutral-400 text-lg md:text-xl mb-16 max-w-2xl font-light">
          A selection of technologies I leverage to create innovative and efficient solutions.
        </p>
      </motion.div>

      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {tools.map((tool, index) => (
          <ToolCard key={tool.name} tool={tool} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ToolkitSection;
