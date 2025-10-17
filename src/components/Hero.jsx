import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const lettersRef = useRef([]);
  const paraLettersRef = useRef([]);
  const shapesRef = useRef([]);
  const particlesRef = useRef([]);
  const [isDesktop, setIsDesktop] = useState(true);

  const headline = "Hello, I am Mokshith Shetty";
  const paraText = "Welcome to my interactive portfolio! Explore my projects and skills.";

  useEffect(() => {
    // Detect screen size
    setIsDesktop(window.innerWidth >= 768);

    // Set letters style
if (isDesktop) {
  lettersRef.current.forEach((letter) => {
    gsap.set(letter, {
      opacity: 1,
      color: "#00FFC6", // solid cyan
      textShadow: "none", // remove glow
    });
  });
}
{isDesktop
  ? paraText.split("").map((char, i) => (
      <span
        key={i}
        ref={(el) => (paraLettersRef.current[i] = el)}
        className="inline-block cursor-default"
      >
        {char}
      </span>
    ))
  : paraText
}


    // Floating shapes parallax
    shapesRef.current.forEach((shape, i) => {
      gsap.to(shape, {
        y: `+=${30 + i * 10}`,
        x: `+=${20 + i * 10}`,
        rotation: 360,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // Mouse interactive effects
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      if (isDesktop) {
        // Heading tilt
        gsap.to(headingRef.current, {
          x: ((clientX - centerX) / centerX) * 20,
          y: ((clientY - centerY) / centerY) * 20,
          rotationX: -((clientY - centerY) / centerY) * 10,
          rotationY: ((clientX - centerX) / centerX) * 10,
          transformPerspective: 800,
          transformOrigin: "center center",
          duration: 0.5,
        });
      }

      // Paragraph letter interaction (cursor proximity)
      paraLettersRef.current.forEach((letter) => {
        if (!letter) return;
        const rect = letter.getBoundingClientRect();
        const dx = clientX - (rect.left + rect.width / 2);
        const dy = clientY - (rect.top + rect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          gsap.to(letter, {
            scale: 1.5,
            color: "#00FFC6",
            duration: 0.2,
          });
        } else {
          gsap.to(letter, {
            scale: 1,
            color: "#aaa",
            duration: 0.5,
          });
        }
      });

      // Shapes move with cursor
      shapesRef.current.forEach((shape, i) => {
        const movement = 50 * (i + 1);
        gsap.to(shape, {
          x: ((clientX - centerX) / centerX) * movement,
          y: ((clientY - centerY) / centerY) * movement,
          rotation: ((clientX - centerX) + (clientY - centerY)) / 15,
          duration: 0.5,
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Particle animation
    particlesRef.current.forEach((particle) => {
      const delay = Math.random() * 5;
      const size = Math.random() * 3 + 2;
      gsap.to(particle, {
        x: "+=" + (Math.random() * 200 - 100),
        y: "+=" + (Math.random() * 200 - 100),
        opacity: Math.random(),
        repeat: -1,
        duration: 6,
        delay,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.set(particle, { width: size, height: size });
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDesktop]);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6 bg-gray-900">
      {/* Floating gradient shapes */}
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (shapesRef.current[i] = el)}
          className="absolute rounded-full opacity-30 bg-gradient-to-r from-[#00FFC6] via-[#00BFFF] to-[#00FFC6]"
          style={{
            width: `${150 + i * 50}px`,
            height: `${150 + i * 50}px`,
            top: `${10 + i * 20}%`,
            left: `${15 + i * 30}%`,
          }}
        />
      ))}

      {/* Particle background */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (particlesRef.current[i] = el)}
          className="absolute bg-white rounded-full opacity-50"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Heading */}
      <h1
        ref={headingRef}
        className={`font-extrabold text-center z-10 select-none ${
          isDesktop ? "text-6xl md:text-7xl" : "text-4xl"
        }`}
      >
        {isDesktop
          ? headline.split("").map((char, i) => (
              <span
                key={i}
                ref={(el) => (lettersRef.current[i] = el)}
                className="inline-block"
              >
                {char}
              </span>
            ))
          : headline}
      </h1>

      {/* Interactive paragraph */}
      <p
        ref={paraRef}
        className="mt-6 text-center text-gray-400 text-lg md:text-xl flex flex-wrap justify-center gap-1 z-10"
      >
        {paraText.split("").map((char, i) => (
          <span
            key={i}
            ref={(el) => (paraLettersRef.current[i] = el)}
            className="inline-block cursor-default"
          >
            {char}
          </span>
        ))}
      </p>
    </section>
  );
};

export default Hero;
