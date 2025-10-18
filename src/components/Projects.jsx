// src/pages/Project.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// import local assets (thumbnails + videos)
import xeroThumb from "../assets/thumbnail/xero.png";
import fintechThumb from "../assets/thumbnail/fintech.png";
import kaamsetuThumb from "../assets/thumbnail/kaamsetu.png";
import mahakaliThumb from "../assets/thumbnail/mahakali.png";
import demoThumb from "../assets/thumbnail/demo.png";

import xeroVideo from "../assets/videos/xero.mp4";
import kaamsetuVideo from "../assets/videos/kaamsetu.mp4";
import mahakaliVideo from "../assets/videos/mahakali.mp4";
import demoVideo from "../assets/videos/demo.mp4";

/**
 * Galaxy Project Page
 * - Canvas starfield + asteroids + shooting stars
 * - Nebula overlay (CSS)
 * - Projects grid with GSAP ScrollTrigger reveal
 *
 * Replace project thumbnails / links with your own content.
 */

// Projects data (5 projects). Content sourced from Projects.txt.
const projects = [
  {
    id: 1,
    title: "Xero — The Xerox Finder",
    desc: "A React + Vite web app that finds nearby Xerox/printing shops, enables document upload and ordering, and offers delivery tracking with interactive map routing.",
    tech: "React, Leaflet, OpenStreetMap, LocationIQ, Vite",
  thumb: xeroThumb,
  video: xeroVideo,
    purpose:
      "Built as a college project for the TISD course to simplify document printing and delivery for students and professionals. Interactive map, upload & order flows, and routing.",
    features:
      "Interactive map view, search/autocomplete, Overpass API nearby search, routing & directions, file upload & order placement UI, responsive UI.",
    further:
      "Add secure backend (Supabase/Postgres or Node/Express), authentication, payment integration, unit tests, performance & accessibility improvements.",
  },
  {
    id: 2,
    title: "FinTech Tracker",
    desc: "A modern personal finance dashboard — intuitive insights, fast tracking, and secure auth.",
    tech: "React, Chart.js, Express, MongoDB, JWT",
  thumb: fintechThumb,
  // user said demo for fintech has no video -> leave video null to show coming soon
  video: null,
    purpose:
      "Lightweight full-stack prototype combining a Vite + React SPA with an Express + MongoDB REST backend to provide secure user registration, login, and dashboards for budgets and insights.",
    features:
      "Dashboard, Overview, Budget, Insights, Account, Settings, private routes, JWT auth, charts and transaction tracking.",
    further:
      "Finish transaction persistence, add bank integrations, unit tests, deploy backend, and polish UI.",
  },
  {
    id: 3,
    title: "KaamSetu",
    desc: "AI-assisted staff scheduling and shift management for small businesses.",
    tech: "React, Supabase, Tailwind, GSAP",
  thumb: kaamsetuThumb,
  video: kaamsetuVideo,
    purpose:
      "Built as a hackathon project to automate shift creation and communication. Focused on role-based dashboards, scheduling UI, and real-time logs.",
    features:
      "Authentication with Supabase, role-based routing (owner/staff), AI-ready scheduling UI, real-time logs, animated landing/auth pages.",
    further:
      "Integrate an AI scheduling engine, add real-time sync, improve permissions and mobile support.",
  },
  {
    id: 4,
    title: "Mahakali — IKS Web Experience",
    desc: "An immersive, educational web experience showcasing the Mahakali Caves through visuals, a virtual museum, and an IKS-themed interactive game.",
    tech: "HTML5, CSS3, Bootstrap 5, A-Frame",
  thumb: mahakaliThumb,
  video: mahakaliVideo,
    purpose:
      "Built as a college project to research and present the cultural and historical significance of the Mahakali Caves. Includes hero, gallery, virtual museum (A-Frame), and multimedia.",
    features:
      "Hero & landing, gallery, virtual museum (A-Frame), video tour, image gallery, responsive navbar.",
    further:
      "Add lazy-loading, accessibility improvements, lazy video load, and localization.",
  },
  {
    id: 5,
    title: "Demo Website",
    desc: "Clean, responsive Next.js prototype showcasing modern UI, authentication flows, and contact features.",
    tech: "Next.js (App Router), Bootstrap, React",
  thumb: demoThumb,
  video: demoVideo,
    purpose:
      "A hands-on exploration of Next.js and Bootstrap to build a small demo site demonstrating routing, forms and responsive layouts.",
    features:
      "Hero landing, About page, Contact page with forms and map, auth UI, reusable footer and layout.",
    further:
      "Add form handlers, authentication backend, and tests; deploy to Vercel or Netlify.",
  },
];

