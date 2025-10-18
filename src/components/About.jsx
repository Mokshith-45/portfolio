import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable, Physics2DPlugin, ScrollTrigger } from "gsap/all";
import dragSoundFile from "../assets/drag.mp3";
import collisionSoundFile from "../assets/collision.mp3";

const techStacks = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
];

const About = () => {
  const summaryRef = useRef(null);
  const techRefs = useRef([]);
  const techSectionRef = useRef(null);
  const planetRefs = useRef([]);
  const particleRefs = useRef([]);
  const burstContainerRef = useRef(null);
  const fireTrailRefs = useRef([]);
  const nebulaRef = useRef(null);
  const [showHint, setShowHint] = useState(false);
  const hintShownRef = useRef(false); // track if hint was already shown this page load

  // ------------------- Audio -------------------
  const dragSound = useRef(new Audio(dragSoundFile));
  const collisionSound = useRef(new Audio(collisionSoundFile));
  dragSound.current.volume = 0.2;
  collisionSound.current.volume = 0.2;

  // ------------------- Particles -------------------
  const particleArr = Array.from({ length: 150 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 3 + 1,
    speedX: (Math.random() - 0.5) * 0.7,
    speedY: (Math.random() - 0.5) * 0.7,
  }));

  // ------------------- Cursor-interactable particles -------------------
  const cursorParticlesRef = useRef([]);
  const cursorParticleArr = Array.from({ length: 50 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 2 + 1,
  }));

  useEffect(() => {
    const particles = particleRefs.current;
    const planets = planetRefs.current;
    let hintTimer;

    // ------------------- IntersectionObserver for hint (show once per load) -------------------
    const hintObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Only show the hint the first time the section becomes visible in this page load
          if (entry.isIntersecting && !hintShownRef.current) {
            hintShownRef.current = true;
            setShowHint(true);
            hintTimer = setTimeout(() => setShowHint(false), 10000);
          }
        });
      },
      { threshold: 0.2 }
    );
    if (summaryRef.current) hintObserver.observe(summaryRef.current);

    // ------------------- Window resize -------------------
    const handleResize = () => {
      particleArr.forEach((p) => {
        p.x = Math.min(p.x, window.innerWidth);
        p.y = Math.min(p.y, window.innerHeight);
      });
      cursorParticleArr.forEach((p) => {
        p.x = Math.min(p.x, window.innerWidth);
        p.y = Math.min(p.y, window.innerHeight);
      });
    };
    window.addEventListener("resize", handleResize);

    // ------------------- Cursor interaction -------------------
    const handleMouseMove = (e) => {
      cursorParticleArr.forEach((p, i) => {
        const dx = e.clientX - p.x;
        const dy = e.clientY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          p.x -= dx * 0.02;
          p.y -= dy * 0.02;
        }
        if (cursorParticlesRef.current[i])
          gsap.set(cursorParticlesRef.current[i], { x: p.x, y: p.y });
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleMouseMove);

    // ------------------- Particle motion -------------------
    const tickerFn = () => {
      particleArr.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x > window.innerWidth) p.x = 0;
        if (p.x < 0) p.x = window.innerWidth;
        if (p.y > window.innerHeight) p.y = 0;
        if (p.y < 0) p.y = window.innerHeight;

        planets.forEach((planet) => {
          if (!planet) return;
          const rect = planet.getBoundingClientRect();
          const px = rect.left + rect.width / 2;
          const py = rect.top + rect.height / 2;
          const dx = p.x - px;
          const dy = p.y - py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            p.x += (dx / dist) * 2;
            p.y += (dy / dist) * 2;
          }
        });

        if (particles[i]) gsap.set(particles[i], { x: p.x, y: p.y });
      });
    };
    gsap.ticker.add(tickerFn);

    // ------------------- Planets floating & draggable -------------------
    planets.forEach((planet, i) => {
      if (!planet) return;

      gsap.to(planet, {
        y: "+=20",
        x: "+=15",
        repeat: -1,
        yoyo: true,
        duration: 8 + i * 2,
        ease: "sine.inOut",
      });

      Draggable.create(planet, {
        type: "x,y",
        edgeResistance: 0.9,
        bounds: "body",
        onDragStart: function () {
          gsap.to(planet, { boxShadow: "0px 0px 25px #00FFF2", duration: 0.3 });
          const fire = fireTrailRefs.current[i];
          gsap.to(fire, { opacity: 0.8, scale: 1.5, duration: 0.2 });
          dragSound.current.currentTime = 0;
          dragSound.current.play().catch(() => {
            const unlock = () => {
              dragSound.current.play();
              window.removeEventListener("touchstart", unlock);
              window.removeEventListener("click", unlock);
            };
            window.addEventListener("touchstart", unlock);
            window.addEventListener("click", unlock);
          });
        },
        onDrag: function () {
          const fire = fireTrailRefs.current[i];
          gsap.set(fire, { x: this.x, y: this.y });
          gsap.to(fire, { opacity: 0.5, scale: 1, duration: 0.3 });

          if (nebulaRef.current) {
            gsap.to(nebulaRef.current, {
              filter: "hue-rotate(90deg) blur(6px)",
              duration: 0.5,
              yoyo: true,
              repeat: 1,
            });
          }

          planets.forEach((other, j) => {
            if (i !== j && other) {
              const rect1 = planet.getBoundingClientRect();
              const rect2 = other.getBoundingClientRect();
              const dx = rect1.left + rect1.width / 2 - (rect2.left + rect2.width / 2);
              const dy = rect1.top + rect1.height / 2 - (rect2.top + rect2.height / 2);
              const dist = Math.sqrt(dx * dx + dy * dy);
              const minDist = rect1.width / 2 + rect2.width / 2;
              if (dist < minDist) {
                gsap.to(planet, { x: "+=" + dx / 5, y: "+=" + dy / 5, duration: 0.3 });
                gsap.to(other, { x: "-=" + dx / 5, y: "-=" + dy / 5, duration: 0.3 });

                collisionSound.current.currentTime = 0;
                collisionSound.current.play().catch(() => {
                  const unlock = () => {
                    collisionSound.current.play();
                    window.removeEventListener("touchstart", unlock);
                    window.removeEventListener("click", unlock);
                  };
                  window.addEventListener("touchstart", unlock);
                  window.addEventListener("click", unlock);
                });

                // Orange wave collision
                const wave = document.createElement("div");
                wave.className =
                  "absolute rounded-full bg-gradient-to-r from-orange-400 via-yellow-300 to-transparent opacity-70 pointer-events-none";
                wave.style.width = wave.style.height = `${rect1.width * 2}px`;
                wave.style.left = `${rect1.left + rect1.width / 2 - rect1.width}px`;
                wave.style.top = `${rect1.top + rect1.height / 2 - rect1.height}px`;
                burstContainerRef.current.appendChild(wave);
                gsap.fromTo(
                  wave,
                  { scale: 0, opacity: 0.7 },
                  {
                    scale: 1.5,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power1.out",
                    onComplete: () => wave.remove(),
                  }
                );
              }
            }
          });

          if (summaryRef.current) {
            gsap.to(summaryRef.current, {
              x: (this.x - window.innerWidth / 2) / 15,
              y: (this.y - window.innerHeight / 2) / 15,
              rotation: (this.x - window.innerWidth / 2) / 100,
              duration: 0.3,
            });
          }

          techRefs.current.forEach((logo) => {
            if (logo) {
              const rect = logo.getBoundingClientRect();
              const px = planet.getBoundingClientRect().left + 50;
              const py = planet.getBoundingClientRect().top + 50;
              const dx = rect.left - px;
              const dy = rect.top - py;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 200) gsap.to(logo, { x: dx / 3, y: dy / 3, duration: 0.3 });
              else gsap.to(logo, { x: 0, y: 0, duration: 0.5 });
            }
          });
        },
        onRelease: function () {
          gsap.to(planet, { boxShadow: "0px 0px 0px transparent", duration: 0.4 });
          const fire = fireTrailRefs.current[i];
          gsap.to(fire, { opacity: 0, scale: 0.8, duration: 0.4 });
          // Restore summary and tech logos to their original positions
          if (summaryRef.current) {
            gsap.to(summaryRef.current, { x: 0, y: 0, rotation: 0, duration: 0.6, ease: "power2.out" });
          }
          techRefs.current.forEach((logo) => {
            if (logo) gsap.to(logo, { x: 0, y: 0, duration: 0.6, ease: "power2.out" });
          });
        },
      });
    });

    return () => {
      hintObserver.disconnect();
      clearTimeout(hintTimer);
      gsap.ticker.remove(tickerFn);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0B1120] text-white">
      {/* Nebula background */}
      <div
        ref={nebulaRef}
        className="absolute inset-0 bg-gradient-to-br from-cyan-800/20 via-indigo-800/15 to-black blur-2xl animate-nebula"
      />

      {/* Stars */}
      {particleArr.map((p, i) => (
        <div
          key={i}
          ref={(el) => (particleRefs.current[i] = el)}
          className="absolute bg-white rounded-full opacity-70"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            top: `${p.y}px`,
            left: `${p.x}px`,
          }}
        />
      ))}

      {/* Cursor particles */}
      {cursorParticleArr.map((p, i) => (
        <div
          key={`c-${i}`}
          ref={(el) => (cursorParticlesRef.current[i] = el)}
          className="absolute bg-white rounded-full opacity-50 pointer-events-none"
          style={{ width: `${p.size}px`, height: `${p.size}px`, top: `${p.y}px`, left: `${p.x}px` }}
        />
      ))}

      {/* Fire trails */}
      {[...Array(2)].map((_, i) => (
        <div
          key={`fire-${i}`}
          ref={(el) => (fireTrailRefs.current[i] = el)}
          className="absolute w-16 h-16 bg-gradient-to-r from-orange-400/60 via-yellow-300/40 to-transparent blur-2xl rounded-full opacity-0 pointer-events-none z-20"
        />
      ))}

      {/* Burst container */}
      <div ref={burstContainerRef} className="absolute inset-0 pointer-events-none z-40" />

      {/* Planets */}
      {[...Array(2)].map((_, i) => (
        <img
          key={i}
          ref={(el) => (planetRefs.current[i] = el)}
          src="https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg"
          alt="Planet"
          className="absolute w-32 md:w-48 z-30 rounded-full cursor-grab"
          style={{
            top: `${i === 0 ? "20%" : "60%"}`,
            left: `${i === 0 ? "20%" : "70%"}`,
          }}
        />
      ))}

      {/* Hint message */}
      {showHint && (
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2
            bg-gradient-to-br from-[#07101a]/70 via-[#07121f]/50 to-[#0B1120]/80
            backdrop-blur-md px-6 py-3 rounded-2xl text-sm md:text-base
            z-[60] text-center animate-galaxy-glow tracking-wide
            shadow-[0_0_30px_rgba(0,255,198,0.12)] border border-[#001818]/25
            pointer-events-auto flex items-center gap-3"
          style={{ backgroundBlendMode: 'overlay' }}
        >
          <svg className="w-5 h-5 text-[#00FFC6]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M12 2L13.5 8L20 9.2L14.5 13.4L16 20L12 16.8L8 20L9.5 13.4L4 9.2L10.5 8L12 2Z" fill="currentColor" />
          </svg>
          <span className="text-white font-semibold">Welcome to my galaxy — drag the planets around!</span>
        </div>
      )}

      {/* Professional Summary */}
      <div
        ref={summaryRef}
        className="relative z-50 max-w-3xl mx-auto px-6 text-center text-gray-200 mt-20 md:mt-40"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-[#00FFC6] drop-shadow-lg mb-4">
          Mokshith Shetty
        </h1>
        <p className="mb-4 text-lg md:text-xl">
          Enthusiastic B.Tech student specializing in{" "}
          <span className="text-[#00FFC6] font-semibold">AI & Data Science</span>, with
          hands-on experience in{" "}
          <span className="text-[#00BFFF] font-semibold">MERN Stack</span> web development.
          Passionate about solving real-world problems through interactive, vibrant web solutions.
        </p>
        <p className="mb-2">
          <span className="font-semibold text-[#00FFC6]">Education:</span> B.Tech – AI & Data Science, Father Conceicao Rodrigues College (2023–2027)
        </p>
        <p className="mb-2">
          <span className="font-semibold text-[#00BFFF]">Skills:</span> Python, JavaScript, HTML, CSS, Bootstrap, Tailwind, React, Node.js, MongoDB
        </p>
        <p className="mb-2">
          <span className="font-semibold text-[#00FFC6]">Experience:</span> Fresher, exploring web development & data analysis opportunities
        </p>
      </div>

      {/* Tech Logos */}
      <div
        ref={techSectionRef}
        className="relative z-50 mt-24 md:mt-32 mb-16 flex flex-wrap justify-center items-center gap-6 px-6"
      >
        {techStacks.map((src, i) => (
          <img
            key={i}
            ref={(el) => (techRefs.current[i] = el)}
            src={src}
            alt="tech logo"
            className="w-12 md:w-16 cursor-pointer transition-transform duration-300 hover:scale-125 hover:drop-shadow-[0_0_15px_#00FFC6]"
          />
        ))}
      </div>
    </section>
  );
};

export default About;
