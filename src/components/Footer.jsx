import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-10 px-4 mt-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo/Name */}
        <h1 className="text-2xl font-bold text-green-400 mb-6 md:mb-0">
          Mokshith
        </h1>
        {/* Social Links */}
        <div className="flex space-x-6 text-gray-300">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 text-2xl">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 text-2xl">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 text-2xl">
            <FaTwitter />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-gray-500 text-center mt-8">
        &copy; {new Date().getFullYear()} Mokshith. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