const Project = () => {
  const canvasRef = useRef(null);
  const cardRefs = useRef([]);
  const gridRef = useRef(null);
  const rafRef = useRef(null);
  // selected project for video modal (null = closed)
  const [videoProject, setVideoProject] = React.useState(null);
  const [details, setDetails] = React.useState(null);

  useEffect(() => {
    // GSAP ScrollTrigger staggered reveal + glow pulse
    const cardEls = cardRefs.current.filter(Boolean);
    gsap.set(cardEls, { opacity: 0, y: 28, scale: 0.98, filter: 'blur(6px)' });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 80%',
      },
    });
    tl.to(cardEls, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'none',
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.09,
      onComplete: () => {
        cardEls.forEach((el) => {
          el.classList.add('revealed');
          el.classList.add('glow-pulse');
          setTimeout(() => el.classList.remove('glow-pulse'), 900);
        });
      },
    });

  // --------- Canvas Starfield / Asteroids / Shooting stars ----------
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
  let W = (canvas.width = window.innerWidth);
  let H = (canvas.height = window.innerHeight);

  const isMobile = window.innerWidth < 768;

    // star layers for parallax depth
    // Reduce counts/speeds on mobile to improve perf
    const starLayers = isMobile
      ? [
          { count: 60, size: [0.6, 1.2], speed: 0.08, color: "rgba(255,255,255,0.6)" },
          { count: 30, size: [1.0, 1.8], speed: 0.12, color: "rgba(200,255,255,0.5)" },
        ]
      : [
          { count: 120, size: [0.6, 1.4], speed: 0.15, color: "rgba(255,255,255,0.7)" },
          { count: 60, size: [1.2, 2.2], speed: 0.25, color: "rgba(200,255,255,0.55)" },
          { count: 30, size: [2.4, 4.2], speed: 0.45, color: "rgba(160,220,255,0.5)" },
        ];

    const stars = [];
    starLayers.forEach((layer, li) => {
      for (let i = 0; i < layer.count; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * (layer.size[1] - layer.size[0]) + layer.size[0],
          speed: layer.speed,
          color: layer.color,
          layer: li,
        });
      }
    });

    // asteroids (bigger dark objects that drift and "clash")
    const asteroids = Array.from({ length: 8 }).map(() => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 28 + 18,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      hue: 30 + Math.random() * 20,
    }));

  // shooting stars (disabled on mobile)
  const shootingStars = isMobile ? [] : [];

    const spawnShootingStar = () => {
      const sx = Math.random() * W * 0.8;
      const sy = Math.random() * H * 0.5;
      shootingStars.push({
        x: sx,
        y: sy,
        vx: 6 + Math.random() * 6,
        vy: 2 + Math.random() * 2,
        len: 90 + Math.random() * 160,
        life: 0,
        ttl: 60 + Math.random() * 40,
      });
    };

  // spawn occasionally (skip on mobile)
  let shootTimer = 0;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resize);

    // Throttle heavy draw loop for mobile: use a lower FPS
    const targetFPS = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFPS;
    let lastFrameTime = 0;

    function draw(now) {
      if (!now) now = performance.now();
      if (now - lastFrameTime < frameInterval) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      lastFrameTime = now;

      // continue with drawing
      ctx.clearRect(0, 0, W, H);

      // nebula soft overlay via radial gradients for energetic look
      // Layered subtle nebula shapes with additive blend
      const g1 = ctx.createRadialGradient(W * 0.15, H * 0.2, 50, W * 0.15, H * 0.2, 450);
      g1.addColorStop(0, "rgba(0,255,198,0.06)");
      g1.addColorStop(0.4, "rgba(0,191,255,0.04)");
      g1.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, W, H);

      const g2 = ctx.createRadialGradient(W * 0.8, H * 0.75, 50, W * 0.8, H * 0.75, 600);
      g2.addColorStop(0, "rgba(160,80,255,0.035)");
      g2.addColorStop(0.5, "rgba(0,191,255,0.02)");
      g2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, W, H);

      // stars
      for (let s of stars) {
        s.x -= s.speed;
        if (s.x < -10) s.x = W + 10;
        // twinkle variation
        const flicker = 0.6 + Math.sin((Date.now() / 300) + s.x * 0.01) * 0.4;
        ctx.beginPath();
        ctx.fillStyle = s.color.replace(/[\d\.]+\)$/g, `${flicker})`); // preserve rgba and change alpha-ish by string replace
        ctx.globalCompositeOperation = "lighter";
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // asteroids (clashing)
      for (let a of asteroids) {
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < -50) a.x = W + 50;
        if (a.x > W + 50) a.x = -50;
        if (a.y < -50) a.y = H + 50;
        if (a.y > H + 50) a.y = -50;

        // draw with subtle lighting
        ctx.beginPath();
        const grad = ctx.createRadialGradient(a.x - a.r * 0.3, a.y - a.r * 0.3, a.r * 0.1, a.x, a.y, a.r * 1.2);
        grad.addColorStop(0, `rgba(80,80,100,0.9)`);
        grad.addColorStop(0.6, `rgba(30,30,40,0.95)`);
        grad.addColorStop(1, `rgba(0,0,0,0)`);
        ctx.fillStyle = grad;
        ctx.globalCompositeOperation = "source-over";
        // irregular asteroid shape
        ctx.save();
        ctx.translate(a.x, a.y);
        ctx.rotate((Date.now()/1000) * (a.vx + a.vy) * 0.2);
        ctx.beginPath();
        for (let i = 0; i < 7; i++) {
          const ang = (i / 7) * Math.PI * 2;
          const rad = a.r * (0.7 + Math.sin(i + a.x * 0.01) * 0.2);
          const px = Math.cos(ang) * rad;
          const py = Math.sin(ang) * rad;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // shooting stars
      shootTimer++;
      if (shootTimer > 140 + Math.random() * 120) {
        spawnShootingStar();
        shootTimer = 0;
      }
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const st = shootingStars[i];
        st.x += st.vx;
        st.y += st.vy;
        st.life++;
        ctx.globalCompositeOperation = "lighter";
        const tailAlpha = Math.max(0, 1 - st.life / st.ttl);
        ctx.strokeStyle = `rgba(255,255,255,${0.9 * tailAlpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(st.x, st.y);
        ctx.lineTo(st.x - st.vx * (st.len / 10), st.y - st.vy * (st.len / 10));
        ctx.stroke();
        if (st.life > st.ttl) shootingStars.splice(i, 1);
      }

      ctx.globalCompositeOperation = "source-over";

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    // cleanup
    return () => {
      try { tl.kill && tl.kill(); } catch (e) {}
      try { ScrollTrigger.getAll().forEach((t) => t.kill && t.kill()); } catch (e) {}
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // custom cursor for Projects section
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'projects-cursor';
    document.body.appendChild(cursor);

    const move = (e) => {
      cursor.style.transform = `translate3d(${e.clientX - 12}px, ${e.clientY - 12}px, 0)`;
    };

    const enterCard = () => cursor.classList.add('cursor-hover');
    const leaveCard = () => cursor.classList.remove('cursor-hover');

    window.addEventListener('mousemove', move);
    const cards = cardRefs.current.filter(Boolean);
    cards.forEach((c) => {
      c.addEventListener('mouseenter', enterCard);
      c.addEventListener('mouseleave', leaveCard);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      try { cursor.remove(); } catch(e) {}
      cards.forEach((c) => {
        c.removeEventListener('mouseenter', enterCard);
        c.removeEventListener('mouseleave', leaveCard);
      });
    };
  }, []);

  // small helper for card refs
  const setCardRef = (el, i) => (cardRefs.current[i] = el);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0B1120] text-white">
      {/* canvas background - full screen */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 block" />

      {/* nebula overlay (energetic) */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          mixBlendMode: "screen",
        }}
      >
        {/* layered energetic nebula blobs - positioned to add depth */}
        <div
          className="absolute -left-20 top-16 w-[36rem] h-[36rem] rounded-full blur-[80px] opacity-40"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(0,255,198,0.18), rgba(0,191,255,0.06), rgba(110,36,255,0.02))",
            transform: "rotate(12deg)",
            animation: "nebulaMove 18s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute right-4 top-[40%] w-[28rem] h-[28rem] rounded-full blur-[72px] opacity-30"
          style={{
            background: "radial-gradient(circle at 60% 40%, rgba(160,80,255,0.14), rgba(0,191,255,0.04), transparent)",
            animation: "nebulaMove 22s ease-in-out infinite alternate-reverse",
          }}
        />
      </div>

      {/* content - keep above canvas and nebula */}
  <section className="relative z-20 max-w-7xl mx-auto px-6 py-20 projects-section">
        <header className="mb-12 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00FFC6] via-[#00BFFF] to-[#b28cff] drop-shadow-lg">
            My Projects
          </h2>
        </header>

        {/* grid of project cards */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-stretch"
        >
          {projects.map((proj, i) => (
            <article
              key={proj.id}
              ref={(el) => setCardRef(el, i)}
              className="relative w-full rounded-2xl overflow-hidden border border-transparent hover:border-[#00FFC6]/30 transition-all duration-300 bg-gradient-to-b from-[#07101a]/50 to-transparent backdrop-blur-sm card-interactive"
            >
              {/* card image area */}
              <div className="relative w-full h-72 sm:h-64 md:h-72 lg:h-72 bg-black">
                <img
                  src={proj.thumb}
                  alt={proj.title}
                  className="w-full h-full object-cover brightness-90 saturate-110"
                />
                <div className="absolute inset-0 overlay bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 px-3 py-1 rounded-full bg-[#00000080] text-xs text-[#00FFC6] font-medium">
                  {proj.tech}
                </div>
                {/* action buttons overlay (ensures visibility on top of image) */}
                <div className="absolute left-4 bottom-4 flex items-center gap-3 card-actions" style={{ zIndex: 9999 }}>
                  <button
                    onClick={() => setVideoProject(proj)}
                    className="px-3 py-2 rounded-md text-sm bg-[#00BFFF] text-black font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00BFFF]"
                    aria-label={`Play demo for ${proj.title}`}
                    tabIndex={0}
                  >
                    ▶ View Demo
                  </button>
                  <button
                    onClick={() => setDetails(proj)}
                    className="px-3 py-2 rounded-md text-sm bg-[#000000cc] text-[#00FFC6] font-medium shadow-lg border border-[#ffffff14] focus:outline-none focus:ring-2 focus:ring-[#00FFC6]"
                    aria-label={`Show details for ${proj.title}`}
                    tabIndex={0}
                  >
                    ℹ Details
                  </button>
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between h-full" style={{ zIndex: 30 }}>
                <div>
                  <h3 className="text-2xl font-semibold text-white truncate">{proj.title}</h3>
                  <p className="mt-2 text-sm text-gray-300 line-clamp-3">{proj.desc}</p>
                </div>

                {/* buttons moved into image overlay for guaranteed visibility */}

                <div className="mt-4 text-xs text-gray-400">{proj.tech}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* styles moved to src/index.css */}

      {/* Video Modal: uses videoProject */}
      {videoProject && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-lg font-semibold text-white">{videoProject.title} — Demo</h4>
              <button
                onClick={() => setVideoProject(null)}
                className="text-gray-400 hover:text-white"
                aria-label="Close demo"
              >
                ✕
              </button>
            </div>

            {videoProject.video ? (
              <video src={videoProject.video} controls autoPlay style={{ width: '100%', borderRadius: 8 }} />
            ) : (
              <div className="w-full h-64 flex items-center justify-center flex-col bg-gradient-to-r from-[#00121a] to-[#071226] rounded-md">
                <div className="mb-3 text-white text-lg font-medium">Demo coming soon</div>
                <div className="w-40 h-40 rounded-full flex items-center justify-center" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(0,191,255,0.12), rgba(178,140,255,0.06))' }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', border: '5px solid rgba(255,255,255,0.06)', borderTopColor: '#00FFC6', animation: 'spin 1s linear infinite' }} />
                </div>
                <div className="mt-4 text-sm text-gray-300">We're waiting for the demo — it'll be here soon.</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Details Modal */}
      {details && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-lg font-semibold text-white">{details.title} — Details</h4>
              <button
                onClick={() => setDetails(null)}
                className="text-gray-400 hover:text-white"
                aria-label="Close details"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-gray-200">
              <div>
                <h5 className="font-semibold">Description</h5>
                <p className="text-gray-300">{details.desc}</p>
              </div>

              <div>
                <h5 className="font-semibold">Purpose</h5>
                <p className="text-gray-300">{details.purpose || '—'}</p>
              </div>

              <div>
                <h5 className="font-semibold">Key features</h5>
                <p className="text-gray-300">{details.features || '—'}</p>
              </div>

              <div>
                <h5 className="font-semibold">Tech stack</h5>
                <p className="text-gray-300">{details.tech}</p>
              </div>

              <div>
                <h5 className="font-semibold">Further improvements</h5>
                <p className="text-gray-300">{details.further || '—'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Project;
