
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Terminal, 
  Cpu, 
  Database, 
  Cloud, 
  Award, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin,
  ArrowRight,
  ExternalLink,
  Layers,
  Activity,
  Box,
  Zap,
  Code,
  Globe,
  Lock,
  Wifi
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer 
} from 'recharts';

import CustomCursor from './components/CustomCursor';
import SectionTitle from './components/SectionTitle';
import BackgroundNexus from './components/BackgroundNexus';
import { 
  PERSONAL_INFO, 
  EXPERIENCES, 
  SKILLS, 
  PROJECTS, 
  CERTIFICATIONS 
} from './constants';

const FloatingData: React.FC = () => {
  const [fragments, setFragments] = useState<{id: number, x: number, y: number, text: string}[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFragments(prev => {
        const newFrag = {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          text: (Math.random() * 0xFFFFFF << 0).toString(16).toUpperCase().padStart(6, '0')
        };
        return [...prev.slice(-15), newFrag];
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
      <AnimatePresence mode='popLayout'>
        {fragments.map(f => (
          <motion.div
            key={f.id}
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: [0, 1, 1, 0], y: -80, scale: 1, rotate: 5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 5 }}
            style={{ position: 'absolute', left: `${f.x}%`, top: `${f.y}%` }}
            className="flex flex-col"
          >
            <span className="text-[#e50914] text-[8px] font-mono tracking-tighter">DATA_STRM://0x{f.text}</span>
            <div className="w-12 h-[1px] bg-gradient-to-r from-[#e50914] to-transparent"></div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const rotateParallax = useTransform(scrollYProgress, [0, 1], [0, 15]);

  // Spring animations for smoothness
  const springX = useSpring(0, { damping: 50, stiffness: 400 });
  const springY = useSpring(0, { damping: 50, stiffness: 400 });

  // Fix: Combine yParallax and springY into a single motion value to avoid duplicate property error in the style object.
  const combinedY = useTransform([yParallax, springY], ([latestYParallax, latestSpringY]) => 
    (latestYParallax as number) + (latestSpringY as number)
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    const handleMouseMove = (e: MouseEvent) => {
      springX.set(e.clientX / 50);
      springY.set(e.clientY / 50);
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const skillData = [
    { subject: 'Python', A: 95, fullMark: 100 },
    { subject: 'React', A: 85, fullMark: 100 },
    { subject: 'AWS', A: 90, fullMark: 100 },
    { subject: 'SQL', A: 88, fullMark: 100 },
    { subject: 'Salesforce', A: 80, fullMark: 100 },
    { subject: 'Docker', A: 82, fullMark: 100 },
  ];

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-black flex flex-col items-center justify-center overflow-hidden">
        <div className="relative">
          <motion.div 
            animate={{ rotate: 360, borderColor: ['#e50914', '#ffffff', '#e50914'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-48 h-48 border-4 border-[#e50914]/10 rounded-full border-t-[#e50914] flex items-center justify-center"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
             <motion.span 
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 0.1, repeat: Infinity }}
              className="font-orbitron text-[#e50914] text-4xl font-black glow-red"
             >
              SG
             </motion.span>
             <span className="text-[10px] text-[#e50914] mt-2 tracking-[0.4em] font-bold">BYPASSING FIREWALL...</span>
          </div>
        </div>
        <div className="mt-12 w-64 h-1 bg-white/5 relative overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute top-0 left-0 h-full bg-[#e50914]"
          />
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-gray-300 overflow-x-hidden selection:bg-[#e50914] selection:text-white">
      <CustomCursor />
      <BackgroundNexus />
      <FloatingData />
      
      {/* Background Decor - Parallax HUD elements */}
      {/* Fix: use combinedY instead of passing both yParallax and springY as 'y' property */}
      <motion.div style={{ y: combinedY, rotate: rotateParallax, x: springX }} className="fixed inset-0 pointer-events-none z-0 opacity-15">
        <div className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] border border-[#e50914]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-[30%] left-[5%] w-[90vw] h-[1px] bg-gradient-to-r from-transparent via-[#e50914] to-transparent"></div>
        <div className="absolute top-0 left-[15%] w-[1px] h-full bg-gradient-to-b from-transparent via-[#e50914] to-transparent"></div>
        <div className="absolute top-[60%] right-[20%] flex flex-col items-end gap-2 text-[#e50914] font-mono text-[8px]">
          <span>X: {Math.round(mousePos.x)}</span>
          <span>Y: {Math.round(mousePos.y)}</span>
          <div className="w-12 h-12 border border-[#e50914]/40 animate-spin"></div>
        </div>
      </motion.div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center backdrop-blur-3xl bg-black/70 border-b border-[#e50914]/20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="relative">
            <div className="w-10 h-10 border-2 border-[#e50914] flex items-center justify-center font-black text-[#e50914] transition-all group-hover:bg-[#e50914] group-hover:text-black">
              SG
            </div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#e50914] animate-ping"></div>
          </div>
          <div className="flex flex-col">
            <span className="font-orbitron font-black text-sm tracking-[0.2em] text-white">NEXUS_OS</span>
            <span className="text-[8px] text-[#e50914] font-bold">CORE_ESTABLISHED</span>
          </div>
        </motion.div>
        
        <div className="flex space-x-12 uppercase text-[10px] tracking-widest font-black">
          {['home', 'experience', 'projects', 'contact'].map((item, idx) => (
            <a 
              key={item} 
              href={`#${item}`} 
              className="hover:text-[#e50914] transition-all duration-300 flex items-center group relative py-1"
            >
              <span className="text-[#e50914] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">0{idx+1}_</span>
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Floating Status HUD */}
      <div className="fixed top-32 right-12 z-20 hidden lg:block">
        <div className="flex flex-col items-end gap-6">
          <div className="p-4 border border-[#e50914]/20 bg-black/40 backdrop-blur-md">
            <div className="flex items-center gap-4 text-[9px] font-black text-white/40">
              <Globe size={12} className="text-[#e50914]" />
              <span className="tracking-[0.2em]">CONNECTION_SECURE</span>
              <div className="flex gap-1">
                {[1,2,3].map(i => <div key={i} className="w-1 h-3 bg-[#e50914]"></div>)}
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 border border-white/5 flex items-center justify-center hover:bg-[#e50914] transition-all cursor-pointer">
              <Lock size={12} />
            </div>
            <div className="w-8 h-8 border border-white/5 flex items-center justify-center hover:bg-[#e50914] transition-all cursor-pointer">
              <Wifi size={12} />
            </div>
          </div>
        </div>
      </div>

      <main className="relative z-10 pt-32 px-6 md:px-12 lg:px-24">
        
        {/* Hero Section */}
        <section id="home" className="min-h-[100vh] flex flex-col justify-center relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <motion.div 
                animate={{ width: [0, 48] }}
                className="h-[1px] bg-[#e50914]"
              />
              <span className="text-[#e50914] text-xs font-black tracking-[0.5em] uppercase">SYSTEM_OPERATOR // v4.0.92</span>
            </div>
            
            <h1 className="text-7xl md:text-[10rem] font-black text-white leading-[0.75] tracking-tighter uppercase mb-16 relative">
              <motion.span 
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="block mb-2 glitch-text" 
                data-text="SNEHIT"
              >
                SNEHIT
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="block text-[#e50914] glow-red italic glitch-text"
                data-text="GOMPA"
              >
                GOMPA
              </motion.span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-20 items-end">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="relative p-12 bg-white/[0.02] border-l-4 border-[#e50914] backdrop-blur-sm group overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Terminal size={120} className="text-[#e50914]" />
                </div>
                <p className="text-gray-300 text-xl leading-relaxed font-medium relative z-10">
                  {PERSONAL_INFO.summary}
                </p>
                <div className="mt-8 flex gap-3">
                  {['SCALING', 'SECURITY', 'PERFORMANCE'].map(tag => (
                    <span key={tag} className="text-[9px] font-black bg-[#e50914]/10 text-[#e50914] px-2 py-1 rounded-sm border border-[#e50914]/20 tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              <div className="flex flex-col gap-6">
                <motion.a 
                  href="#experience"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(229,9,20,0.4)" }}
                  className="bg-[#e50914] text-white py-8 px-12 font-black text-center tracking-[0.3em] text-md relative overflow-hidden group shadow-2xl"
                >
                  <span className="relative z-10 flex items-center justify-center gap-4">
                    INIT_PROXIMITY_SYNC <ArrowRight size={20} />
                  </span>
                  <motion.div 
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-white/20 skew-x-12"
                  />
                </motion.a>
                <div className="flex gap-6">
                   <a href={PERSONAL_INFO.linkedin} className="flex-1 p-6 border border-white/10 hover:border-[#e50914] hover:bg-[#e50914]/10 text-center transition-all group relative">
                     <Linkedin size={24} className="mx-auto group-hover:scale-125 transition-transform" />
                     <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#e50914]"></div>
                   </a>
                   <a href={`mailto:${PERSONAL_INFO.email}`} className="flex-1 p-6 border border-white/10 hover:border-[#e50914] hover:bg-[#e50914]/10 text-center transition-all group relative">
                     <Mail size={24} className="mx-auto group-hover:scale-125 transition-transform" />
                     <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#e50914]"></div>
                   </a>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Technical Interface Section */}
        <section className="py-48">
          <SectionTitle title="Neural_Architecture" subtitle="Core Processing Capabilities" />
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-20">
            <motion.div 
              className="bg-black/60 border border-[#e50914]/20 p-12 relative overflow-hidden group"
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#e50914]/5 rounded-full blur-3xl group-hover:bg-[#e50914]/10 transition-all"></div>
              <div className="absolute top-4 right-4 text-[10px] font-mono text-[#e50914] flex items-center gap-2">
                <Activity size={12} className="animate-pulse" />
                REALTIME_METRICS_LOG
              </div>
              <ResponsiveContainer width="100%" height={450}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                  <PolarGrid stroke="#e5091444" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#ffffff', fontSize: 12, fontWeight: '900', letterSpacing: '0.1em' }} />
                  <Radar
                    name="Skill"
                    dataKey="A"
                    stroke="#e50914"
                    fill="#e50914"
                    fillOpacity={0.7}
                    animationDuration={2500}
                  />
                </RadarChart>
              </ResponsiveContainer>
              <div className="mt-8 flex justify-center gap-8">
                <div className="flex flex-col items-center">
                  <span className="text-white text-2xl font-black">3.7</span>
                  <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">CUMULATIVE_GPA</span>
                </div>
                <div className="flex flex-col items-center border-l border-white/10 pl-8">
                  <span className="text-white text-2xl font-black">200+</span>
                  <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">DEPLOYMENTS</span>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-6">
               {SKILLS.flatMap(cat => cat.skills).slice(0, 10).map((skill, i) => (
                 <motion.div 
                   key={i}
                   whileHover={{ borderColor: '#e50914', y: -5, backgroundColor: 'rgba(229,9,20,0.05)' }}
                   className="p-8 border border-white/5 bg-white/[0.01] flex flex-col justify-between group transition-all relative"
                 >
                    <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-t-transparent border-r-[30px] border-r-white/5 group-hover:border-r-[#e50914]/20 transition-all"></div>
                    <Code size={18} className="mb-6 opacity-30 group-hover:text-[#e50914] group-hover:opacity-100 transition-all" />
                    <div>
                      <span className="text-[8px] text-[#e50914] font-black mb-1 block">SKILL_ID_0{i}</span>
                      <span className="font-black text-sm tracking-tighter text-white group-hover:glow-red">{skill.toUpperCase()}</span>
                    </div>
                 </motion.div>
               ))}
            </div>
          </div>
        </section>

        {/* Experience - Aggressive List */}
        <section id="experience" className="py-48">
          <SectionTitle title="Deployment_Logs" subtitle="System History & Evolution" />
          <div className="space-y-6">
            {EXPERIENCES.map((exp, idx) => (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 20, backgroundColor: 'rgba(229,9,20,0.08)' }}
                className="border-b border-white/10 p-12 flex flex-col md:grid md:grid-cols-[1fr_2fr_auto] items-start md:items-center gap-12 group transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#e50914] scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
                <div className="flex flex-col">
                  <span className="text-[#e50914] font-black text-sm font-mono tracking-tighter mb-2">{exp.period}</span>
                  <span className="text-gray-500 text-[10px] font-bold uppercase">{exp.location}</span>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white group-hover:text-[#e50914] transition-colors mb-2 uppercase tracking-tighter">
                    {exp.role}
                  </h3>
                  <p className="text-gray-400 text-xs font-black uppercase tracking-widest">{exp.company}</p>
                </div>
                <div className="opacity-20 group-hover:opacity-100 group-hover:translate-x-4 transition-all">
                  <ArrowRight size={32} className="text-[#e50914]" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Immersive Contact Section */}
        <section id="contact" className="py-64 border-t border-[#e50914]/20 relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-t from-[#e50914]/10 to-transparent"></div>
           <div className="max-w-5xl mx-auto text-center relative z-10">
              <motion.div 
                animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="inline-block mb-12"
              >
                <div className="w-24 h-24 border-2 border-[#e50914] rotate-45 flex items-center justify-center">
                  <Zap size={40} className="text-[#e50914] -rotate-45" />
                </div>
              </motion.div>
              <motion.h2 
                className="text-7xl md:text-[10rem] font-black text-white uppercase tracking-tighter mb-16 leading-none"
              >
                ACCESS_DENIED <br/> 
                <span className="text-[#e50914] glow-red">REQUEST_ENTRY</span>
              </motion.h2>
              <div className="flex flex-wrap justify-center gap-16 mb-32">
                 <div className="flex flex-col items-center gap-4">
                   <span className="text-[10px] text-[#e50914] font-black tracking-[0.4em]">ENCRYPTED_EMAIL</span>
                   <a href={`mailto:${PERSONAL_INFO.email}`} className="text-white font-black text-4xl hover:text-[#e50914] transition-all tracking-tighter">{PERSONAL_INFO.email}</a>
                 </div>
                 <div className="flex flex-col items-center gap-4 border-l border-white/10 pl-16">
                   <span className="text-[10px] text-[#e50914] font-black tracking-[0.4em]">VOICE_HANDSHAKE</span>
                   <span className="text-white font-black text-4xl tracking-tighter">{PERSONAL_INFO.phone}</span>
                 </div>
              </div>
              <div className="flex justify-center gap-12 opacity-30 hover:opacity-100 transition-opacity">
                <Linkedin size={20} className="hover:text-[#e50914] cursor-pointer" />
                <Globe size={20} className="hover:text-[#e50914] cursor-pointer" />
                <Activity size={20} className="hover:text-[#e50914] cursor-pointer" />
              </div>
              <p className="text-[10px] font-black tracking-[1.5em] text-white/10 uppercase mt-32">
                TERMINATING SESSION // AUTHENTICATION REVOKED // 2025
              </p>
           </div>
        </section>
      </main>

      {/* Decorative Overlays */}
      <div className="fixed top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-[#e50914]/20 to-transparent"></div>
      <div className="fixed top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-[#e50914]/20 to-transparent"></div>
    </div>
  );
};

export default App;
