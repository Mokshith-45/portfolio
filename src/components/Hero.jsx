import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Hero = () => {
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const lettersRef = useRef([]);
  const paraLettersRef = useRef([]);
  const shapesRef = useRef([]);
  const particlesRef = useRef([]);
  const wavesRef = useRef([]);
  const [isDesktop, setIsDesktop] = useState(true);
  const [showHint, setShowHint] = useState(false);

  const headline = "Hello, I am Mokshith Shetty";
  const paraText = "Welcome to my interactive portfolio! Explore and enjoy the experience.";

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);

    if (!isDesktop) {
      setShowHint(true);
      gsap.fromTo(
        ".tap-hint",
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: "power3.out" }
      );
      setTimeout(() => {
        gsap.to(".tap-hint", { opacity: 0, duration: 1 });
        setShowHint(false);
      }, 10000);
    }

    // --- Set heading color (no glow) ---
    lettersRef.current.forEach((letter) => {
      gsap.set(letter, { opacity: 1, color: "#00FFC6", textShadow: "none" });
    });

    // Floating shapes scroll animation (guard against missing elements)
    if (headingRef.current) {
      shapesRef.current.forEach((shape, i) => {
        if (!shape) return;
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
    }

    // Cursor movement interactions
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

      // Paragraph letter proximity
      paraLettersRef.current.forEach((letter) => {
        if (!letter) return;
        const rect = letter.getBoundingClientRect();
        const dx = clientX - (rect.left + rect.width / 2);
        const dy = clientY - (rect.top + rect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          gsap.to(letter, { scale: 1.4, color: "#00FFC6", duration: 0.2 });
        } else {
          gsap.to(letter, { scale: 1, color: "#aaa", duration: 0.5 });
        }
      });

      // Shapes follow cursor
      shapesRef.current.forEach((shape, i) => {
        const movement = 50 * (i + 1);
        gsap.to(shape, {
          x: ((clientX - centerX) / centerX) * movement,
          y: ((clientY - centerY) / centerY) * movement,
          rotation: ((clientX - centerX) + (clientY - centerY)) / 15,
          duration: 0.5,
        });
      });

      // Cosmic waves creation
      const wave = document.createElement("div");
      wave.className = "cosmic-wave";
      wave.style.left = `${clientX}px`;
      wave.style.top = `${clientY}px`;
      document.body.appendChild(wave);
      wavesRef.current.push(wave);

      gsap.to(wave, {
        scale: 4,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        onComplete: () => {
          wave.remove();
          wavesRef.current.shift();
        },
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Floating particles
    particlesRef.current.forEach((particle) => {
      if (!particle) return;
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
      // kill ScrollTrigger instances created by this component
      try {
        ScrollTrigger.getAll().forEach((t) => t.kill && t.kill());
      } catch (e) {
        // ignore
      }
    };
  }, [isDesktop]);

  const handleTap = () => {
    if (!isDesktop) {
      gsap.fromTo(
        headingRef.current,
        { scale: 0.95 },
        { scale: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        paraRef.current,
        { opacity: 0.7 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  };

  return (
    <section
      onClick={handleTap}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6 bg-gray-900"
    >
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

      {/* Tap hint message (mobile only) */}
      {showHint && (
        <div className="tap-hint fixed top-24 left-1/2 transform -translate-x-1/2 z-50 text-center text-base font-semibold px-5 py-2 rounded-lg border-2 border-gradient-to-r from-[#00FFC6] via-[#00BFFF] to-[#00FFC6] text-[#00FFC6] shadow-[0_0_12px_#00FFC6] animate-fadeInOut">
          👆 Tap anywhere to explore the interaction
        </div>
      )}

      {/* Heading */}
      <h1
        ref={headingRef}
        className={`font-extrabold text-center z-10 select-none text-[#00FFC6] ${
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
