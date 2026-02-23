// src/components/ProjectsSection.tsx
"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  imageSlug: string;
  imageCount: number;
  imageFileExtension?: string;
}

interface TechLogo {
  name: string;
  src: string;
}

const allTechLogos: TechLogo[] = [
  { name: 'React', src: '/logos/react.svg' },
  { name: 'Next.js', src: '/logos/nextjs.svg' },
  { name: 'Tailwind CSS', src: '/logos/tailwindcss.svg' },
  { name: 'TypeScript', src: '/logos/typescript.svg' },
  { name: 'Java', src: '/logos/java.svg' },
  { name: 'Python', src: '/logos/python.svg' },
  { name: 'C#', src: '/logos/csharp.svg' },
  { name: 'HTML', src: '/logos/htmlcss.svg' },
  { name: 'CSS', src: '/logos/css.svg' },
  { name: 'JavaScript', src: '/logos/javascript.svg' },
  { name: 'PostgreSQL', src: '/logos/postgresql.svg' },
  { name: 'MongoDB', src: '/logos/mongodb.svg' },
  { name: 'Unity', src: '/logos/unity.svg' },
];

const projectsData: Project[] = [
  {
    title: "Curry Leaf Cafe",
    description: "A full-stack website for a sustainable Indian vegetarian restaurant, built for a school competition. Led development of the site using HTML/CSS/JS on the front end, with a MongoDB + Python backend supporting menu management, reservations, contact form, and an AI Chatbot. Emphasized clean UI and accessibility. Placed 8th in TSA National Conference in the Webmaster event.",
    technologies: ["HTML", "CSS", "JavaScript", "MongoDB", "Python"],
    link: "https://curryleafcafe.onrender.com/realindex.html",
    imageSlug: "curry-leaf-cafe",
    imageCount: 3,
    imageFileExtension: "png",
  },
  {
    title: "FRC Scouting App",
    description: "A custom-built scouting system developed for my local FIRST Robotics Competition (FRC) team. Built using C#, Unity, and PostgreSQL, the app runs on 8 Android tablets and allows team members to collect detailed match data on competing robots in real-time. This streamlined system replaced traditional paper-based methods, enabling faster, more accurate analysis and more informed match strategies.",
    technologies: ["C#", "Unity", "PostgreSQL"],
    link: "https://github.com/Calatrux/2025-frc-scouting-app",
    imageSlug: "scouting-app",
    imageCount: 3,
    imageFileExtension: "png",
  },
  {
    title: "Dungeon's Escape: Knight's Quest",
    description: "A procedurally generated dungeon crawler game developed in Unity with C#. Featuring enemy variety, loot mechanics, and a branching storyline, the game won 1st place at the 2024 TSA state competition and 2nd at the TSA National Conference. It also placed 5th in the FBLA state competition for Computer Game and Simulation Programming.",
    technologies: ["Unity", "C#"],
    link: "https://calatrux.itch.io/dungeon-escape-knights-quest",
    imageSlug: "dungeons-escape",
    imageCount: 3,
    imageFileExtension: "png",
  },
];

const ProjectCard = ({ project, index }: { project: Project, index: number }) => {
  const [currentImage, setCurrentImage] = useState(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const totalImages = project.imageCount;
  const effectiveImageFileExtension = project.imageFileExtension || 'jpg';

  const handlePrevImage = () => {
    setCurrentImage(prev => (prev === 1 ? totalImages : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImage(prev => (prev === totalImages ? 1 : prev + 1));
  };

  const handleDotClick = (imageNumber: number) => {
    setCurrentImage(imageNumber);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.1 }}
      whileHover={{ y: -5, boxShadow: "0 8px 30px rgba(0,0,0,0.5)" }}
      onMouseMove={handleMouseMove}
      className="group relative rounded-2xl p-[1px] overflow-hidden bg-white/5 transition-colors transition-shadow w-full shadow-xl"
    >
      {/* Glowing border effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.4), transparent 40%)`,
        }}
      />

      {/* Inner card container */}
      <div className="relative flex flex-col md:flex-row w-full bg-neutral-900/80 backdrop-blur-sm rounded-[15px] overflow-hidden z-10 transition-colors duration-300 group-hover:bg-neutral-900/90 h-full">
        <div className="relative md:w-[45%] w-full bg-neutral-950 flex items-center justify-center min-h-[220px] md:min-h-[300px] aspect-[16/9] md:aspect-auto overflow-hidden">
          {project.imageCount > 0 ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                src={`/projects/${project.imageSlug}/${currentImage}.${effectiveImageFileExtension}`}
                alt={`${project.title} - Image ${currentImage} of ${totalImages}`}
                className="w-full h-full object-cover transition-opacity duration-300 ease-in-out pl-0"
                key={`${project.imageSlug}-${currentImage}`}
              />
              {totalImages > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/80 backdrop-blur-md text-white p-2 rounded-full transition-colors duration-300 z-10 opacity-0 group-hover:opacity-100"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                  </button>
                  <button
                    onClick={handleNextImage}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/80 backdrop-blur-md text-white p-2 rounded-full transition-colors duration-300 z-10 opacity-0 group-hover:opacity-100"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {Array.from({ length: totalImages }).map((_, idx) => (
                      <button
                        key={idx}
                        aria-label={`Go to image ${idx + 1}`}
                        onClick={() => handleDotClick(idx + 1)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentImage === idx + 1 ? 'bg-white scale-125 w-3' : 'bg-white/40 hover:bg-white/80'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="text-center p-6">
              <svg className="w-12 h-12 text-neutral-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <p className="text-neutral-500 text-sm font-medium tracking-wide">Preview Coming Soon</p>
            </div>
          )}
        </div>

        <div className="md:w-[55%] w-full p-6 md:p-8 flex flex-col justify-center relative">
          <h3 className="text-2xl font-bold mb-3 tracking-tight text-white transition-colors duration-300">{project.title}</h3>
          <p className="text-neutral-400 text-sm md:text-base mb-6 leading-relaxed font-light flex-grow">{project.description}</p>

          {project.link && (
            <div className="mb-6">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-black hover:bg-neutral-200 font-semibold py-2.5 px-5 text-sm rounded-full transition-colors duration-300"
              >
                View Project
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </a>
            </div>
          )}

          <div className="mt-auto pt-5 border-t border-white/5">
            <div className="flex flex-wrap gap-2 items-center">
              {project.technologies.map((tech, techIndex) => {
                const logoSrc = allTechLogos.find(l => l.name.toLowerCase() === tech.toLowerCase())?.src;
                return (
                  <span key={techIndex} className="flex items-center gap-1.5 bg-neutral-800/80 px-2.5 py-1 rounded-full text-neutral-300 text-xs font-medium border border-white/5 z-20">
                    {logoSrc && (
                      <img src={logoSrc} alt={tech + ' logo'} className="w-3 h-3 object-contain" />
                    )}
                    {tech}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Inner subtle glow for the card itself */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-[15px]"
            style={{
              background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.03), transparent 40%)`,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="py-20 px-4 sm:px-8 w-full max-w-full overflow-hidden relative flex flex-col items-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.015)_0%,transparent_40%)] pointer-events-none" />

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-4xl md:text-5xl font-bold mb-16 text-center tracking-tighter text-white"
      >
        Featured Projects
      </motion.h2>

      <div className="space-y-12 md:space-y-16 w-full max-w-5xl relative z-10">
        {projectsData.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
