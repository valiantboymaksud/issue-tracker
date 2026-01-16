"use client";

import { useEffect, useRef } from "react";

export default function StormBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // FIX: Assign to a new non-nullable variable to use in inner functions
    const context = ctx;

    let width: number, height: number;
    let particles: Particle[] = [];
    let lightningTimer = 0;

    // Configuration
    const particleCount = window.innerWidth < 768 ? 40 : 70;
    const connectionDistance = 150;
    
    // Resize Handling
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        // Use 'context' instead of 'ctx'
        context.fillStyle = "rgba(148, 163, 184, 0.5)"; 
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      // Use 'context' instead of 'ctx'
      context.clearRect(0, 0, width, height);

      // Update & Draw Particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Draw Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            // Use 'context' instead of 'ctx'
            context.beginPath();
            let opacity = 1 - distance / connectionDistance;
            context.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.2})`; 
            context.lineWidth = 1;
            context.moveTo(particles[i].x, particles[i].y);
            context.lineTo(particles[j].x, particles[j].y);
            context.stroke();
          }
        }
      }

      // Random Lightning Pulse (Simulating Storm Energy)
      lightningTimer++;
      if (lightningTimer > 100 && Math.random() > 0.98) {
        lightningTimer = 0;
        // Flash background slightly
        // Use 'context' instead of 'ctx'
        context.fillStyle = "rgba(59, 130, 246, 0.03)";
        context.fillRect(0, 0, width, height);
      }

      requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none bg-[#0B1120]"
    />
  );
}