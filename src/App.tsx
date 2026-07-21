import { motion } from 'motion/react';
import { useRef, useState } from 'react';
// UPDATED: Replaced Twitter and Instagram with Youtube in lucide-react imports
import { Linkedin, Youtube, ArrowUpRight, ArrowRight } from 'lucide-react';
import zeeshanImage from './assets/ChatGPT Image Apr 30, 2026, 12_25_58 PM-Photoroom.png';
import React from 'react';
// UPDATED: Added premium animations using Framer Motion
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

// === GLASS STATUS BADGE ===
type BadgeVariant = 'ongoing' | 'cleared' | 'completed';

const badgeConfig: Record<BadgeVariant, { label: string; bg: string; border: string; text: string; glow: string; dot: string }> = {
  ongoing: {
    label: 'Ongoing',
    bg: 'rgba(0, 0, 0, 0.04)',
    border: 'rgba(0, 0, 0, 0.75)',
    text: '#111111',
    glow: 'rgba(0,0,0,0.12)',
    dot: '#111111',
  },
  cleared: {
    label: 'Cleared',
    bg: 'rgba(0, 0, 0, 0.82)',
    border: 'rgba(255,255,255,0.12)',
    text: '#f0f0f0',
    glow: 'rgba(0,0,0,0.3)',
    dot: '#a0ffa0',
  },
  completed: {
    label: 'Completed',
    bg: 'rgba(0,0,0,0.0)',
    border: 'rgba(0,0,0,0.2)',
    text: 'rgba(0,0,0,0.38)',
    glow: 'rgba(0,0,0,0.04)',
    dot: 'rgba(0,0,0,0.25)',
  },
};

function GlassStatusBadge({ variant }: { variant: BadgeVariant }) {
  const [hovered, setHovered] = useState(false);
  const [shimmerX, setShimmerX] = useState(50);
  const ref = useRef<HTMLSpanElement>(null);
  const cfg = badgeConfig[variant];

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setShimmerX(((e.clientX - rect.left) / rect.width) * 100);
  };

  return (
    <motion.span
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.06, y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '5px 13px',
        borderRadius: '100px',
        border: `1px solid ${cfg.border}`,
        background: cfg.bg,
        backdropFilter: 'blur(12px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(12px) saturate(1.4)',
        color: cfg.text,
        fontSize: '10px',
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: hovered
          ? `0 0 0 1px ${cfg.border}, 0 4px 14px ${cfg.glow}, inset 0 1px 0 rgba(255,255,255,0.15)`
          : `0 1px 4px ${cfg.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`,
        transition: 'box-shadow 0.25s ease',
        userSelect: 'none',
      }}
    >
      {/* Inner glass shine layer */}
      <span
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          background: hovered
            ? `radial-gradient(ellipse 80% 60% at ${shimmerX}% 0%, rgba(255,255,255,0.22) 0%, transparent 70%)`
            : 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 60%)',
          pointerEvents: 'none',
          transition: 'background 0.15s ease',
        }}
      />
      {/* Status dot */}
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: cfg.dot,
          flexShrink: 0,
          boxShadow: variant === 'cleared' ? '0 0 4px 1px rgba(100,255,100,0.5)' : 'none',
        }}
      />
      {cfg.label}
    </motion.span>
  );
}

// === MOTION BUTTON ===
const MotionButton = ({ label, className = '' }: { label: string, className?: string }) => {
  return (
    <div
      className={`group/btn relative h-12 w-[110px] cursor-pointer outline-none shrink-0 ${className}`}
    >
      <span
        className='absolute top-0 left-0 bg-black block h-12 w-12 rounded-full transition-all duration-500 group-hover/btn:w-full group-hover:w-full'
        aria-hidden='true'
      ></span>
      <div className='absolute top-1/2 left-3 -translate-y-1/2 transition-transform duration-500 group-hover/btn:translate-x-1 group-hover:translate-x-1 z-10'>
        <ArrowRight className='text-[#e6e6e6] w-6 h-6' />
      </div>
      <span className='absolute top-1/2 left-[54px] -translate-y-1/2 text-black group-hover/btn:text-[#e6e6e6] group-hover:text-[#e6e6e6] text-lg font-medium tracking-tight whitespace-nowrap transition-colors duration-500 z-10 pointer-events-none'>
        {label}
      </span>
    </div>
  );
};

