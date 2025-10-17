import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="font-sans bg-gray-900 text-white scroll-smooth">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section id="home">
        <Hero />
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10">
        <About />
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10">
        <Projects />
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10">
        <Contact />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
