import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Scroll to section function
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false); // close mobile menu
  };

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-gray-900 bg-opacity-80 backdrop-blur-md px-6 py-4 flex justify-between items-center shadow-lg">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-gradient bg-clip-text text-transparent from-green-400 via-cyan-400 to-blue-500 bg-gradient-to-r cursor-pointer"
          onClick={() => scrollToSection("home")}>
        Mokshith
      </h1>

      {/* Desktop Links */}
      <ul className="hidden md:flex space-x-8">
        {navLinks.map((link, idx) => (
          <li
            key={idx}
            className="relative cursor-pointer text-gray-300 hover:text-green-400 font-semibold transition-colors duration-300"
            onClick={() => scrollToSection(link.id)}
          >
            {/* Before animation */}
            <span className="absolute left-0 -bottom-1 w-0 h-1 bg-green-400 transition-all duration-300 before:block before:absolute before:w-full before:h-1 before:bg-green-400 hover:w-full"></span>
            {link.name}
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl text-green-400">
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <ul className="absolute top-20 left-0 w-full bg-gray-900 flex flex-col items-center space-y-4 py-6 shadow-lg">
          {navLinks.map((link, idx) => (
            <li
              key={idx}
              className="text-gray-300 hover:text-green-400 font-semibold text-lg cursor-pointer transition-colors duration-300"
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
