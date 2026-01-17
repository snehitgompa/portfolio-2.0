
import React, { useEffect, useRef } from 'react';

const BackgroundNexus: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX - window.innerWidth / 2) / 10,
        y: (e.clientY - window.innerHeight / 2) / 10,
      };
    };

    class Particle {
      z: number;
      x: number;
      y: number;
      size: number;
      color: string;

      constructor() {
        this.reset();
      }

      reset() {
        this.z = Math.random() * 2000;
        this.x = (Math.random() - 0.5) * 2000;
        this.y = (Math.random() - 0.5) * 2000;
        this.size = Math.random() * 2 + 1;
        this.color = Math.random() > 0.8 ? '#ffffff' : '#e50914';
      }

      update(speed: number) {
        this.z -= speed;
        if (this.z <= 0) this.reset();
      }

      draw(centerX: number, centerY: number, mouseX: number, mouseY: number) {
        if (!ctx) return;
        
        const scale = 500 / this.z;
        const x2d = (this.x - mouseX) * scale + centerX;
        const y2d = (this.y - mouseY) * scale + centerY;

        if (x2d < 0 || x2d > canvas.width || y2d < 0 || y2d > canvas.height) return;

        const alpha = Math.min(1, (2000 - this.z) / 1000);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = alpha;
        
        // Draw trailing lines for speed effect
        ctx.beginPath();
        ctx.lineWidth = scale * 0.5;
        ctx.strokeStyle = this.color;
        ctx.moveTo(x2d, y2d);
        const trailLength = speed * 0.5;
        const trailScale = 500 / (this.z + trailLength);
        const trailX = (this.x - mouseX) * trailScale + centerX;
        const trailY = (this.y - mouseY) * trailScale + centerY;
        ctx.lineTo(trailX, trailY);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(x2d, y2d, this.size * scale * 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const particles: Particle[] = Array.from({ length: 400 }, () => new Particle());
    let speed = 15;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Motion blur effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Draw a subtle pulsating grid in the background
      const pulse = Math.sin(time * 0.01) * 0.05 + 0.1;
      ctx.strokeStyle = `rgba(229, 9, 20, ${pulse})`;
      ctx.lineWidth = 0.5;
      for(let i = 0; i < canvas.width; i += 100) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for(let i = 0; i < canvas.height; i += 100) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      particles.forEach(p => {
        p.update(speed);
        p.draw(centerX, centerY, mouseRef.current.x, mouseRef.current.y);
      });

      time++;
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[-1]" 
    />
  );
};

export default BackgroundNexus;
