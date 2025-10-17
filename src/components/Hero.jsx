import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero = () => {
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    gsap.from(headingRef.current, { y: -50, opacity: 0, duration: 1, ease: "bounce.out" });
    gsap.from(subRef.current, { x: -100, opacity: 0, duration: 1, delay: 0.5, ease: "power3.out" });
    gsap.from(buttonRef.current, { scale: 0, opacity: 0, duration: 0.8, delay: 1, ease: "back.out(1.7)" });
  }, []);

  return (
    <section className="h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 ref={headingRef} className="text-6xl md:text-7xl font-bold text-glow mb-4">
        Hi, I'm Mokshith
      </h1>
      <p ref={subRef} className="text-xl md:text-2xl text-gray-300 mb-8">
        I build interactive, vibrant, and responsive web experiences.
      </p>
      <button ref={buttonRef} className="btn-glow">
        View My Work
      </button>
    </section>
  );
};

export default Hero;
