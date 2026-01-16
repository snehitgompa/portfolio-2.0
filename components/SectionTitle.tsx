import React from "react";
import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="mb-12 border-l-4 border-[#e50914] pl-6"
    >
      <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white glow-red">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[#e50914] mt-2 font-bold tracking-widest text-sm uppercase opacity-80">
          // {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionTitle;
