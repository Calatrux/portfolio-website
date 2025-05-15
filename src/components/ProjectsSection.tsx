// src/components/ProjectsSection.tsx
"use client";
import React, { useRef, useState } from 'react'; // Added useState
import { useScrollAnimate } from '@/hooks/useScrollAnimate';

// Define project data type
interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string; // Optional link for the project
  imageSlug: string; // Folder name in public/projects/
  imageCount: number; // Number of images in the folder
  imageFileExtension?: string; // e.g., 'jpg', 'png'. Defaults to 'jpg'.
}

// Define technology logo mapping type
interface TechLogo {
  name: string;
  src: string;
}

// Technology logos based on public/tool-logos.json and project needs
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
    title: "FRC Scouting App",
    description: "A custom-built scouting system developed for my local FIRST Robotics Competition (FRC) team. Built using C#, Unity, and PostgreSQL, the app runs on 8 Android tablets and allows team members to collect detailed match data on competing robots in real-time. This streamlined system replaced traditional paper-based methods, enabling faster, more accurate analysis and more informed match strategies.",
    technologies: ["C#", "Unity", "PostgreSQL"],
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
  {
    title: "Curry Leaf Cafe",
    description: "A full-stack website for a sustainable Indian vegetarian restaurant, built for a school competition. Led development of the site using HTML/CSS/JS on the front end, with a MongoDB + Python backend supporting menu management, reservations, and contact forms. Emphasized clean UI and accessibility. Place Top 10 in the state.",
    technologies: ["HTML", "CSS", "JavaScript", "MongoDB", "Python"],
    link: "https://curryleafcafe.onrender.com/realindex.html",
    imageSlug: "curry-leaf-cafe",
    imageCount: 3,
    imageFileExtension: "png",
  },
  {
    title: "Bazar (Internship Project)",
    description: "Contributed to a large-scale e-commerce platform similar to Amazon during a software development internship. Built core frontend and backend systems including JWT-based user authentication, an order review workflow, and a product review feature. Worked in a collaborative React & PostgreSQL codebase, committing over 5,000 lines of code and designing systems used across the site.",
    technologies: ["React", "PostgreSQL", "TypeScript", "Next.js"],
    link: "https://bazar.earth/",
    imageSlug: "bazar",
    imageCount: 3,
    imageFileExtension: "png",
  },
];

const ProjectCard = ({ project }: { project: Project }) => {
  const [currentImage, setCurrentImage] = useState(1);
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

  return (
    <div 
      className="group bg-neutral-800/70 rounded-xl overflow-hidden shadow-2xl border border-neutral-700 flex flex-col md:flex-row transform transition-all duration-300 
      hover:shadow-[0_0_20px_30px_rgba(255,255,255,0.5)] 
      hover:-translate-y-2 hover:scale-[1.02] hover:border-white/50 w-full"
    >
      {/* Image Carousel - Left side on md screens, Top on sm screens */}
      <div className="relative md:w-1/2 w-full bg-neutral-700/50 flex items-center justify-center min-h-[250px] md:min-h-[300px] aspect-[16/9] md:aspect-auto overflow-hidden">
        {project.imageCount > 0 ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={`/projects/${project.imageSlug}/${currentImage}.${effectiveImageFileExtension}`} 
              alt={`${project.title} - Image ${currentImage} of ${totalImages}`}
              className="w-full h-full object-cover transition-opacity duration-300 ease-in-out"
              key={`${project.imageSlug}-${currentImage}`}
            />
            {totalImages > 1 && (
              <>
                <button 
                  onClick={handlePrevImage} 
                  aria-label="Previous image"
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                </button>
                <button 
                  onClick={handleNextImage} 
                  aria-label="Next image"
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </button>
                <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 sm:space-x-2 z-10">
                  {Array.from({ length: totalImages }).map((_, idx) => (
                    <button
                      key={idx}
                      aria-label={`Go to image ${idx + 1}`}
                      onClick={() => handleDotClick(idx + 1)}
                      className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${currentImage === idx + 1 ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="text-center p-8">
            <svg className="w-16 h-16 text-neutral-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <p className="text-neutral-400 text-lg">Project Images</p>
            <p className="text-neutral-500 text-sm">(Coming Soon)</p>
          </div>
        )}
      </div>

      {/* Project Details - Right side on md screens, Bottom on sm screens */}
      <div className="md:w-1/2 w-full p-6 sm:p-8 flex flex-col justify-center">
        <h3 className="text-2xl sm:text-3xl font-semibold mb-3 sm:mb-4 text-gray-100">{project.title}</h3>
        <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6 flex-grow leading-relaxed">{project.description}</p>
        
        {project.link && (
          <div className="mb-4 sm:mb-6">
            <a 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 text-sm sm:text-base"
            >
              View Project
            </a>
          </div>
        )}

        <div className="mt-auto">
          <h4 className="text-md sm:text-lg font-medium text-gray-200 mb-2 sm:mb-3">Technologies Used:</h4>
          <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
            {project.technologies.map((tech, techIndex) => {
              const logoSrc = allTechLogos.find(l => l.name.toLowerCase() === tech.toLowerCase())?.src;
              return (
                <span key={techIndex} className="flex items-center gap-1.5 bg-neutral-700/70 px-2 py-1 rounded-lg text-gray-200 text-xs sm:text-sm font-medium">
                  {logoSrc && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={logoSrc} alt={tech + ' logo'} className="w-4 h-4 object-contain mr-1" />
                  )}
                  {tech}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollAnimate(sectionRef as React.RefObject<HTMLElement>);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center py-20 px-4 sm:px-8 scroll-animate w-full max-w-full overflow-x-hidden"
    >
      <h2 className="text-5xl font-bold mb-16 text-center">Featured Projects</h2>
      <div className="space-y-12 md:space-y-16 w-full max-w-5xl">
        {projectsData.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
