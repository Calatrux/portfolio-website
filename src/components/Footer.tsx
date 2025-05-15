import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 bg-neutral-900 text-center text-gray-400">
      <div className="container mx-auto px-6">
        <p>&copy; {new Date().getFullYear()} Shubham Prasad. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
