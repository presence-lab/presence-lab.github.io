"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  pulse: number;
  pulseSpeed: number;
}

export default function HeroConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let w = 0;
    let h = 0;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.scale(dpr, dpr);
    }

    resize();
    window.addEventListener("resize", resize);

    // Seeded positions for deterministic layout
    const COUNT = 18;
    const nodes: Node[] = [];
    for (let i = 0; i < COUNT; i++) {
      const angle = (i / COUNT) * Math.PI * 2 + (i * 0.7);
      const dist = 0.15 + (i % 5) * 0.12 + ((i * 7) % 11) * 0.02;
      nodes.push({
        x: 0.5 + Math.cos(angle) * dist * 0.8,
        y: 0.5 + Math.sin(angle) * dist,
        vx: (((i * 13) % 7) - 3) * 0.00008,
        vy: (((i * 17) % 7) - 3) * 0.00008,
        r: 2 + (i % 4) * 1.2,
        pulse: (i * 0.5) % (Math.PI * 2),
        pulseSpeed: 0.008 + (i % 3) * 0.004,
      });
    }

    const CONN_DIST = 0.28;
    const purple = { r: 82, g: 45, b: 128 };
    const orange = { r: 245, g: 102, b: 0 };

    function draw() {
      ctx!.clearRect(0, 0, w, h);

      // Update positions
      if (!prefersReduced) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          n.pulse += n.pulseSpeed;

          // Gentle bounce at boundaries
          if (n.x < 0.05 || n.x > 0.95) n.vx *= -1;
          if (n.y < 0.05 || n.y > 0.95) n.vy *= -1;
        }
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONN_DIST) {
            const alpha = (1 - dist / CONN_DIST) * 0.15;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x * w, nodes[i].y * h);
            ctx!.lineTo(nodes[j].x * w, nodes[j].y * h);
            ctx!.strokeStyle = `rgba(${purple.r}, ${purple.g}, ${purple.b}, ${alpha})`;
            ctx!.lineWidth = 1;
            ctx!.stroke();
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const pulseFactor = prefersReduced ? 1 : 0.8 + Math.sin(n.pulse) * 0.2;
        const r = n.r * pulseFactor;
        const isAccent = i % 5 === 0;
        const c = isAccent ? orange : purple;
        const baseAlpha = isAccent ? 0.5 : 0.35;

        // Glow
        const grad = ctx!.createRadialGradient(
          n.x * w, n.y * h, 0,
          n.x * w, n.y * h, r * 4
        );
        grad.addColorStop(0, `rgba(${c.r}, ${c.g}, ${c.b}, ${baseAlpha * 0.3})`);
        grad.addColorStop(1, `rgba(${c.r}, ${c.g}, ${c.b}, 0)`);
        ctx!.beginPath();
        ctx!.arc(n.x * w, n.y * h, r * 4, 0, Math.PI * 2);
        ctx!.fillStyle = grad;
        ctx!.fill();

        // Core dot
        ctx!.beginPath();
        ctx!.arc(n.x * w, n.y * h, r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${baseAlpha})`;
        ctx!.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
