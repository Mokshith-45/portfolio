import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: "Portfolio Website", desc: "Interactive portfolio built with React & Tailwind CSS.", link: "#" },
  { title: "E-Commerce Store", desc: "Full-stack store with Firebase backend.", link: "#" },
  { title: "Xero:Serox App", desc: "Local Xerox shop finder with delivery support.", link: "#" },
  { title: "FinTech Tracker", desc: "Track your finances and expenses efficiently.", link: "#" },
];

const Projects = () => {
  const cardRefs = useRef([]);

  useEffect(() => {
    cardRefs.current.forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: i * 0.2,
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, []);

  return (
    <section className="py-20 px-4 bg-gray-900">
      <h2 className="text-4xl font-bold text-green-400 text-center mb-12">Projects</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {projects.map((project, idx) => (
          <div
            key={idx}
            ref={(el) => (cardRefs.current[idx] = el)}
            className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-300 mb-4">{project.desc}</p>
            <a href={project.link} className="text-green-400 font-semibold hover:underline">
              View Project
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
