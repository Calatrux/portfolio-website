// src/components/ToolkitSection.tsx
"use client";
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useScrollAnimate } from '@/hooks/useScrollAnimate';

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

const ToolCard = ({ tool }: { tool: Tool }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [gradientStyle, setGradientStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = rect.width;
    const percentage = (x / width) * 100;

    const colorStart = `rgba(120, 120, 120, ${0.4 + (percentage / 100) * 0.3})`;
    const colorEnd = `rgba(80, 80, 80, ${0.7 - (percentage / 100) * 0.3})`;
    const dynamicGradient = `linear-gradient(${90 + (percentage - 50) / 2}deg, ${colorEnd}, ${colorStart})`;

    setGradientStyle({ background: dynamicGradient });
  };

  const handleMouseLeave = () => {
    setGradientStyle({});
  };

  return (
    <div
      ref={cardRef}
      key={tool.name}
      className={`group bg-neutral-800/60 p-6 rounded-xl shadow-lg border border-neutral-700 
                  transform transition-all duration-300 ease-in-out 
                  hover:-translate-y-1.5 hover:scale-[1.03] 
                  hover:shadow-xl hover:border-neutral-600`}
      style={gradientStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col items-center text-center">
        <Image
          src={tool.logo}
          alt={tool.name + ' logo'}
          width={48}
          height={48}
          className="mb-4 w-12 h-12 object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
          loading="lazy"
        />
        <h3 className={`text-xl font-semibold text-gray-100 mb-2 group-hover:text-white`}>{tool.name}</h3>
        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300">
          {tool.description}
        </p>
      </div>
    </div>
  );
};


const ToolkitSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollAnimate(sectionRef as React.RefObject<HTMLElement>);

  return (
    <section
      id="toolkit"
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center py-24 px-4 md:px-8 scroll-animate"
    >
      <h2 className="text-5xl font-bold mb-12 text-center">My Tech Stack</h2>
      <p className="text-center text-gray-400 mb-10 max-w-2xl">
        A selection of technologies I leverage to create innovative and efficient solutions.
      </p>
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <ToolCard key={tool.name} tool={tool} />
        ))}
      </div>
    </section>
  );
};

export default ToolkitSection;