const Frame = ({ children, id, className = '' }: { children: React.ReactNode, id?: string, className?: string }) => (
  <motion.section
    id={id}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={{
      hidden: { opacity: 0, y: 40 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          ease: [0.16, 1, 0.3, 1],
          staggerChildren: 0.15,
          delayChildren: 0.1
        }
      }
    }}
    className={`w-full max-w-7xl mx-auto bg-[#e6e6e6] rounded-[2rem] border-4 border-black relative overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1),_16px_16px_32px_rgba(0,0,0,0.1)] flex flex-col ${className}`}
    style={{
      boxShadow: 'inset 4px 4px 0px 0px rgba(255,255,255,0.7), inset -4px -4px 0px 0px rgba(0,0,0,0.05), 20px 20px 60px rgba(0,0,0,0.15)'
    }}
  >
    {children}
  </motion.section>
);

// UPDATED: Added skillCategories data array for the Skills section
const skillCategories = [
  {
    category: 'Design',
    skills: ['Web Design', 'Art Direction', 'Visual Identity', 'UI/UX Design', 'Editorial Layout']
  },
  {
    category: 'Development',
    skills: [
      'Languages: C, C++, Java, JavaScript, TypeScript, SQL',
      'Frontend: React.js, Next.js, Vite, Tailwind CSS, EJS, Framer Motion',
      'Backend: Node.js, Express.js, REST APIs, Passport.js, JWT',
      'Databases: MongoDB, Mongoose, MySQL, Supabase',
      'AI & Tools: Gemini API, Puppeteer, Cheerio, Cloudinary, Git, Vercel, Render',
    ]
  },
  {
    category: 'Video & Content',
    skills: ['DaVinci Resolve', 'Adobe Premiere Pro', 'Scriptwriting', 'YouTube Production', 'Long-form Editing']
  },
  {
    category: 'Thinking',
    skills: ['Systematic Problem Solving', 'Analytical Thinking', 'Communication', 'Mentorship', 'Curriculum Design']
  },
];

// UPDATED: Added education data array for the Education section
const education = [
  {
    name: 'Jadavpur University',
    detail: 'B.E. Information Technology — SGPA Sem 1: 8.56/10 · Data Structures, OOP, C Programming',
    period: '2025 – Present',
    status: 'Ongoing'
  },
  {
    name: 'JEE Advanced 2025',
    detail: 'All India Rank — 9,591 (Top 6.4%)',
    period: '2025',
    status: 'Completed'
  },
  {
    name: 'JEE Mains 2025',
    detail: '98.58 Percentile — 1,400,000+ candidates (Top 1.5%)',
    period: '2025',
    status: 'Completed'
  },
  {
    name: 'WBJEE 2025',
    detail: 'Rank 412 / 150,000+ candidates — Top 0.3%',
    period: '2025',
    status: 'Completed'
  },
  {
    name: 'Class 12 — CBSE',
    detail: '84% — PCM Stream',
    period: '2021',
    status: 'Completed'
  },
  {
    name: 'Class 10 — CBSE',
    detail: '86% — All Subjects',
    period: '2019',
    status: 'Completed'
  },
];

// UPDATED: Added experience data array for the Experience section
const experience = [
  {
    title: 'Freelance Web Developer',
    company: 'Local Business Outreach · Kolkata',
    period: '2025 – Present',
    description: 'Client sites delivered: Moon City Studio, Bioscope Photo Art. End-to-end delivery using React, Tailwind CSS, and Framer Motion — from design concept through deployment.'
  },
  {
    title: 'JEE Guidance Content Creator',
    company: 'YouTube — Independent',
    period: '2023 – Present',
    description: '130,000+ total views. Educational content and structured mentorship for JEE aspirants across India — systematic curriculum design, long-form video, and an active community of engineering students.'
  },
  
];

