import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-gray-900 bg-opacity-70 backdrop-blur-lg px-8 py-4 flex justify-between items-center shadow-2xl">
      {/* Logo */}
      <h1
        className="text-3xl font-extrabold bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500 text-transparent bg-clip-text animate-gradientText cursor-pointer"
        onClick={() => scrollToSection("home")}
      >
        Mokshith
      </h1>

      {/* Desktop Links */}
      <ul className="hidden md:flex space-x-10">
        {navLinks.map((link, idx) => (
          <li
            key={idx}
            className="relative cursor-pointer text-gray-300 font-semibold hover:text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-pink-500 transition-all duration-300"
            onClick={() => scrollToSection(link.id)}
          >
            <span className="before:absolute before:-bottom-1 before:left-0 before:h-1 before:w-0 before:bg-gradient-to-r before:from-green-400 before:via-cyan-400 before:to-pink-500 hover:before:w-full before:transition-all before:duration-300"></span>
            {link.name}
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-3xl text-cyan-400 hover:text-pink-400 transition-colors duration-300">
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <ul className="absolute top-20 left-0 w-full bg-gray-900 flex flex-col items-center space-y-5 py-6 shadow-2xl">
          {navLinks.map((link, idx) => (
            <li
              key={idx}
              className="text-gray-300 font-semibold text-lg cursor-pointer hover:text-green-400 transition-colors duration-300"
              onClick={() => scrollToSection(link.id)}
            >
              {link.name}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
