import React from 'react';

const About = () => {
  return (
    <section className="py-20 px-4 bg-gray-800">
      <h2 className="text-4xl font-bold text-green-400 text-center mb-12">About Me</h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="bg-gray-900 p-6 rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Who I Am</h3>
          <p className="text-gray-300">
            I am a passionate developer focused on building beautiful, interactive, and responsive websites.
          </p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">What I Do</h3>
          <p className="text-gray-300">
            I specialize in React, Tailwind CSS, and animations with GSAP to deliver next-level web experiences.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