// UPDATED: Added projectsData data array for the Projects section
const projectsData = [
  {
    title: "BizList",
    subtitle: "AI-Powered Business Audit & Lead Generation",
    description: "MERN SaaS that scrapes live Google Maps data via headless Chrome (bot-evasion) and scores a business's Digital Health across Search Readiness, Local Execution, Brand Authority, and Website Experience. Validated via 200+ cold calls. Secured with Helmet, CORS, p-queue. Deployed as a monorepo on Vercel + Render.",
    tag: "React 19 · Node.js · Express · MongoDB · Puppeteer · Gemini API · Tailwind",
    link: "https://biz-list.vercel.app",
    githubLink: "https://github.com/Zeeshan3h3/BizList",
    status: 'completed' as BadgeVariant
  },
  
  {
    title: "JEEPredict",
    subtitle: "JEE College & Rank Predictor",
    description: "Next.js / TypeScript tool for predicting JEE college admissions based on rank inputs. Informed directly by years of mentorship domain expertise and channel audience feedback. Deployed on Vercel.",
    tag: "Next.js · TypeScript · Vercel",
    link: "",
    githubLink: "",
    status: 'completed' as BadgeVariant
  },
  {
    title: "ZTravels",
    subtitle: "Full-Stack Travel Booking Platform",
    description: "Full-stack travel listing platform with complete CRUD, user authentication (Passport.js / session), image uploads via Cloudinary, review system, and MongoDB Atlas persistence. Rendered with EJS.",
    tag: "Node.js · Express · MongoDB Atlas · EJS · Passport.js · Cloudinary",
    link: "",
    githubLink: "",
    status: 'completed' as BadgeVariant
  }
];

// ADDED: Achievements data
const achievements = [
  { text: 'JEE Advanced 2025 — AIR 9,591 (Top 6.4%)' },
  { text: 'JEE Mains 2025 — 98.58 Percentile (Top 1.5%)' },
  { text: 'WBJEE 2025 — Rank 412 / 150,000+ (Top 0.3%)' },
  { text: '180+ LeetCode problems solved (Arrays, Linked Lists, Strings, Recursion)' },
];

