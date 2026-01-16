import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Database,
  Award,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  ArrowRight,
  ExternalLink,
  Layers,
} from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

import CustomCursor from "./components/CustomCursor";
import SectionTitle from "./components/SectionTitle";
import {
  PERSONAL_INFO,
  EXPERIENCES,
  SKILLS,
  PROJECTS,
  CERTIFICATIONS,
} from "./constants";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const skillData = [
    { subject: "Python", A: 95, fullMark: 100 },
    { subject: "React", A: 85, fullMark: 100 },
    { subject: "AWS", A: 90, fullMark: 100 },
    { subject: "SQL", A: 88, fullMark: 100 },
    { subject: "Salesforce", A: 80, fullMark: 100 },
    { subject: "Docker", A: 82, fullMark: 100 },
  ];

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-black flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="w-64 h-[2px] bg-[#e50914] mb-4"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="text-[#e50914] font-bold tracking-[0.5em] text-xs uppercase"
        >
          INITIALIZING NEXUS...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-gray-300 overflow-x-hidden selection:bg-[#e50914] selection:text-white">
      <CustomCursor />

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(229,9,20,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(229,9,20,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_80%)]"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center backdrop-blur-md bg-black/50 border-b border-white/5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <div className="w-8 h-8 bg-[#e50914] flex items-center justify-center font-black text-white rounded-sm">
            SG
          </div>
          <span className="hidden md:inline font-orbitron font-bold text-xl tracking-tighter text-white">
            SNEHIT.GOMPA
          </span>
        </motion.div>

        <div className="flex space-x-8 uppercase text-[10px] tracking-widest font-bold">
          {["home", "experience", "projects", "contact"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="hover:text-[#e50914] transition-colors duration-300 flex items-center group relative py-2"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#e50914] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>
      </nav>

      <main className="relative z-10 pt-32 px-6 md:px-12 lg:px-24">
        {/* Hero Section */}
        <section
          id="home"
          className="min-h-[80vh] flex flex-col justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 text-[#e50914] font-bold text-xs mb-6 px-3 py-1 border border-[#e50914]/30 rounded-full bg-[#e50914]/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e50914] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e50914]"></span>
              </span>
              <span>AVAILABLE FOR NEW OPPORTUNITIES</span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-none tracking-tighter uppercase mb-6">
              SOFTWARE
              <br />
              <span className="text-[#e50914] glow-red">ENGINEER</span>
            </h1>

            <div className="max-w-2xl text-gray-400 text-lg leading-relaxed mb-10 border-l-2 border-white/10 pl-6">
              {PERSONAL_INFO.summary}
            </div>

            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#experience"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#e50914] hover:bg-[#ff0000] text-white px-8 py-4 rounded-sm font-bold flex items-center space-x-3 transition-all interactive"
              >
                <span>VIEW EXPERIENCE</span>
                <ArrowRight size={18} />
              </motion.a>
              <div className="flex space-x-4">
                {[Linkedin, Mail].map((Icon, idx) => (
                  <motion.a
                    key={idx}
                    href={
                      idx === 0
                        ? PERSONAL_INFO.linkedin
                        : `mailto:${PERSONAL_INFO.email}`
                    }
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "rgba(255,255,255,0.1)",
                    }}
                    className="w-14 h-14 border border-white/10 flex items-center justify-center rounded-sm transition-all interactive"
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
          >
            <span className="text-[10px] tracking-widest mb-2 opacity-50">
              SCROLL
            </span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-[#e50914] to-transparent"></div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section className="py-24">
          <SectionTitle
            title="Technical DNA"
            subtitle="Capabilities & Tech Stack"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-black/40 border border-white/5 p-8 rounded-sm h-[400px] flex items-center justify-center relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#e50914]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  data={skillData}
                >
                  <PolarGrid stroke="#333" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "#888", fontSize: 12, fontWeight: "bold" }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={false}
                    axisLine={false}
                  />
                  <Radar
                    name="Skill"
                    dataKey="A"
                    stroke="#e50914"
                    fill="#e50914"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>

            <div className="space-y-6">
              {SKILLS.map((cat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <h3 className="text-[#e50914] font-bold text-sm mb-3 tracking-widest uppercase flex items-center space-x-2">
                    <span className="w-4 h-[1px] bg-[#e50914]"></span>
                    <span>{cat.category}</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-4 py-2 bg-white/5 border border-white/10 text-xs font-bold rounded-sm group-hover:border-[#e50914]/50 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24">
          <SectionTitle
            title="Deployment History"
            subtitle="Professional Experience"
          />

          <div className="space-y-12">
            {EXPERIENCES.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative group grid md:grid-cols-[1fr_3fr] gap-8 border-b border-white/10 pb-12 last:border-0"
              >
                <div className="flex flex-col">
                  <span className="text-[#e50914] font-bold text-sm font-orbitron">
                    {exp.period}
                  </span>
                  <span className="text-gray-500 text-xs mt-1 uppercase tracking-widest">
                    {exp.location}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-[#e50914] transition-colors flex items-center gap-2">
                      {exp.role}
                    </h3>
                    <p className="text-lg text-gray-400 font-bold uppercase tracking-tight">
                      {exp.company}
                    </p>
                  </div>

                  <ul className="space-y-3">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className="flex items-start space-x-3 text-sm leading-relaxed text-gray-500 group-hover:text-gray-300 transition-colors"
                      >
                        <Terminal
                          size={14}
                          className="mt-1 flex-shrink-0 text-[#e50914] opacity-50"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects & Certs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 py-24">
          <section id="projects">
            <SectionTitle
              title="Active Projects"
              subtitle="Research & Development"
            />
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-black/60 border border-white/5 p-8 relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                  <Layers size={40} className="text-[#e50914]" />
                </div>
                <div className="flex items-center space-x-3 mb-6">
                  <span className="px-2 py-1 bg-[#e50914] text-white text-[10px] font-black rounded-sm">
                    {project.date}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {project.title}
                </h3>
                <ul className="space-y-2 mb-8 text-sm text-gray-500">
                  {project.description.map((line, lIdx) => (
                    <li key={lIdx} className="flex items-center space-x-2">
                      <span className="w-1 h-1 bg-[#e50914] rounded-full"></span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-black uppercase tracking-tighter bg-white/5 border border-white/10 px-2 py-1"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </section>

          <section>
            <SectionTitle title="Verification" subtitle="Credentials & Certs" />
            <div className="grid grid-cols-1 gap-4">
              {CERTIFICATIONS.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10, borderColor: "rgba(229,9,20,0.5)" }}
                  className="bg-white/5 border border-white/10 p-4 rounded-sm flex items-center justify-between group interactive"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-[#e50914]/10 border border-[#e50914]/30 rounded-full flex items-center justify-center text-[#e50914]">
                      <Award size={20} />
                    </div>
                    <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors uppercase tracking-tight">
                      {cert.name}
                    </span>
                  </div>
                  <ExternalLink
                    size={16}
                    className="text-white/20 group-hover:text-[#e50914] transition-colors"
                  />
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-8 border border-dashed border-[#e50914]/30 bg-[#e50914]/5 rounded-sm">
              <h4 className="font-orbitron font-bold text-white mb-2 flex items-center gap-2">
                <Database size={18} className="text-[#e50914]" />
                Education
              </h4>
              <p className="text-gray-300 font-bold">
                Master of Science in Informatics
              </p>
              <p className="text-gray-500 text-sm italic">
                Northeastern University, Boston, MA
              </p>
              <p className="text-[#e50914] font-black text-xl mt-2">GPA: 3.7</p>
            </div>
          </section>
        </div>

        {/* Footer/Contact */}
        <section id="contact" className="py-32 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-5xl md:text-7xl font-black text-white uppercase mb-12 tracking-tighter"
            >
              LET'S BUILD THE <span className="text-[#e50914]">FUTURE</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: Mail,
                  label: "EMAIL",
                  value: PERSONAL_INFO.email,
                  href: `mailto:${PERSONAL_INFO.email}`,
                },
                {
                  icon: Phone,
                  label: "PHONE",
                  value: PERSONAL_INFO.phone,
                  href: `tel:${PERSONAL_INFO.phone}`,
                },
                {
                  icon: MapPin,
                  label: "LOCATION",
                  value: PERSONAL_INFO.location,
                  href: "#",
                },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="p-8 border border-white/5 hover:border-[#e50914]/50 hover:bg-white/5 transition-all group interactive"
                >
                  <item.icon
                    size={24}
                    className="mx-auto mb-4 text-gray-500 group-hover:text-[#e50914] transition-colors"
                  />
                  <span className="block text-[10px] tracking-widest text-[#e50914] font-bold mb-2 uppercase">
                    {item.label}
                  </span>
                  <span className="text-white font-bold break-all">
                    {item.value}
                  </span>
                </a>
              ))}
            </div>

            <p className="text-gray-600 text-xs tracking-widest font-bold uppercase">
              &copy; 2025 SNEHIT GOMPA / RE-ENGINEERED WITH PASSION
            </p>
          </div>
        </section>
      </main>

      {/* Decorative vertical lines */}
      <div className="fixed top-0 right-10 w-[1px] h-full bg-white/5 z-0"></div>
      <div className="fixed top-0 left-10 w-[1px] h-full bg-white/5 z-0"></div>
    </div>
  );
};

export default App;
