import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const starsRef = useRef([]);
  const navRef = useRef(null);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Particle stars
    starsRef.current.forEach((star) => {
      const size = Math.random() * 3 + 1;
      gsap.set(star, { width: size, height: size });
      gsap.to(star, {
        x: "+=" + (Math.random() * 50 - 25),
        y: "+=" + (Math.random() * 10 - 5),
        opacity: Math.random() * 0.7 + 0.3,
        repeat: -1,
        yoyo: true,
        duration: 4 + Math.random() * 3,
        ease: "sine.inOut",
      });
    });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      starsRef.current.forEach((star) => {
        const rect = star.getBoundingClientRect();
        const dx = clientX - (rect.left + rect.width / 2);
        const dy = clientY - (rect.top + rect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 80) {
          gsap.to(star, {
            x: `+=${dx / 3}`,
            y: `+=${dy / 3}`,
            duration: 0.2,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 bg-gray-900 bg-opacity-70 backdrop-blur-lg px-6 md:px-10 py-4 flex justify-between items-center"
    >
      {/* Stars */}
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (starsRef.current[i] = el)}
          className="absolute rounded-full bg-[#00FFC6] opacity-70"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Logo */}
      <h1
        className="text-2xl md:text-3xl font-extrabold cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-[#00FFC6] via-[#00BFFF] to-[#00FFC6] neon-glow"
        onClick={() => scrollToSection("home")}
      >
        Mokshith
      </h1>

      {/* Desktop Links */}
      <ul className="hidden md:flex space-x-6">
        {navLinks.map((link, idx) => (
          <li
            key={idx}
            className="cursor-pointer font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00FFC6] via-[#00BFFF] to-[#00FFC6] neon-glow hover:scale-105 transition-transform duration-300"
            onClick={() => scrollToSection(link.id)}
          >
            {link.name}
          </li>
        ))}
      </ul>

      {/* Mobile toggle */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-3xl text-[#00FFC6] hover:text-[#00BFFF] transition-colors duration-300"
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="absolute top-full left-0 w-full bg-gray-900 flex flex-col items-center space-y-4 py-4 shadow-xl z-50">
          {navLinks.map((link, idx) => (
            <li
              key={idx}
              className="text-[#00FFC6] font-semibold text-lg cursor-pointer hover:text-[#00BFFF] transition-colors duration-300 neon-glow"
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