// UPDATED: Added services data array for the Services section
const services = [
  {
    title: 'Web Design',
    tags: 'Figma · React · Framer Motion',
    description: 'End-to-end website design from concept to final handoff. Clean layouts built for clarity and intent.'
  },
  {
    title: 'Art Direction',
    tags: 'Identity · Layout · Typography',
    description: 'Visual identity and creative direction for brands that want to communicate precisely and be remembered.'
  },
  {
    title: 'Video Editing',
    tags: 'DaVinci Resolve · Premiere',
    description: 'Professional post-production for YouTube, brand films, and educational content.'
  },
  {
    title: 'JEE Mentorship',
    tags: 'Strategy · Teaching',
    description: 'Structured one-on-one mentorship for JEE aspirants. Mock test strategy, weak area analysis, and exam planning.'
  },
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#e8e8e8] flex flex-col gap-16 sm:gap-24 p-4 sm:p-8 md:p-12 font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* HERO SECTION — relative wrapper lets text overflow card edges */}
      <div className="relative w-full max-w-7xl mx-auto">
        <Frame id="hero" className="aspect-[4/3] md:aspect-[16/10] min-h-[600px] relative">
          {/* Top Navigation */}
          <motion.nav variants={itemVariants} className="flex items-start sm:items-center justify-between p-6 sm:p-8 md:p-10 font-medium text-black relative z-20">
            <div className="text-sm sm:text-base md:text-lg tracking-tight w-1/3">
              © Zeeshan Design & Strategy
            </div>
            {/* UPDATED: Added new sections to navbar and kept responsive layout */}
            <div className="hidden sm:flex items-center justify-around w-2/3 max-w-2xl text-sm sm:text-base md:text-lg">
              <motion.a whileHover={{ scale: 1.05 }} href="#about" className="hover:opacity-70 transition-all duration-300">About</motion.a>
              <motion.a whileHover={{ scale: 1.05 }} href="#skills" className="hover:opacity-70 transition-all duration-300">Skills</motion.a>
              <motion.a whileHover={{ scale: 1.05 }} href="#education" className="hover:opacity-70 transition-all duration-300">Education</motion.a>
              <motion.a whileHover={{ scale: 1.05 }} href="#achievements" className="hover:opacity-70 transition-all duration-300">Achievements</motion.a>
              <motion.a whileHover={{ scale: 1.05 }} href="#experience" className="hover:opacity-70 transition-all duration-300">Experience</motion.a>
              <motion.a whileHover={{ scale: 1.05 }} href="#projects" className="hover:opacity-70 transition-all duration-300">Projects</motion.a>
              <motion.a whileHover={{ scale: 1.05 }} href="#services" className="hover:opacity-70 transition-all duration-300">Services</motion.a>
              <motion.a whileHover={{ scale: 1.05 }} href="#contact" className="hover:opacity-70 transition-all duration-300">Contact</motion.a>
            </div>
          </motion.nav>

          {/* Character Image */}
          <motion.div
            variants={itemVariants}
            className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-full h-[90%] md:h-[95%] z-10 flex justify-center items-end pointer-events-none"
          >
            {/* UPDATED: Added subtle breathing animation to hero portrait */}
            <motion.img
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              src={zeeshanImage}
              alt="Md Zeeshan"
              className="h-full object-contain object-bottom origin-bottom"
            />
          </motion.div>

          {/* Bottom Right Role Text */}
          <motion.div
            variants={itemVariants}
            className="absolute bottom-6 sm:bottom-8 md:bottom-10 right-6 sm:right-8 md:right-10 text-right z-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-black leading-[1.1]">
              Web Designer<br />Art Director<br />Content Creator
            </h2>
          </motion.div>

          {/* Bottom Left Social Icons */}
          <motion.div variants={itemVariants} className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-6 sm:left-8 md:left-10 flex flex-col gap-6 z-20">
            <motion.a whileHover={{ scale: 1.15, rotate: 5 }} href="https://www.linkedin.com/in/tipz-gaming-1431262a5/" className="text-black hover:opacity-60 transition-all duration-300" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
            </motion.a>
            <motion.a whileHover={{ scale: 1.15, rotate: -5 }} href="https://www.youtube.com/channel/UCkiJbacU_72kjE6z_w4aPAA" className="text-black hover:opacity-60 transition-all duration-300" aria-label="YouTube">
              <Youtube className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.a>
          </motion.div>
        </Frame>

        {/* Huge Name Text */}
        <motion.div
          initial={{ x: '-40%', opacity: 0 }}
          animate={{ x: '-50%', opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="absolute top-[45%] left-1/2 -translate-y-1/2 whitespace-nowrap text-black font-[900] tracking-[-0.06em] leading-none select-none pointer-events-none z-30 mix-blend-difference"
          style={{ fontSize: 'clamp(8rem, 20vw, 22rem)', color: 'white' }}
        >
          Md Zeeshan
        </motion.div>
      </div>

      {/* ABOUT SECTION */}
      <Frame id="about" className="min-h-[80vh] p-8 md:p-12 lg:p-16">
        <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-semibold mb-12 tracking-tight">About</motion.h2>
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 h-full flex-1">
          <motion.div variants={itemVariants} className="w-full md:w-1/2 flex items-center justify-center border-2 border-black/10 rounded-2xl bg-black/[0.03] min-h-[300px] relative overflow-hidden pt-8 group">
            {/* UPDATED: Added subtle scale on hover for the portrait */}
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              src={zeeshanImage}
              alt="Md Zeeshan Portrait"
              className="w-[80%] h-full object-contain object-bottom drop-shadow-xl"
            />
          </motion.div>
          <motion.div variants={itemVariants} className="w-full md:w-1/2 flex flex-col justify-center text-lg md:text-2xl text-black/80 font-medium leading-relaxed">
            <div className="space-y-6">
              <p>
                I'm Zeeshan — a designer, developer, and content creator based in Kolkata. I study Information Technology at Jadavpur University while building digital experiences that sit at the intersection of systematic thinking and visual craft.
              </p>
              <p className="text-black/60">
                Outside client work, I mentor JEE aspirants across India through my YouTube channel — translating complex problems into clear, structured thinking. The same approach I bring to every design.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t-2 border-black/10 flex flex-row justify-between">
              <motion.div whileHover={{ y: -5 }} className="flex flex-col cursor-default">
                <span className="text-3xl font-bold tracking-tight text-black">9,591</span>
                <span className="text-sm text-black/50 font-medium uppercase tracking-widest">JEE Advanced AIR</span>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} className="flex flex-col cursor-default">
                <span className="text-3xl font-bold tracking-tight text-black">2023 –</span>
                <span className="text-sm text-black/50 font-medium uppercase tracking-widest">Jadavpur University</span>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} className="flex flex-col cursor-default">
                <span className="text-3xl font-bold tracking-tight text-black">Since 2022</span>
                <span className="text-sm text-black/50 font-medium uppercase tracking-widest">Content Creation</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Frame>

      {/* SKILLS SECTION */}
      <Frame id="skills" className="min-h-[70vh] p-8 md:p-12 lg:p-16">
        <motion.div variants={itemVariants} className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">Skills</h2>
          <span className="text-black/40 font-medium text-lg">— 20 skills</span>
        </motion.div>
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((cat) => (
            <motion.div
              key={cat.category}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.01 }}
              className="group bg-black/[0.03] rounded-2xl border-2 border-black/10 p-8 hover:border-black transition-all duration-500"
            >
              <p className="text-sm font-medium uppercase tracking-widest text-black/50 mb-6">{cat.category}</p>
              <div className="flex flex-col">
                {cat.skills.map((skill, i) => (
                  <div key={skill} className={`text-lg md:text-xl font-semibold text-black py-3 ${i < cat.skills.length - 1 ? 'border-b border-black/10' : ''}`}>
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Frame>

      {/* EDUCATION SECTION */}
      <Frame id="education" className="p-8 md:p-12 lg:p-16">
        <motion.div variants={itemVariants} className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">Education</h2>
          <span className="text-black/40 font-medium text-lg">— 5 entries</span>
        </motion.div>
        <div className="flex flex-col">
          {education.map((entry, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className={`flex flex-col sm:flex-row sm:justify-between sm:items-center py-8 gap-4 ${i < education.length - 1 ? 'border-b border-black/10' : ''} hover:bg-black/[0.02] transition-colors duration-500 rounded-2xl px-4 -mx-4`}
            >
              <div>
                <h3 className="text-xl md:text-2xl font-semibold">{entry.name}</h3>
                <p className="text-black/60 font-medium text-lg mt-1">{entry.detail}</p>
              </div>
              <div className="flex flex-col sm:items-end gap-3">
                <span className="text-black/50 font-medium">{entry.period}</span>
                {entry.status === 'Ongoing' && <GlassStatusBadge variant="ongoing" />}
                {entry.status === 'Cleared' && <GlassStatusBadge variant="cleared" />}
                {entry.status === 'Completed' && <GlassStatusBadge variant="completed" />}
              </div>
            </motion.div>
          ))}
        </div>
      </Frame>

      {/* ACHIEVEMENTS SECTION */}
      <Frame id="achievements" className="p-8 md:p-12 lg:p-16">
        <motion.div variants={itemVariants} className="flex justify-between items-start mb-12">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">Achievements</h2>
          {/* Flipkart GRiD cleared badge — dominant call-out */}
          <div className="flex flex-col items-end gap-2">
            <GlassStatusBadge variant="cleared" />
            <span className="text-xs font-semibold uppercase tracking-widest text-black/50">
              Flipkart GRiD 8.0 — 2026
            </span>
            <span className="text-sm font-medium text-black/40">Round 1 Screening — Cleared</span>
          </div>
        </motion.div>
        <div className="flex flex-col">
          {achievements.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className={`py-6 ${i < achievements.length - 1 ? 'border-b border-black/10' : ''} hover:bg-black/[0.02] transition-colors duration-500 rounded-2xl px-4 -mx-4`}
            >
              <p className="text-lg md:text-xl font-semibold text-black">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </Frame>

      {/* EXPERIENCE SECTION */}
      <Frame id="experience" className="p-8 md:p-12 lg:p-16">
        <motion.div variants={itemVariants} className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">Experience</h2>
          <span className="text-black/40 font-medium text-lg">— 2 roles</span>
        </motion.div>
        <div className="flex flex-col">
          {experience.map((role, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className={`py-10 ${i < experience.length - 1 ? 'border-b border-black/10' : ''} hover:bg-black/[0.02] transition-colors duration-500 rounded-2xl px-4 -mx-4`}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl md:text-2xl font-semibold">{role.title}</h3>
                <GlassStatusBadge variant="ongoing" />
              </div>
              <div className="flex gap-4 text-black/50 font-medium mb-3">
                <span>{role.company}</span>
                <span>·</span>
                <span>{role.period}</span>
              </div>
              <p className="text-lg font-medium text-black/60 max-w-2xl">{role.description}</p>
            </motion.div>
          ))}
        </div>
      </Frame>

      {/* PROJECTS SECTION */}
      <Frame id="projects" className="min-h-[80vh] p-8 md:p-12 lg:p-16">
        <motion.div variants={itemVariants} className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">Selected Works</h2>
          <span className="text-black/60 font-medium text-lg md:text-xl">04 works</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {projectsData.map((project, idx) => {
            const innerContent = (
              <>
                <div className="aspect-[4/3] md:aspect-[3/2] bg-black/[0.03] rounded-2xl border-2 border-black/10 flex items-center justify-center mb-6 overflow-hidden relative transition-all duration-500 group-hover:bg-black/[0.05] group-hover:border-black/30">
                  <span className="text-black/40 font-medium border-2 border-dashed border-black/20 px-6 py-3 rounded-xl transition-all duration-500 group-hover:bg-black/5 group-hover:text-black/60 text-center transform group-hover:scale-110">
                    [ {project.title} Image here ]
                  </span>
                </div>
                <div className="flex justify-between items-start px-2">
                  <div className="pr-4 flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl md:text-2xl font-semibold">{project.title}</h3>
                      {'status' in project && <GlassStatusBadge variant={project.status as BadgeVariant} />}
                    </div>
                    <p className="text-black/50 font-medium mb-3">{project.subtitle}</p>
                    <p className="text-lg text-black/80 font-medium mb-4">{project.description}</p>
                    <p className="text-xs text-black/40 font-medium tracking-wider uppercase">{project.tag}</p>
                    {'githubLink' in project && project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 mt-3 text-xs font-semibold uppercase tracking-widest text-black/50 hover:text-black transition-colors duration-300"
                      >
                        GitHub <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <div className={`shrink-0 transition-opacity duration-500 ${!project.link ? 'opacity-0' : ''}`}>
                    <MotionButton label="See" />
                  </div>
                </div>
              </>
            );

            return project.link ? (
              <motion.a
                key={idx}
                href={project.link}
                target={project.link !== '#' ? "_blank" : undefined}
                rel={project.link !== '#' ? "noopener noreferrer" : undefined}
                className="group cursor-pointer block"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                {innerContent}
              </motion.a>
            ) : (
              <motion.div
                key={idx}
                className="group cursor-pointer block"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                {innerContent}
              </motion.div>
            );
          })}
        </div>
      </Frame>

      {/* SERVICES SECTION */}
      <Frame id="services" className="min-h-[70vh] p-8 md:p-12 lg:p-16">
        <motion.div variants={itemVariants} className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">Services</h2>
          <span className="text-black/40 font-medium text-lg">— 4 offerings</span>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.01 }}
              className="group cursor-pointer flex flex-col justify-between border-b-2 border-black/10 pb-10 hover:border-black transition-all duration-500 px-4 pt-4 -mx-4 rounded-2xl hover:bg-black/[0.02]"
            >
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-black/40 mb-4">{service.tags}</p>
                <h3 className="text-xl md:text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-lg font-medium text-black/60 leading-relaxed">{service.description}</p>
              </div>
              <div className="mt-8 flex justify-between items-center">
                <a
                  href={`mailto:mdzeeshan08886@gmail.com?subject=Enquiry: ${service.title}`}
                  className="text-sm font-semibold uppercase tracking-widest hover:opacity-60 transition-opacity"
                >
                  Enquire
                </a>
                <MotionButton label="See" />
              </div>
            </motion.div>
          ))}
        </div>
      </Frame>

      {/* CONTACT SECTION */}
      <Frame id="contact" className="min-h-[70vh] p-8 md:p-12 lg:p-16 flex flex-col justify-between">
        <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-semibold mb-auto tracking-tight">Contact</motion.h2>

        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-12 my-24">
          <motion.h3 variants={itemVariants} className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter leading-none">
            Got a project or an<br />idea worth building?
          </motion.h3>
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-6">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="mailto:mdzeeshan08886@gmail.com"
              className="inline-block text-xl md:text-3xl font-medium border-b-4 border-black pb-2 hover:text-black/60 hover:border-black/60 transition-all duration-300"
            >
              mdzeeshan08886@gmail.com
            </motion.a>
            <p className="text-black/40 text-lg font-medium">+91 9088260058</p>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="mt-auto flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t-2 border-black/10">
          <p className="text-black/50 font-medium">© 2025 Md Zeeshan.</p>
          <div className="flex gap-8 text-lg md:text-xl">
            <motion.a whileHover={{ scale: 1.1, y: -2 }} href="https://www.linkedin.com/in/tipz-gaming-1431262a5/" className="font-semibold text-black hover:opacity-60 transition-all duration-300">LinkedIn</motion.a>
            <motion.a whileHover={{ scale: 1.1, y: -2 }} href="https://www.youtube.com/channel/UCkiJbacU_72kjE6z_w4aPAA" className="font-semibold text-black hover:opacity-60 transition-all duration-300">YouTube</motion.a>
          </div>
        </motion.div>
      </Frame>

    </div>
  );
}
