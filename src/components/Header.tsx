// src/components/Header.tsx
import React from 'react';

const Header = () => {
  return (
    <header
      className="fixed top-6 inset-x-0 mx-auto z-50 bg-neutral-800/60 backdrop-blur-md shadow-lg rounded-full w-max px-6 py-1.5"
    >
      <nav className="flex items-center px-4 py-1.5">
        <ul className="flex items-center space-x-5 text-gray-300">
          <li><a href="#" className="hover:text-white transition-colors text-sm font-medium">Home</a></li>
          <li><a href="#toolkit" className="hover:text-white transition-colors text-sm font-medium">Tech Stack</a></li>
          <li><a href="#projects" className="hover:text-white transition-colors text-sm font-medium">Projects</a></li>
          <li><a href="#contact" className="hover:text-white transition-colors text-sm font-medium">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
