import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, ChevronDown, Sparkles, ExternalLink, Paperclip } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Link } from 'react-router-dom';
import rikuImg from '@/assets/riku-miettinen.jpeg';
import feimLogo from '@/assets/feim-logo.png';
import rikuNightImg from '@/assets/riku-night.jpeg';
import salesApp1 from '@/assets/sales-app-1.png';
import salesApp2 from '@/assets/sales-app-2.png';
import svcVerkkosivutImg from '@/assets/service-verkkosivut-1.webp';
import svcWebappImg from '@/assets/service-webapp-1.webp';
import svcProtoImg from '@/assets/service-proto-1.webp';
import ContactCard from '@/components/ContactCard';
import Footer from '@/components/Footer';
import { useNavbarVisibility } from '@/components/NavbarVisibility';
import HeroBackground from '@/components/HeroBackground';
import { useTheme } from '@/components/ThemeContext';
import InteractiveNeuralVortex from '@/components/ui/interactive-neural-vortex-background';
import AnimatedBackgroundLines from '@/components/ui/animated-background-lines';

/* ─── Utility Components ─── */

const Beam = ({ style, hovered, delay }: { style: React.CSSProperties; hovered: boolean; delay: number }) => (
  <div style={{ ...style, width: '100%', height: '1px' }} className="absolute left-0 pointer-events-none overflow-hidden z-10">
    <div className="h-full w-[50%] bg-gradient-to-r from-transparent via-blue-500 to-transparent" style={{
      opacity: hovered ? 1 : 0.5,
      transform: 'translateX(-200%)',
      animation: `beam-move ${hovered ? 1 : 3}s linear infinite`,
      animationDelay: `${delay}s`
    }} />
  </div>
);

const Cover = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [beamPositions, setBeamPositions] = useState<number[]>([]);
  useEffect(() => {
    if (ref.current) {
      const height = ref.current.clientHeight ?? 0;
      const numberOfBeams = Math.floor(height / 10);
      const positions = Array.from({ length: numberOfBeams }, (_, i) => (i + 1) * (height / (numberOfBeams + 1)));
      setBeamPositions(positions);
    }
  }, []);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} ref={ref}
      className={`relative group/cover inline-block px-2 py-2 transition duration-200 rounded-sm ${className}`}>
      {hovered && (
        <div className="absolute inset-0 overflow-hidden w-full h-full pointer-events-none rounded-sm">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="absolute bg-white rounded-full w-0.5 h-0.5 animate-star-move" style={{
              top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 1 + 0.5}s`, animationDelay: `${Math.random() * 0.5}s`
            }} />
          ))}
        </div>
      )}
      {beamPositions.map((position, index) => <Beam key={index} hovered={hovered} style={{ top: `${position}px` }} delay={Math.random() * 2} />)}
      <span className={`inline-block text-white relative z-20 group-hover/cover:text-white transition duration-200 ${hovered ? 'font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-200 to-neutral-500 transform scale-90' : ''}`}>
        {children}
      </span>
    </div>
  );
};

const Spotlight = ({ className = "", fill = "white", fillOpacity = 0.15 }: { className?: string; fill?: string; fillOpacity?: number }) => {
  const gradientId = `spotlight-gradient-${fill.replace('#', '')}`;
  return (
    <svg className={`pointer-events-none absolute z-[1] top-0 left-0 ${className}`} width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', maxHeight: '100%' }}>
      <circle cx="0" cy="0" r="500" fill={`url(#${gradientId})`} fillOpacity={fillOpacity} />
      <defs>
        <radialGradient id={gradientId} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0 0) rotate(90) scale(500)">
          <stop stopColor={fill} stopOpacity="1" />
          <stop offset="1" stopColor={fill} stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};


const TypewriterTitle = ({ text, className = "" }: { text: string; className?: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) { setDisplayedText(text.slice(0, i + 1)); i++; } else clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, [text]);
  return <h2 className={`inline-block ${className}`}>{displayedText}<span className="animate-pulse text-blue-500 ml-1">_</span></h2>;
};

const SectionFade = () => (
  <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />
);

const FadeIn = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay, ease: "easeOut" }} className={className}>
    {children}
  </motion.div>
);

/* ─── Navigation ─── */

const Navigation = ({ onNavigate }: { onNavigate: (dest: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Etusivu', href: '/' },
    { name: 'Yhteystiedot', href: '/yhteystiedot' },
  ];

  const isHash = (href: string) => href.startsWith('#');

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 py-4 sm:py-6">
      <div className="flex items-center justify-between w-full max-w-7xl lg:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-16">
        <div onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="cursor-pointer">
          <img src={feimLogo} alt="FEIM" className="h-10 sm:h-16 w-auto drop-shadow-lg" />
        </div>
        <div className="hidden lg:flex items-center gap-1">
          <Link to="/" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200 px-4 py-2 rounded-full hover:bg-white/5">Etusivu</Link>
          <div className="relative group">
            <Link to="/verkkosivut" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200 px-4 py-2 rounded-full hover:bg-white/5 inline-flex items-center gap-1">
              Verkkosivut
            </Link>
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl p-2 min-w-[200px] shadow-xl">
                <Link to="/verkkosivut" className="block text-sm text-neutral-300 hover:text-white hover:bg-white/5 px-4 py-2.5 rounded-lg transition-colors">Verkkosivut</Link>
                <Link to="/web-sovellukset" className="block text-sm text-neutral-300 hover:text-white hover:bg-white/5 px-4 py-2.5 rounded-lg transition-colors">Web-sovellukset</Link>
                <Link to="/prototyypit" className="block text-sm text-neutral-300 hover:text-white hover:bg-white/5 px-4 py-2.5 rounded-lg transition-colors">Prototyypit</Link>
              </div>
            </div>
          </div>
          <Link to="/yhteystiedot#vedos" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200 px-4 py-2 rounded-full hover:bg-white/5">Yhteystiedot</Link>
          <Link to="/yhteystiedot#vedos" className="ml-4 text-sm font-semibold text-black bg-white hover:bg-neutral-200 px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105">
            Tilaa vedos
          </Link>
        </div>
        <button className="lg:hidden text-neutral-200 hover:text-white" onClick={() => setIsOpen(!isOpen)} aria-label="Navigaatiovalikko">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 left-0 right-0 mx-4 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col gap-1 shadow-xl lg:hidden z-50">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-neutral-300 hover:text-white font-medium py-3 px-4 hover:bg-white/5 rounded-xl transition-all">Etusivu</Link>
            <Link to="/verkkosivut" onClick={() => setIsOpen(false)} className="text-neutral-300 hover:text-white font-medium py-3 px-4 hover:bg-white/5 rounded-xl transition-all">Verkkosivut</Link>
            <Link to="/web-sovellukset" onClick={() => setIsOpen(false)} className="text-neutral-300 hover:text-white font-medium py-3 px-4 pl-8 hover:bg-white/5 rounded-xl transition-all text-sm">Web-sovellukset</Link>
            <Link to="/prototyypit" onClick={() => setIsOpen(false)} className="text-neutral-300 hover:text-white font-medium py-3 px-4 pl-8 hover:bg-white/5 rounded-xl transition-all text-sm">Prototyypit</Link>
            <Link to="/yhteystiedot#vedos" onClick={() => setIsOpen(false)} className="text-neutral-300 hover:text-white font-medium py-3 px-4 hover:bg-white/5 rounded-xl transition-all">Yhteystiedot</Link>
            <Link to="/yhteystiedot#vedos" onClick={() => setIsOpen(false)} className="mt-2 text-center text-black bg-white font-semibold py-3 px-4 rounded-xl">Tilaa vedos</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

/* ─── 1. Hero ─── */

const Hero = ({ onStartProject }: { onStartProject: () => void }) => {
  const { isDark } = useTheme();
  return (
  <HeroBackground className="!min-h-screen flex flex-col items-start justify-center antialiased">
    <div 
      className="absolute bottom-0 left-0 w-full h-64 z-10 pointer-events-none" 
      style={{ background: `linear-gradient(to top, ${isDark ? '#000000' : '#ffffff'}, ${isDark ? '#000000' : '#ffffff'}, transparent)` }}
    />

    <div className="px-4 sm:px-6 lg:px-16 max-w-7xl lg:max-w-[90rem] mx-auto relative z-20 w-full pt-24 sm:pt-32 md:pt-40">
      <FadeIn delay={0.1}>
         <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold pb-4 leading-[1.05] max-w-5xl ${isDark ? 'bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400' : 'text-neutral-900'}`}>
          Sivut, jotka <Cover>ajattelevat.</Cover>
        </h1>
      </FadeIn>
      <FadeIn delay={0.2}>
        <p className={`mt-6 sm:mt-8 text-lg sm:text-xl md:text-xl max-w-2xl leading-relaxed font-medium ${isDark ? 'text-neutral-400' : 'text-neutral-700'}`}>
          Suunnittelemme ja toteutamme verkkosivuja, web-sovelluksia ja prototyyppejä — modernilla vibe koodauksella.
        </p>
      </FadeIn>
      <FadeIn delay={0.3}>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-10">
          <Link to="/yhteystiedot#vedos" className="inline-flex items-center justify-center px-8 py-4 font-bold text-base sm:text-base rounded-full transition-all duration-300 hover:scale-105" style={{ backgroundColor: isDark ? '#ffffff' : '#171717', color: isDark ? '#000000' : '#ffffff' }}>
            Pyydä tarjous
          </Link>
          <Link to="/verkkosivut" className={`inline-flex items-center justify-center gap-2 px-8 py-4 border font-medium text-base sm:text-base rounded-full transition-all duration-300 ${isDark ? 'border-white/15 text-white hover:bg-white/5' : 'border-black/15 text-neutral-800 hover:bg-black/5'}`}>
            Tutustu palveluihin
          </Link>
        </div>
      </FadeIn>
    </div>
  </HeroBackground>
  );
};

/* ─── 2. Palvelut ─── */

const servicesData = [
  {
    id: "verkkosivut",
    label: "Verkkosivut",
    link: "/verkkosivut",
    panelBg: "#141414",
    tagline: "Myyvät sivut, jotka rakentavat brändiä",
    desc: "Rakennamme modernit verkkosivut, jotka eivät vain näytä hyvältä — ne tuottavat liidejä, viestivät brändin arvon ja muuttavat kävijät asiakkaiksi.",
    previewImage: svcVerkkosivutImg,
    previewAlt: "Verkkosivu-ui preview",
    cta: "Tutustu verkkosivupalveluun",
  },
  {
    id: "web-sovellukset",
    label: "Web-sovellukset",
    link: "/web-sovellukset",
    panelBg: "#242424",
    tagline: "Räätälöityjä digitaalisia tuotteita",
    desc: "Suunnittelemme ja rakennimme asiakasportaaleja, SaaS-palveluja, varausjärjestelmiä ja uusia digitaalisia tuotteita — ideasta valmiiksi tuotteeksi.",
    previewImage: svcWebappImg,
    previewAlt: "Web-sovellus-ui preview",
    cta: "Tutustu web-sovelluksiin",
  },
  {
    id: "prototyypit",
    label: "Prototyypit & MVP",
    link: "/prototyypit",
    panelBg: "#1a1a1a",
    tagline: "Ideasta testattavaksi tuotteeksi nopeasti",
    desc: "Validoimme ideasi nopeasti toimivalla prototyypillä tai MVP:llä — ennen kuin investoit täyteen tuotekehitykseen. Nopea tapa konkretisoida ja testata.",
    previewImage: svcProtoImg,
    previewAlt: "Prototyyppi-ui preview",
    cta: "Tutustu prototyyppeihin",
  },
];

const Services = () => {
  const [active, setActive] = useState(0);
  const s = servicesData[active];

  return (
    <section id="palvelut" className="relative -mt-6 sm:-mt-8 md:-mt-10 pb-16 sm:pb-24 md:pb-32 overflow-visible bg-black z-30">
      <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        {/* Mac-window card */}
        <FadeIn>
          <div className="relative">
            <motion.div
              key={`service-card-${active}`}
              initial={{ opacity: 0.72 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative rounded-2xl overflow-hidden border border-b-transparent border-white/[0.08] bg-[#1a1a1a] shadow-2xl"
            >
            {/* Title bar */}
            <div className="flex items-center gap-0 border-b border-white/[0.07] bg-[#232323]">
              {/* Traffic lights */}
              <div className="flex items-center gap-1.5 px-4 py-3.5 shrink-0">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="w-px h-6 bg-white/[0.08] mx-1 shrink-0" />
              {/* Tabs */}
              <div className="flex items-stretch overflow-x-auto scrollbar-none">
                {servicesData.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => setActive(i)}
                    className={`relative flex items-center gap-2 px-5 py-3.5 text-sm font-medium transition-colors duration-200 whitespace-nowrap border-r border-white/[0.07] ${
                      active === i
                        ? 'text-white bg-[#1a1a1a]'
                        : 'text-neutral-500 hover:text-neutral-300 bg-[#232323]'
                    }`}
                  >
                    {active === i ? (
                      <>
                        <motion.span
                          layoutId="service-tab-light-bar"
                          className="absolute top-0 left-2 right-2 h-[2px] rounded-b bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                          transition={{ type: "spring", stiffness: 380, damping: 34 }}
                        />
                      </>
                    ) : null}
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content area */}
            <div className="p-6 sm:p-8 md:p-10 pb-20 sm:pb-24 md:pb-28">
              <motion.div
                animate={{ backgroundColor: s.panelBg }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-white/[0.08] p-6 sm:p-8 md:p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 16, scale: 0.995 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.995 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start"
                  >
                    {/* Left */}
                    <div>
                      <p className="text-sm font-medium text-blue-400/70 tracking-widest uppercase mb-3">{s.label}</p>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{s.tagline}</h3>
                      <p className="text-neutral-400 text-base sm:text-base leading-relaxed mb-8">{s.desc}</p>
                      <Link
                        to={s.link}
                        className="inline-flex items-center gap-2 text-base font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/10 hover:border-white/20 px-7 py-3.5 rounded-full transition-all duration-200 group"
                      >
                        {s.cta}
                        <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                    {/* Right — section image preview */}
                    <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0f1117]">
                      <motion.img
                        key={s.previewImage}
                        src={s.previewImage}
                        alt={s.previewAlt}
                        className="relative z-10 w-full h-full aspect-[16/10] object-cover object-center scale-[1.04]"
                        initial={{ opacity: 0, scale: 1.03 }}
                        animate={{ opacity: 1, scale: 1.04 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-28 bg-gradient-to-t from-black/95 via-black/55 to-transparent z-20" />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 sm:h-24 bg-gradient-to-t from-black/90 via-black/45 to-transparent z-20" />

          </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

/* ─── 3. Landing paget ─── */

const LandingPagesSection = () => {
  const previewItems = [
    { title: "Myyvä hero", desc: "Selkeä arvolupaus ja vahva CTA heti ensisilmäyksellä.", image: svcVerkkosivutImg },
    { title: "Konversioblokit", desc: "Luottamus, referenssit ja tarjousosiot, jotka ohjaavat yhteydenottoon.", image: svcWebappImg },
    { title: "Nopea tuotanto", desc: "Rakennamme valmiin landing pagen nopeasti ilman laadusta tinkimistä.", image: svcProtoImg },
  ];

  return (
    <section id="landing-paget" className="relative pt-8 pb-16 sm:pt-12 sm:pb-24 md:pt-16 md:pb-28 overflow-hidden bg-black">
      <div className="absolute inset-0 pointer-events-none">
        <InteractiveNeuralVortex backgroundOnly className="opacity-60" />
        <div className="absolute inset-0 bg-black/62" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_18%,rgba(0,33,255,0.10),transparent_55%),radial-gradient(ellipse_at_80%_80%,rgba(0,33,255,0.08),transparent_58%)]" />
        <div className="absolute inset-x-0 top-0 h-24 sm:h-28 bg-gradient-to-b from-black via-black/85 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 sm:h-28 bg-gradient-to-t from-black via-black/85 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-10 sm:w-14 bg-gradient-to-r from-black/85 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-10 sm:w-14 bg-gradient-to-l from-black/85 to-transparent" />
      </div>
      <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <FadeIn>
          <p className="text-sm font-medium tracking-widest uppercase text-blue-400/70 mb-4">Landing paget</p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white max-w-4xl leading-tight">
            Erottuvat landing paget
            <br />
            <span className="text-blue-400">salaman nopeasti</span>
          </h2>
          <p className="mt-5 text-neutral-400 text-base sm:text-lg leading-relaxed max-w-3xl">
            Rakennamme laadukkaat landing paget minuuteissa. Vibe-koodaus prosessimme ansiosta sivut voidaan usein toimittaa ja julkaista jo muutamassa päivässä.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {previewItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 sm:p-5"
              >
                <p className="text-white font-semibold mb-2">{item.title}</p>
                <p className="text-sm text-neutral-400 mb-4">{item.desc}</p>
                <div className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-black/30">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-32 object-cover saturate-[0.92] brightness-[0.88]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/25" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/verkkosivut"
              className="inline-flex items-center justify-center border border-white/20 text-white font-semibold text-sm py-3.5 px-8 rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              Tutustu lisää
            </Link>
            <Link
              to="/tilaa-vedos"
              className="inline-flex items-center justify-center bg-white text-black font-bold text-sm py-3.5 px-8 rounded-xl hover:bg-neutral-200 transition-all duration-300"
            >
              Tilaa vedos
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const DinoGameSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const resizeTarget = canvas.parentElement ?? canvas;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const targetFrameMs = isTouchDevice ? 1000 / 30 : 1000 / 45;
    let isInView = true;
    let pageVisible = document.visibilityState !== 'hidden';
    let observer: IntersectionObserver | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let redrawFrameId = 0;

    type Obstacle = {
      x: number;
      y: number;
      w: number;
      h: number;
      kind: 'meteor' | 'debris' | 'drone';
      vx: number;
      vy: number;
      spin: number;
      spinV: number;
      passed: boolean;
    };
    type Cloud = {
      x: number;
      y: number;
      w: number;
      h: number;
      speed: number;
      alpha: number;
    };
    type Star = {
      x: number;
      y: number;
      r: number;
      phase: number;
    };
    type Coin = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      spin: number;
      collected: boolean;
    };

    const state = {
      width: 0,
      height: 0,
      dinoX: 0,
      dinoY: 0,
      dinoW: 56,
      dinoH: 56,
      targetX: 0,
      dinoVX: 0,
      obstacles: [] as Obstacle[],
      coins: [] as Coin[],
      clouds: [] as Cloud[],
      stars: [] as Star[],
      obstacleSpawnMs: 0,
      nextSpawnMs: 850,
      coinSpawnMs: 0,
      nextCoinSpawnMs: 2200,
      score: 0,
      altitudeKm: 0,
      scoreMultiplier: 1,
      multiplierMs: 0,
      hasStarted: false,
      gameOver: false,
      leftPressed: false,
      rightPressed: false,
      horizontalPadding: 8,
      inputStep: 9,
      spawnBaseMs: 760,
      spawnMinMs: 250,
      spawnAltitudeRate: 1.8,
      obstacleSizeScale: 1,
      obstacleSpeedScale: 1,
      collisionInsetScale: 1,
      lastTs: 0,
      rafId: 0,
    };
    const logoImg = new Image();
    let logoLoaded = false;

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const initClouds = () => {
      state.clouds = Array.from({ length: 8 }, () => ({
        x: rand(0, state.width),
        y: rand(18, Math.max(22, state.height * 0.85)),
        w: rand(42, 118),
        h: rand(10, 24),
        speed: rand(0.25, 1.15),
        alpha: rand(0.09, 0.22),
      }));
    };

    const initStars = () => {
      const starCount = isTouchDevice ? 35 : 80;
      state.stars = Array.from({ length: starCount }, () => ({
        x: rand(0, state.width),
        y: rand(8, state.height),
        r: rand(0.6, 1.9),
        phase: rand(0, Math.PI * 2),
      }));
    };

    const getObstacleRects = (obstacle: Obstacle) => [{ x: obstacle.x, y: obstacle.y, w: obstacle.w, h: obstacle.h }];

    const resetGame = () => {
      state.obstacles = [];
      state.coins = [];
      state.obstacleSpawnMs = 0;
      state.nextSpawnMs = 850;
      state.coinSpawnMs = 0;
      state.nextCoinSpawnMs = 2200;
      state.score = 0;
      state.altitudeKm = 61;
      state.scoreMultiplier = 1;
      state.multiplierMs = 0;
      state.gameOver = false;
      state.dinoX = state.width * 0.5 - state.dinoW / 2;
      state.targetX = state.dinoX;
      state.dinoY = state.height - state.dinoH - 20;
      state.dinoVX = 0;
      state.lastTs = 0;
      state.leftPressed = false;
      state.rightPressed = false;
    };

    const applyResponsiveTuning = () => {
      const isMobile = state.width < 640;
      const isNarrow = state.width < 390;
      const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

      state.horizontalPadding = isNarrow ? 6 : isMobile ? 8 : 10;
      state.inputStep = isMobile ? 7.2 : 9;
      state.spawnBaseMs = isMobile ? 920 : 760;
      state.spawnMinMs = isMobile ? 340 : 250;
      state.spawnAltitudeRate = isMobile ? 1.35 : 1.8;
      state.obstacleSizeScale = isNarrow ? 0.84 : isMobile ? 0.9 : 1;
      state.obstacleSpeedScale = isMobile ? 0.88 : 1;
      state.collisionInsetScale = coarsePointer ? 1.15 : 1;
      state.dinoW = isNarrow ? 48 : isMobile ? 52 : 56;
      state.dinoH = state.dinoW;
    };

    const resize = () => {
      const rawDpr = window.devicePixelRatio || 1;
      const dpr = isTouchDevice ? Math.min(rawDpr, 2) : rawDpr;
      const cssWidth = Math.max(320, canvas.clientWidth, resizeTarget.clientWidth);
      const cssHeight = Math.max(320, canvas.clientHeight, resizeTarget.clientHeight);

      canvas.width = Math.floor(cssWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      state.width = cssWidth;
      state.height = cssHeight;
      applyResponsiveTuning();

      if (!state.hasStarted) {
        state.dinoX = cssWidth * 0.5 - state.dinoW / 2;
        state.targetX = state.dinoX;
        state.dinoY = cssHeight - state.dinoH - 20;
      } else {
        state.dinoX = Math.min(Math.max(state.dinoX, state.horizontalPadding), cssWidth - state.dinoW - state.horizontalPadding);
        state.targetX = Math.min(Math.max(state.targetX, state.horizontalPadding), cssWidth - state.dinoW - state.horizontalPadding);
        state.dinoY = Math.min(Math.max(state.dinoY, 10), cssHeight - state.dinoH - 8);
      }
      if (state.clouds.length === 0) initClouds();
      if (state.stars.length === 0) initStars();
    };

    const draw = () => {
      ctx.clearRect(0, 0, state.width, state.height);
      const altNorm = Math.min(1, state.altitudeKm / 380);
      const ss = (t: number) => { const c = Math.max(0, Math.min(1, t)); return c * c * (3 - 2 * c); };
      const mix = (a: number, b: number, t: number) => a + (b - a) * t;
      const fade = (lo: number, hi: number) => ss((altNorm - lo) / (hi - lo));
      const now = performance.now();
      const twinkleTs = now * 0.0024;

      const P1 = 0.16, P2 = 0.30, P3 = 0.48, P4 = 0.60, P5 = 0.80;
      const waterT   = ss(Math.min(1, altNorm / P1));
      const surfaceT = altNorm > P1 ? ss(Math.min(1, (altNorm - P1) / (P2 - P1))) : 0;
      const skyT     = altNorm > P2 ? ss(Math.min(1, (altNorm - P2) / (P3 - P2))) : 0;
      const sunsetT  = altNorm > P3 ? ss(Math.min(1, (altNorm - P3) / (P4 - P3))) : 0;
      const nightT   = altNorm > P4 ? ss(Math.min(1, (altNorm - P4) / (P5 - P4))) : 0;
      const spaceT   = altNorm > P5 ? ss(Math.min(1, (altNorm - P5) / (1  - P5))) : 0;

      let tR: number, tG: number, tB: number;
      let mR: number, mG: number, mB: number;
      let bR: number, bG: number, bB: number;

      if (altNorm <= P1) {
        tR = 0; tG = 0; tB = 0;
        mR = 0; mG = 0; mB = 0;
        bR = 0; bG = 0; bB = 0;
      } else if (altNorm <= P2) {
        tR=mix(0,88,surfaceT); tG=mix(0,168,surfaceT); tB=mix(0,226,surfaceT);
        mR=mix(0,102,surfaceT); mG=mix(0,184,surfaceT); mB=mix(0,232,surfaceT);
        bR=mix(0,62,surfaceT); bG=mix(0,138,surfaceT); bB=mix(0,80,surfaceT);
      } else if (altNorm <= P3) {
        tR=mix(88,78,skyT); tG=mix(168,105,skyT); tB=mix(226,165,skyT);
        mR=mix(102,88,skyT); mG=mix(184,135,skyT); mB=mix(232,185,skyT);
        bR=mix(62,52,skyT); bG=mix(138,95,skyT); bB=mix(80,155,skyT);
      } else if (altNorm <= P4) {
        const warm = Math.sin(sunsetT * Math.PI);
        tR=mix(78,18,sunsetT)+warm*25; tG=mix(105,10,sunsetT)+warm*8; tB=mix(165,42,sunsetT)-warm*40;
        mR=mix(88,30,sunsetT)+warm*65; mG=mix(135,18,sunsetT)+warm*30; mB=mix(185,35,sunsetT)-warm*55;
        bR=mix(52,14,sunsetT)+warm*45; bG=mix(95,10,sunsetT)+warm*18; bB=mix(155,32,sunsetT)-warm*45;
      } else if (altNorm <= P5) {
        tR=mix(18,4,nightT); tG=mix(10,4,nightT); tB=mix(42,22,nightT);
        mR=mix(30,4,nightT); mG=mix(18,4,nightT); mB=mix(35,20,nightT);
        bR=mix(14,3,nightT); bG=mix(10,3,nightT); bB=mix(32,16,nightT);
      } else {
        tR=mix(4,0,spaceT); tG=mix(4,0,spaceT); tB=mix(22,0,spaceT);
        mR=mix(4,0,spaceT); mG=mix(4,0,spaceT); mB=mix(20,0,spaceT);
        bR=mix(3,0,spaceT); bG=mix(3,0,spaceT); bB=mix(16,0,spaceT);
      }

      const bgGrad = ctx.createLinearGradient(0, 0, 0, state.height);
      bgGrad.addColorStop(0, `rgb(${Math.round(Math.max(0,tR))},${Math.round(Math.max(0,tG))},${Math.round(Math.max(0,tB))})`);
      bgGrad.addColorStop(0.5, `rgb(${Math.round(Math.max(0,mR))},${Math.round(Math.max(0,mG))},${Math.round(Math.max(0,mB))})`);
      bgGrad.addColorStop(1, `rgb(${Math.round(Math.max(0,bR))},${Math.round(Math.max(0,bG))},${Math.round(Math.max(0,bB))})`);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, state.width, state.height);

      const sunsetGlow = fade(0.46, 0.52) * (1 - fade(0.58, 0.66));
      if (sunsetGlow > 0.01) {
        const glowGrad = ctx.createLinearGradient(0, state.height * 0.4, 0, state.height);
        glowGrad.addColorStop(0, 'rgba(200,80,30,0)');
        glowGrad.addColorStop(0.4, `rgba(200,90,35,${sunsetGlow * 0.12})`);
        glowGrad.addColorStop(0.7, `rgba(180,60,25,${sunsetGlow * 0.08})`);
        glowGrad.addColorStop(1, 'rgba(120,30,15,0)');
        ctx.fillStyle = glowGrad;
        ctx.fillRect(0, state.height * 0.4, state.width, state.height * 0.6);
      }

      const groundVis = fade(0.20, 0.30) * (1 - fade(0.38, 0.50));
      if (groundVis > 0.01) {
        const gH = 40 * groundVis;
        ctx.fillStyle = `rgba(28,78,22,${groundVis * 0.55})`;
        ctx.beginPath();
        ctx.moveTo(0, state.height);
        for (let x = 0; x <= state.width; x += 10) {
          ctx.lineTo(x, state.height - gH + Math.sin(x * 0.008 + 2.5) * 6 + Math.sin(x * 0.02) * 2);
        }
        ctx.lineTo(state.width, state.height);
        ctx.closePath();
        ctx.fill();
      }

      const planktonVis = 1 - fade(0.18, 0.28);
      if (planktonVis > 0.01) {
        for (let i = 0; i < Math.min(25, state.stars.length); i++) {
          const s = state.stars[i];
          const dx = Math.sin(twinkleTs * 0.4 + s.phase * 3) * 2;
          const dy = Math.cos(twinkleTs * 0.28 + s.phase * 2) * 1.5;
          ctx.fillStyle = `rgba(150,200,220,${(0.12 + 0.08 * Math.sin(twinkleTs * 0.7 + s.phase)) * planktonVis})`;
          ctx.fillRect(s.x + dx - 0.6, s.y + dy - 0.6, 1.6, 1.6);
        }
      }

      const bubbleVis = 1 - fade(0.16, 0.28);
      if (bubbleVis > 0.01) {
        state.stars.forEach((star) => {
          const wobble = Math.sin(twinkleTs * 1.2 + star.phase) * 3;
          const alpha = (0.08 + 0.16 * Math.sin(twinkleTs * 0.9 + star.phase)) * bubbleVis;
          if (alpha <= 0.005) return;
          ctx.strokeStyle = `rgba(100,210,255,${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.arc(star.x + wobble, star.y, star.r * 2.4, 0, Math.PI * 2);
          ctx.stroke();
        });
      }

      const starVis = fade(0.54, 0.68);
      if (starVis > 0.01) {
        const bright = 0.1 + starVis * 0.9;
        state.stars.forEach((star) => {
          const tw = 0.45 + 0.55 * Math.sin(twinkleTs + star.phase);
          const alpha = bright * (0.08 + tw * 0.72) * starVis;
          if (alpha <= 0.005) return;
          ctx.fillStyle = `rgba(224,230,242,${alpha})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      const moonVis = fade(0.58, 0.66) * (1 - fade(0.88, 0.96));
      if (moonVis > 0.01) {
        const mx = state.width * 0.78;
        const my = state.height * 0.18;
        const mr = 18;
        ctx.fillStyle = `rgba(230,225,200,${moonVis * 0.7})`;
        ctx.beginPath();
        ctx.arc(mx, my, mr, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(255,250,235,${moonVis * 0.25})`;
        ctx.beginPath();
        ctx.arc(mx, my, mr * 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(210,205,180,${moonVis * 0.4})`;
        ctx.beginPath();
        ctx.arc(mx - 4, my - 3, mr * 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(mx + 5, my + 5, mr * 0.18, 0, Math.PI * 2);
        ctx.fill();
      }

      const fluffyVis = fade(0.26, 0.36) * (1 - fade(0.48, 0.58));
      if (fluffyVis > 0.01) {
        state.clouds.forEach((cloud) => {
          const a = Math.min(0.36, cloud.alpha * 2.5 * fluffyVis);
          if (a <= 0.006) return;
          ctx.fillStyle = `rgba(245,248,255,${a})`;
          ctx.beginPath();
          ctx.ellipse(cloud.x + cloud.w * 0.5, cloud.y + cloud.h * 0.5, cloud.w * 0.52, cloud.h * 0.56, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(240,244,255,${a * 0.78})`;
          ctx.beginPath();
          ctx.ellipse(cloud.x + cloud.w * 0.22, cloud.y - cloud.h * 0.06, cloud.w * 0.3, cloud.h * 0.4, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.ellipse(cloud.x + cloud.w * 0.74, cloud.y + cloud.h * 0.1, cloud.w * 0.27, cloud.h * 0.38, 0, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      const sunsetCloudVis = fade(0.44, 0.52) * (1 - fade(0.62, 0.72));
      if (sunsetCloudVis > 0.01) {
        state.clouds.forEach((cloud) => {
          const a = cloud.alpha * sunsetCloudVis * 1.4;
          if (a <= 0.006) return;
          const warmth = fade(0.48, 0.56);
          const r = Math.round(mix(180, 120, warmth));
          const g = Math.round(mix(140, 60, warmth));
          const b = Math.round(mix(160, 80, warmth));
          ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(0.22, a)})`;
          ctx.fillRect(cloud.x, cloud.y, cloud.w * 1.6, cloud.h * 0.32);
          ctx.fillRect(cloud.x + cloud.w * 0.15, cloud.y - cloud.h * 0.12, cloud.w, cloud.h * 0.24);
        });
      }

      if (logoLoaded) {
        const centerX = state.dinoX + state.dinoW / 2;
        const centerY = state.dinoY + state.dinoH / 2;
        const tilt = Math.max(-0.26, Math.min(0.26, state.dinoVX / 12));
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(tilt);
        ctx.scale(1.02, 1.02);
        ctx.drawImage(logoImg, -state.dinoW / 2, -state.dinoH / 2, state.dinoW, state.dinoH);
        ctx.restore();
      } else {
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(state.dinoX, state.dinoY, state.dinoW, state.dinoH);
      }

      state.obstacles.forEach((obstacle) => {
        const rects = getObstacleRects(obstacle);
        rects.forEach((rect) => {
          ctx.fillStyle = obstacle.kind === 'meteor' ? '#f97316' : obstacle.kind === 'drone' ? '#e2e8f0' : '#cbd5e1';
          ctx.save();
          ctx.translate(rect.x + rect.w / 2, rect.y + rect.h / 2);
          ctx.rotate(obstacle.spin);
          ctx.fillRect(-rect.w / 2, -rect.h / 2, rect.w, rect.h);
          ctx.restore();
          ctx.fillStyle = 'rgba(59,130,246,0.45)';
          ctx.fillRect(rect.x, rect.y, rect.w, Math.max(2, rect.h * 0.08));
        });
      });

      state.coins.forEach((coin) => {
        if (coin.collected) return;
        const pulse = 0.86 + Math.sin(coin.spin) * 0.12;
        ctx.save();
        ctx.translate(coin.x, coin.y);
        ctx.rotate(coin.spin * 0.35);
        ctx.scale(pulse, 1);
        ctx.fillStyle = '#facc15';
        ctx.beginPath();
        ctx.arc(0, 0, coin.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fde68a';
        ctx.beginPath();
        ctx.arc(-coin.r * 0.2, -coin.r * 0.2, coin.r * 0.45, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(161,98,7,0.55)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();
      });

      ctx.font = '600 16px Inter, system-ui, sans-serif';
      const meters = Math.max(0, Math.round((state.altitudeKm - 61) * 1000));
      ctx.fillStyle = '#93c5fd';
      ctx.fillText(`Pisteet: ${Math.floor(state.score)}`, 16, 26);
      ctx.fillText(`Metrit: ${meters} m`, 16, 48);

      if (state.gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.55)';
        ctx.fillRect(0, 0, state.width, state.height);
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffffff';
        ctx.font = '700 30px Inter, system-ui, sans-serif';
        ctx.fillText('Peli ohi', state.width / 2, state.height / 2 - 18);
        ctx.font = '500 16px Inter, system-ui, sans-serif';
        ctx.fillStyle = '#bfdbfe';
        ctx.fillText('Paina välilyöntiä tai klikkaa aloittaaksesi uudelleen', state.width / 2, state.height / 2 + 16);
        ctx.restore();
      }

      if (!state.hasStarted && !state.gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.45)';
        ctx.fillRect(0, 0, state.width, state.height);
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffffff';
        ctx.font = '700 30px Inter, system-ui, sans-serif';
        ctx.fillText('Hanki feimiä', state.width / 2, state.height / 2 - 26);
        ctx.font = '500 16px Inter, system-ui, sans-serif';
        ctx.fillStyle = '#bfdbfe';
        const controlsText = state.width < 640 ? 'Liiku: sormi tai pyyhkaisy' : 'Liiku: nuolinappaimet / A-D / hiiri';
        ctx.fillText(controlsText, state.width / 2, state.height / 2 + 8);
        ctx.fillText('Nouse avaruuteen!', state.width / 2, state.height / 2 + 30);
        ctx.restore();
      }
    };

    const scheduleRedraw = () => {
      if (redrawFrameId) {
        window.cancelAnimationFrame(redrawFrameId);
      }
      redrawFrameId = window.requestAnimationFrame(() => {
        redrawFrameId = 0;
        resize();
        draw();
      });
    };

    logoImg.src = feimLogo;
    logoImg.onload = () => {
      logoLoaded = true;
      scheduleRedraw();
    };

    const requestStart = () => {
      if (state.gameOver) {
        resetGame();
        state.hasStarted = true;
        startLoop();
        return;
      }
      if (!state.hasStarted) {
        state.hasStarted = true;
        state.lastTs = 0;
        startLoop();
        return;
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        requestStart();
        return;
      }
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        e.preventDefault();
        state.leftPressed = true;
        return;
      }
      if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        e.preventDefault();
        state.rightPressed = true;
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        state.leftPressed = false;
        return;
      }
      if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        state.rightPressed = false;
      }
    };

    const updateTargetXFromPointer = (clientX: number) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width) return;
      const relativeX = clientX - rect.left;
      const minCenter = state.dinoW / 2 + state.horizontalPadding;
      const maxCenter = rect.width - state.dinoW / 2 - state.horizontalPadding;
      const clampedCenter = Math.min(Math.max(relativeX, minCenter), maxCenter);
      state.targetX = clampedCenter - state.dinoW / 2;
    };

    const onPointerDown = (e: PointerEvent) => {
      e.preventDefault();
      requestStart();
      updateTargetXFromPointer(e.clientX);
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {
        // Ignore unsupported pointer capture environments.
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      e.preventDefault();
      updateTargetXFromPointer(e.clientX);
    };

    const onPointerUp = (e: PointerEvent) => {
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {}
    };

    const intersects = (ax: number, ay: number, aw: number, ah: number, bx: number, by: number, bw: number, bh: number) => {
      return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
    };
    const circleIntersectsRect = (
      cx: number,
      cy: number,
      cr: number,
      rx: number,
      ry: number,
      rw: number,
      rh: number
    ) => {
      const nearestX = Math.max(rx, Math.min(cx, rx + rw));
      const nearestY = Math.max(ry, Math.min(cy, ry + rh));
      const dx = cx - nearestX;
      const dy = cy - nearestY;
      return dx * dx + dy * dy <= cr * cr;
    };

    const loop = (ts: number) => {
      const shouldAnimate = state.hasStarted && !state.gameOver && isInView && pageVisible;
      if (!shouldAnimate) {
        if (state.rafId) {
          window.cancelAnimationFrame(state.rafId);
          state.rafId = 0;
        }
        draw();
        return;
      }
      if (!state.lastTs) state.lastTs = ts;
      const rawDt = ts - state.lastTs;
      if (rawDt < targetFrameMs) {
        state.rafId = window.requestAnimationFrame(loop);
        return;
      }
      const dt = Math.min(50, rawDt);
      state.lastTs = ts;
      const factor = Math.min(2.5, Math.max(0.6, dt / 16.67));

      if (state.hasStarted && !state.gameOver) {
        const ascentProgress = Math.min(1, state.altitudeKm / 120);
        if (state.multiplierMs > 0) {
          state.multiplierMs = Math.max(0, state.multiplierMs - dt);
          if (state.multiplierMs <= 0) {
            state.scoreMultiplier = 1;
          }
        }
        const targetY = (state.height - state.dinoH - 20) + (state.height * 0.2 - (state.height - state.dinoH - 20)) * ascentProgress;
        state.dinoY += (targetY - state.dinoY) * 0.08 * factor;

        const keyDirection = (state.rightPressed ? 1 : 0) - (state.leftPressed ? 1 : 0);
        if (keyDirection !== 0) {
          state.targetX += keyDirection * state.inputStep * factor;
        }
        state.targetX = Math.min(Math.max(state.targetX, state.horizontalPadding), state.width - state.dinoW - state.horizontalPadding);
        const prevX = state.dinoX;
        state.dinoX += (state.targetX - state.dinoX) * 0.24 * factor;
        state.dinoX = Math.min(Math.max(state.dinoX, state.horizontalPadding), state.width - state.dinoW - state.horizontalPadding);
        state.dinoVX = state.dinoX - prevX;

        state.obstacleSpawnMs += dt;
        if (state.obstacleSpawnMs >= state.nextSpawnMs) {
          const roll = Math.random();
          const kind: Obstacle['kind'] = roll < 0.46 ? 'meteor' : roll < 0.8 ? 'debris' : 'drone';
          const hBase = kind === 'drone' ? rand(24, 36) : kind === 'meteor' ? rand(28, 44) : rand(20, 34);
          const wBase = kind === 'drone' ? rand(34, 54) : kind === 'meteor' ? rand(22, 36) : rand(18, 28);
          const h = hBase * state.obstacleSizeScale;
          const w = wBase * state.obstacleSizeScale;
          state.obstacles.push({
            x: rand(state.horizontalPadding, Math.max(state.horizontalPadding, state.width - w - state.horizontalPadding)),
            y: -h - rand(12, 90),
            w,
            h,
            kind,
            vx: rand(-0.9, 0.9) * state.obstacleSpeedScale,
            vy: (rand(3.2, 5.4) + ascentProgress * 2.4) * state.obstacleSpeedScale,
            spin: rand(0, Math.PI * 2),
            spinV: rand(-0.05, 0.05),
            passed: false,
          });
          state.obstacleSpawnMs = 0;
          state.nextSpawnMs = Math.max(state.spawnMinMs, state.spawnBaseMs - state.altitudeKm * state.spawnAltitudeRate) + rand(120, 420);
        }

        state.coinSpawnMs += dt;
        if (state.coinSpawnMs >= state.nextCoinSpawnMs) {
          const r = rand(8, 12);
          state.coins.push({
            x: rand(state.horizontalPadding + r, Math.max(state.horizontalPadding + r, state.width - state.horizontalPadding - r)),
            y: -r - rand(20, 120),
            r,
            vx: rand(-0.45, 0.45) * state.obstacleSpeedScale,
            vy: (rand(2.3, 3.8) + ascentProgress * 1.7) * state.obstacleSpeedScale,
            spin: rand(0, Math.PI * 2),
            collected: false,
          });
          state.coinSpawnMs = 0;
          state.nextCoinSpawnMs = Math.max(1300, 2400 - state.altitudeKm * 5.5) + rand(140, 520);
        }

        state.altitudeKm += dt * 0.006;
        state.score += dt * 0.03 * state.scoreMultiplier;
        state.clouds.forEach((cloud) => {
          cloud.y += cloud.speed * factor * (0.7 + ascentProgress * 2.2);
          cloud.x += Math.sin((state.altitudeKm + cloud.y) * 0.01) * 0.08 * factor;
          if (cloud.y > state.height + 30) {
            cloud.y = -cloud.h - rand(8, 70);
            cloud.x = rand(0, Math.max(0, state.width - cloud.w));
            cloud.w = rand(42, 118);
            cloud.h = rand(10, 24);
            cloud.speed = rand(0.25, 1.15);
            cloud.alpha = rand(0.09, 0.22);
          }
        });

        state.stars.forEach((star) => {
          star.y += (0.2 + ascentProgress * 2.6 + star.r * 0.18) * factor;
          if (star.y > state.height + 3) {
            star.y = -rand(2, 36);
            star.x = rand(0, state.width);
          }
        });

        state.obstacles.forEach((obstacle) => {
          obstacle.y += obstacle.vy * factor;
          obstacle.x += obstacle.vx * factor;
          obstacle.spin += obstacle.spinV * factor;
        });
        state.obstacles = state.obstacles.filter((obstacle) => obstacle.y < state.height + 40);

        state.coins.forEach((coin) => {
          if (coin.collected) return;
          coin.y += coin.vy * factor;
          coin.x += coin.vx * factor;
          coin.spin += 0.12 * factor;
        });
        state.coins = state.coins.filter((coin) => !coin.collected && coin.y < state.height + coin.r + 20);

        const dinoHitInsetX = Math.max(8, state.dinoW * 0.18 * state.collisionInsetScale);
        const dinoHitInsetY = Math.max(6, state.dinoH * 0.14 * state.collisionInsetScale);
        const dinoHitX = state.dinoX + dinoHitInsetX;
        const dinoHitY = state.dinoY + dinoHitInsetY;
        const dinoHitW = state.dinoW - dinoHitInsetX * 2;
        const dinoHitH = state.dinoH - dinoHitInsetY * 2;
        for (const obstacle of state.obstacles) {
          if (!obstacle.passed && obstacle.y > state.dinoY + state.dinoH) {
            obstacle.passed = true;
            state.score += 10 * state.scoreMultiplier;
          }
          const rects = getObstacleRects(obstacle);
          const hasCollision = rects.some((rect) => intersects(dinoHitX, dinoHitY, dinoHitW, dinoHitH, rect.x, rect.y, rect.w, rect.h));
          if (hasCollision) {
            state.gameOver = true;
            break;
          }
        }

        for (const coin of state.coins) {
          if (coin.collected) continue;
          const hitCoin = circleIntersectsRect(coin.x, coin.y, coin.r, dinoHitX, dinoHitY, dinoHitW, dinoHitH);
          if (hitCoin) {
            coin.collected = true;
            state.scoreMultiplier = 100;
            state.multiplierMs = 5000;
            state.score += 20;
          }
        }
      }

      draw();
      state.rafId = window.requestAnimationFrame(loop);
    };

    const startLoop = () => {
      const shouldAnimate = state.hasStarted && !state.gameOver && isInView && pageVisible;
      if (!shouldAnimate || state.rafId) return;
      state.lastTs = 0;
      state.rafId = window.requestAnimationFrame(loop);
    };

    const stopLoop = () => {
      if (!state.rafId) return;
      window.cancelAnimationFrame(state.rafId);
      state.rafId = 0;
    };

    const onVisibilityChange = () => {
      pageVisible = document.visibilityState !== 'hidden';
      if (pageVisible) startLoop();
      else stopLoop();
      scheduleRedraw();
    };

    resize();
    resetGame();
    draw();
    scheduleRedraw();

    window.addEventListener('resize', scheduleRedraw);
    window.addEventListener('keydown', onKeyDown, { passive: false });
    window.addEventListener('keyup', onKeyUp);
    canvas.addEventListener('pointerdown', onPointerDown, { passive: false });
    canvas.addEventListener('pointermove', onPointerMove, { passive: false });
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointerenter', onPointerMove);
    document.addEventListener('visibilitychange', onVisibilityChange);

    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(() => {
        scheduleRedraw();
      });
      resizeObserver.observe(resizeTarget);
    }

    if (sectionRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          isInView = !!entries[0]?.isIntersecting;
          if (isInView) startLoop();
          else stopLoop();
          scheduleRedraw();
        },
        { threshold: 0.08 }
      );
      observer.observe(sectionRef.current);
    }

    return () => {
      stopLoop();
      if (redrawFrameId) {
        window.cancelAnimationFrame(redrawFrameId);
      }
      logoImg.onload = null;
      window.removeEventListener('resize', scheduleRedraw);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointerenter', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      resizeObserver?.disconnect();
      observer?.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} id="dino-peli" className="relative bg-background py-4 sm:py-8 md:py-10">
      <div className="h-[50vh] max-h-[520px] min-h-[300px] w-full sm:h-[320px] md:h-[360px]">
        <canvas ref={canvasRef} className="block h-full w-full border-b border-white/10 bg-background" style={{ touchAction: 'none' }} />
      </div>
    </section>
  );
};

/* ─── 4. Miksi FEIM ─── */

const whyData = [
  { title: "Verkkosivut, jotka myyvät", desc: "Rakennamme verkkosivuja, jotka eivät vain näytä hyvältä — ne tuottavat liidejä, rakentavat brändiä ja tukevat liiketoimintaa." },
  { title: "Web-sovellukset liiketoiminnan ytimeen", desc: "Kehitämme räätälöityjä web-sovelluksia, jotka automatisoivat prosesseja, palvelevat asiakkaita ja skaalautuvat kasvun mukana." },
  { title: "Prototyypit nopeasti käyntiin", desc: "Validoimme ideasi nopeasti toimivalla prototyypillä — ennen kuin investoit täyteen tuotekehitykseen." },
  { title: "Vibe-koodaus uudella tavalla", desc: "Hyödynnämme tekoälyä ja moderneja työkaluja, jotta saat laadukkaan lopputuloksen nopeammin ja kustannustehokkaammin." },
  { title: "Strategia ennen suunnittelua", desc: "Jokainen projekti alkaa liiketoimintatavoitteiden ymmärtämisestä. Emme ala suunnitella ennen kuin tiedämme miksi." },
  { title: "Pitkäjänteinen kumppanuus", desc: "Digitaalinen maailma ei pysähdy. Tarjoamme jatkuvaa kehitystä, jotta ratkaisunne pysyy kilpailukykyisenä." },
];

const WhyFeim = () => (
  <section id="miksi-feim" className="relative py-16 sm:py-24 md:py-32 overflow-hidden bg-black">
    <div className="absolute inset-0 z-0 pointer-events-none" style={{ contain: 'strict' }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(21,34,70,0.22),rgba(2,4,10,0.86)_58%,#000_100%)]" />
      <div
        className="absolute -top-[18%] -left-[8%] h-[680px] w-[680px] rounded-full opacity-[0.08]"
        style={{ background: 'radial-gradient(circle, #3b82f6 0%, rgba(59,130,246,0) 68%)' }}
      />
      <div
        className="absolute bottom-[-22%] right-[-10%] h-[760px] w-[760px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #6366f1 0%, rgba(99,102,241,0) 70%)' }}
      />
      <div
        className="absolute right-[18%] top-[26%] h-[420px] w-[420px] rounded-full opacity-[0.045]"
        style={{ background: 'radial-gradient(circle, #22d3ee 0%, rgba(34,211,238,0) 72%)' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:3px_3px] opacity-[0.07]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/25 to-black/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-black/35" />
    </div>
    <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20">
        <div>
          <FadeIn>
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
              Rakennamme
              <br />
              <span className="text-blue-400">digitaalista etua.</span>
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed max-w-lg">
              Verkkosivuja, web-sovelluksia ja prototyyppejä — modernilla vibe-koodauksella, joka yhdistää tekoälyn ja inhimillisen osaamisen.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link to="/yhteystiedot#vedos" className="inline-flex items-center gap-2 mt-10 text-white font-medium text-base border border-white/15 px-7 py-3.5 rounded-full hover:bg-white/5 transition-all group">
              Keskustellaan projektistanne <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>
        <FadeIn delay={0.15}>
          <div className="flex flex-col gap-5">
            {/* Kuvat */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                <img src={salesApp1} alt="FEIM Sales -sovellus näkymä 1" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                <img src={salesApp2} alt="FEIM Sales -sovellus näkymä 2" className="w-full h-full object-cover" />
              </div>
            </div>
            {/* Linkki */}
            <a
              href="https://feimsales.lovable.app/landing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              <div className="flex-1">
                <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Case study</p>
                <p className="text-white font-semibold text-sm leading-snug">Tutustu meidän rakentamaan myyntisovellukseen →</p>
              </div>
              <ExternalLink size={18} className="text-neutral-400 group-hover:text-white transition-colors shrink-0" />
            </a>
          </div>
        </FadeIn>
      </div>
    </div>
  </section>
);

/* ─── 4. Prosessi ─── */

const processSteps = [
  { num: "01", title: "Kartoitus & strategia", desc: "Aloitamme ymmärtämällä liiketoimintanne, kohderyhmänne ja tavoitteenne. Määrittelemme yhdessä projektin suunnan, laajuuden ja mittarit — niin, että jokaisella päätöksellä on selkeä peruste." },
  { num: "02", title: "Konsepti & suunnittelu", desc: "Luomme sivuston rakenteen, käyttäjäpolut ja visuaalisen identiteetin. Suunnittelu etenee iteratiivisesti tiiviissä yhteistyössä, jotta lopputulos vastaa täsmälleen visiotanne." },
  { num: "03", title: "Design & kehitys", desc: "Toteutamme sivuston modernilla teknologialla, pixel-perfect designillä ja optimoidulla suorituskyvyllä. Jokainen yksityiskohta viimeistellään — fonteista animaatioihin." },
  { num: "04", title: "Testaus & julkaisu", desc: "Testaamme sivuston kaikilla laitteilla, optimoimme latausnopeuden ja varmistamme hakukonenäkyvyyden. Julkaisu tapahtuu hallitusti ja sujuvasti." },
  { num: "05", title: "Jatkuva kehitys", desc: "Julkaisun jälkeen sivustonne ei jää yksin. Tarjoamme jatkuvaa kehitystä, analytiikkaseurantaa ja optimointia — digitaalinen läsnäolonne kasvaa kanssamme." },
];

const Process = () => (
  <section id="prosessi" className="relative py-16 sm:py-24 md:py-32 ov content-autoerflow-hidden">
    <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
      <FadeIn>
        <p className="text-xs sm:text-sm font-medium text-blue-400/70 tracking-widest uppercase mb-3 sm:mb-4">Prosessi</p>
        <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6">Ideasta valmiiksi<br />— viidessä vaiheessa.</h2>
        <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mb-12 sm:mb-20">
          Selkeä prosessi varmistaa, että projekti etenee aikataulussa, budjetissa ja ilman yllätyksiä.
        </p>
      </FadeIn>
      <div className="space-y-0">
        {processSteps.map((step, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <div className="group flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-12 py-6 sm:py-10 border-t border-white/[0.06] hover:border-white/[0.12] transition-colors">
              <span className="text-4xl sm:text-4xl md:text-5xl font-black text-white/10 group-hover:text-blue-500/30 transition-colors shrink-0 w-16 sm:w-20">{step.num}</span>
              <div className="max-w-2xl">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-neutral-400 text-base leading-relaxed">{step.desc}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

/* ─── 5. Referenssit / Showcase ─── */

const showcaseItems = [
  { title: "E-commerce Platform", category: "Verkkokauppa • UI/UX • Kehitys", desc: "Kokonaisvaltainen verkkokauppakokemus, joka yhdistää viimeistellyn visuaalisen ilmeen ja sujuvan ostopolun. Tulos: +180% konversioaste.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop" },
  { title: "SaaS Dashboard", category: "Web-sovellus • Design System", desc: "Datavetoinen hallintapaneeli, jossa monimutkaiset toiminnot yksinkertaistettiin selkeiksi käyttäjäpoluiksi ja modulaariseksi design-systeemiksi.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop" },
  { title: "Brand Experience", category: "Brändi • Verkkosivut • Animaatio", desc: "Premium-brändin digitaalinen identiteetti, joka yhdistää elokuvamaisen tarinankerronnan, hienovaraiset animaatiot ja teknisen viimeistelyn.", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop" },
];

const Showcase = () => (
  <section id="referenssit" className="relative py-16 sm:py-24 md:py-32 overflow-hidden content-auto">
    <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
      <FadeIn>
        <p className="text-xs sm:text-sm font-medium text-blue-400/70 tracking-widest uppercase mb-3 sm:mb-4">Työnäytteet</p>
        <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6">Valikoituja projekteja</h2>
        <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mb-12 sm:mb-20">
          Jokainen projekti on uniikki kokonaisuus, joka on suunniteltu asiakkaan liiketoimintatavoitteiden pohjalta.
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {showcaseItems.map((item, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div className="group relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500">
              <div className="relative h-64 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-90" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>
              <div className="p-8">
                <p className="text-xs font-medium text-blue-400/60 tracking-wider uppercase mb-3">{item.category}</p>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

/* ─── 7. Tekoäly ─── */

const AISection = () => (
  <section id="tekoaly" className="relative py-16 sm:py-24 md:py-32 overflow-hidden content-auto">
    <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center">
        <FadeIn>
          <p className="text-xs sm:text-sm font-medium text-blue-400/70 tracking-widest uppercase mb-3 sm:mb-4">Tekoäly</p>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6 leading-[1.08]">
            Tekoäly on<br />työkalu, ei trendi.
          </h2>
          <p className="text-neutral-400 text-lg leading-relaxed mb-6">
            Hyödynnämme tekoälyä jokaisessa projektissa — suunnittelussa, kehityksessä ja sisällöntuotannossa. Lopputulos on nopeampi, laadukkaampi ja kustannustehokkaampi.
          </p>
          <p className="text-neutral-500 text-[15px] leading-relaxed">
            Vibe-koodaus tarkoittaa meillä sitä, että tekoäly tekee raskaan työn ja ihminen ohjaa laadun. Ei kompromisseja — vain fiksumpaa tekemistä.
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="space-y-6">
            {[
              { label: "Nopeampi toteutus", desc: "Projektit valmistuvat viikkojen sijaan päivissä tekoälyavusteisen kehityksen ansiosta." },
              { label: "Pienempi hinta, sama laatu", desc: "Automaatio vähentää manuaalista työtä — säästö siirtyy suoraan sinulle." },
              { label: "Älykäs suunnittelu", desc: "Tekoäly analysoi parhaat käytännöt ja auttaa rakentamaan optimoidun käyttökokemuksen." },
            ].map((item, i) => (
              <div key={i} className="flex gap-5 items-start">
                <div className="shrink-0 w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mt-0.5">
                  <Sparkles size={16} className="text-blue-400/70" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{item.label}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  </section>
);

/* ─── Founder ─── */

const FounderSection = () => {
  const { isDark } = useTheme();
  
  // Keep founder section visually aligned with the rest of the page in both themes.
  const sectionBg = isDark 
    ? 'bg-black'
    : 'bg-[#0b1220]';
  const sectionRounding = '';
  
  // In light mode, force dark text styles to match dark bg
  const labelColor = isDark ? 'text-blue-400/70' : 'text-blue-300/70';
  const headingColor = isDark ? 'text-white' : 'text-white';
  const gradientText = isDark ? 'from-blue-400 to-blue-500' : 'from-blue-300 to-blue-400';
  const nameColor = isDark ? 'text-white' : 'text-white';
  const bodyColor = isDark ? 'text-neutral-400' : 'text-neutral-300';
  const quoteColor = isDark ? 'text-white' : 'text-white';
  const quoteBorder = isDark ? 'border-blue-500/30' : 'border-blue-400/30';
  const strongColor = isDark ? 'text-white' : 'text-white';
  const closingColor = isDark ? 'text-neutral-500' : 'text-neutral-400';

  return (
  <section className={`relative py-16 sm:py-24 md:py-32 overflow-hidden ${sectionBg} ${sectionRounding}`}>
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-[#10192c]/78 via-[#0c1424]/72 to-[#0b1220]/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_14%_20%,rgba(64,120,255,0.10),transparent_60%),radial-gradient(ellipse_at_82%_86%,rgba(34,82,190,0.08),transparent_64%),radial-gradient(ellipse_at_50%_100%,rgba(10,24,64,0.16),transparent_72%)]" />
      <div className="absolute top-0 inset-x-0 h-24 sm:h-28 bg-gradient-to-b from-black via-black/70 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-24 sm:h-28 bg-gradient-to-t from-black via-black/70 to-transparent" />
    </div>
    <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-16 relative z-10">

      {/* Header */}
      <FadeIn>
        <p className={`text-sm font-medium tracking-widest uppercase mb-6 ${labelColor}`}>Founder’s Note</p>
        <h2 className={`text-2xl sm:text-4xl md:text-5xl font-serif font-semibold tracking-[0.01em] leading-[1.08] mb-10 sm:mb-16 max-w-4xl ${headingColor}`}>
          <span className="block">
            Tulevaisuudessa rakennetaan{" "}
            <span className="text-blue-400">tekoälyllä.</span>
          </span>
        </h2>
      </FadeIn>

      <div className="max-w-3xl">
        <div className="space-y-10">
          <FadeIn delay={0.15}>
            <p className={`text-lg md:text-xl leading-relaxed ${bodyColor}`}>
              Perustin FEIMin, koska näin maailman, jossa luovuus ja teknologia eivät ole toisistaan erillisiä. Kaikki lähtee halusta toteuttaa ideoita ja viedä ne valmiiksi — ilman hitaita ja kalliita projekteja.
            </p>
          </FadeIn>

          <FadeIn delay={0.25}>
            <p className={`text-lg md:text-xl leading-relaxed ${bodyColor}`}>
              Hyödynnämme modernia AI-kehitystä ja vibe-koodaamista, joiden avulla ideat voidaan rakentaa ja testata murto-osassa perinteisestä kehitysajasta.
            </p>
          </FadeIn>

          <FadeIn delay={0.35}>
            <p className={`text-lg md:text-xl leading-relaxed ${bodyColor}`}>
              Me varmistamme, että projekti ja visio toteutuu.
            </p>
          </FadeIn>

          <FadeIn delay={0.45}>
            <p className={`text-2xl md:text-3xl font-semibold leading-snug italic ${quoteColor}`}>
              "Tekoäly ei korvaa luovuutta
              <br />
              se moninkertaistaa sen."
            </p>
          </FadeIn>

          <FadeIn delay={0.55}>
            <div className="mt-2 flex items-center gap-5">
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden shrink-0">
                <img src={rikuNightImg} alt="Riku Miettinen" className="w-full h-full object-cover object-[center_18%]" />
              </div>
              <div>
                <p className={`font-semibold text-xl ${nameColor}`}>Riku Miettinen</p>
                <p className={`text-sm ${bodyColor}`}>Founder, FEIM</p>
                <a
                  href="https://wa.me/358413282218"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black px-3 py-1.5 text-xs font-medium text-white transition hover:border-white/35 hover:bg-neutral-900"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Ota yhteyttä WhatsAppissa
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  </section>
  );
};

/* ─── 8. FAQ ─── */

const faqData = [
  { q: "Mitä verkkosivuprojekti maksaa?", a: "Jokainen projekti hinnoitellaan kiinteään hintaan projektin laajuuden perusteella. Landing page -sivujen hinnat alkavat muutamasta sadasta eurosta, ja laajemmat yrityssivustot räätälöidään tarpeen mukaan. Emme käytä tuntilaskutusta — tiedät aina etukäteen, mitä maksat." },
  { q: "Kuinka kauan projekti kestää?", a: "Tyypillinen verkkosivuprojekti valmistuu 2–6 viikossa riippuen laajuudesta. Landing page -sivut voivat valmistua viikossa, laajemmat kokonaisuudet 4–8 viikossa. Prosessimme on suunniteltu nopeaksi ilman laatukompromisseja." },
  { q: "Mitä alustaa käytätte?", a: "Käytämme useita moderneja vibe-koodaus- ja tekoälytyökaluja riippuen projektin luonteesta. Pääasiallisina alustoina meillä on Lovable, Antigravity/Cursor sekä Beymflow. Näiden yhdistelmällä pystymme toimittamaan laadukkaita ratkaisuja nopeammin kuin perinteisellä kehityksellä." },
  { q: "Mitä palveluun sisältyy?", a: "Kaikki projektit sisältävät strategisen kartoituksen, UI/UX-suunnittelun, responsiivisen toteutuksen, SEO-perusoptimoinnin, suorituskykyoptimoinnin ja julkaisun. Jatkuva kehitys ja lisäpalvelut sovitaan erikseen." },
  { q: "Tehdäänkö myös hakukoneoptimointia?", a: "Kyllä. Jokainen sivusto rakennetaan hakukoneystävälliselle pohjalle: semanttinen HTML, optimoidut latausajat, meta-tiedot ja rakenteinen data ovat osa perustoimitusta. Laajempi SEO-strategia sovitaan erikseen." },
  { q: "Voiko sivustoa kehittää julkaisun jälkeen?", a: "Ehdottomasti. Digitaalinen maailma muuttuu jatkuvasti, ja sivustonne tulisi muuttua sen mukana. Tarjoamme jatkuvan kehityksen palvelua, jossa päivitämme, optimoimme ja laajennamme sivustoanne kuukausittain." },
  { q: "Toteutetaanko sivut mobiili edellä?", a: "Kyllä. Jokainen sivusto suunnitellaan ja toteutetaan responsiivisesti kaikille laitteille. Mobiilikokemus on meille yhtä tärkeä kuin työpöytäversio — usein jopa tärkeämpi." },
  { q: "Miten verkkosivusto tukee myyntiä?", a: "Rakennamme sivustot konversiokeskeisesti: selkeät toimintakehotukset, optimoidut käyttäjäpolut ja luottamusta herättävä design ohjaavat kävijöitä kohti yhteydenottoa tai ostopäätöstä." },
];

const FAQ = () => (
  <section id="ukk" className="relative py-16 sm:py-24 md:py-32 overflow-hidden content-auto">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
      <FadeIn>
        <p className="text-xs sm:text-sm font-medium text-blue-400/70 tracking-widest uppercase mb-3 sm:mb-4">Usein kysyttyä</p>
        <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white mb-10 sm:mb-16">Vastauksia yleisimpiin kysymyksiin</h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <Accordion type="single" collapsible className="space-y-2">
          {faqData.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-white/[0.06] hover:border-white/[0.12] transition-colors rounded-xl px-2">
               <AccordionTrigger className="text-white text-left text-lg sm:text-lg font-medium py-6 hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-neutral-400 leading-relaxed pb-6 text-base sm:text-[15px]">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </FadeIn>
    </div>
  </section>
);

/* ─── 9. Tilaa maksuton vedos ─── */

const serviceOptions = [
  {
    id: 'verkkosivut',
    title: 'Verkkosivut',
    desc: 'Myyvät, modernit ja liiketoimintaa tukevat sivut.',
    detail: 'Sopii yrityksille, jotka haluavat vahvemman digitaalisen ensivaikutelman ja enemmän yhteydenottoja.',
  },
  {
    id: 'web-sovellus',
    title: 'Web-sovellus',
    desc: 'Käyttöliittymä- ja tuoteajattelua yhdistävä kokonaisuus.',
    detail: 'Sopii palveluille, asiakasportaaleille, SaaS-ideoille ja digitaalisille työkaluille.',
  },
  {
    id: 'prototyyppi',
    title: 'Prototyyppi',
    desc: 'Nopea tapa konkretisoida idea ennen täyttä toteutusta.',
    detail: 'Sopii MVP-ajatteluun, konsepteihin, pitchaukseen ja tuotekehityksen alkuvaiheeseen.',
  },
];

const Contact = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <section id="yhteystiedot" className="relative py-16 sm:py-24 md:py-40 overflow-hidden content-auto">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070d]/96 via-[#04060c]/94 to-[#03050a]/98" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_14%_20%,rgba(0,26,102,0.32),transparent_58%),radial-gradient(ellipse_at_82%_86%,rgba(0,26,102,0.24),transparent_62%),radial-gradient(ellipse_at_50%_100%,rgba(0,26,102,0.18),transparent_72%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/68 via-black/34 to-black/72" />
        <div className="absolute top-0 inset-x-0 h-24 sm:h-28 bg-gradient-to-b from-black via-black/90 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-24 sm:h-28 bg-gradient-to-t from-black via-black/90 to-transparent" />
      </div>
      <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-16 relative z-10">

        {/* ── Header ── */}
        <FadeIn delay={0.05}>
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-white leading-[1.08] mb-4 sm:mb-6">
              Tilaa maksuton{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500">vedos</span>
              {' '}digitaalisesta ratkaisustasi
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
              Suunnittelemme ja luonnostelemme kokonaisia digitaalisia ratkaisuja — verkkosivuista web-sovelluksiin ja prototyyppeihin. Kerro, mitä tarvitset, ja me näytämme mitä se voisi olla.
            </p>
          </div>
        </FadeIn>

        {/* ── Full-width form ── */}
        <FadeIn delay={0.15}>
          <div className="border border-white/[0.06] bg-white/[0.02] rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 backdrop-blur-sm">
            <form className="space-y-8" onSubmit={e => e.preventDefault()}>
              {/* Row 1: 4 columns on desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-400 ml-1">Yritys</label>
                  <input type="text" placeholder="Yrityksen nimi" required
                    className="w-full border border-white/[0.08] bg-white/[0.03] rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500/40 transition-colors text-[15px] text-white placeholder-neutral-600" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-400 ml-1">Nimi</label>
                  <input type="text" placeholder="Etunimi Sukunimi" required
                    className="w-full border border-white/[0.08] bg-white/[0.03] rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500/40 transition-colors text-[15px] text-white placeholder-neutral-600" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-400 ml-1">Sähköpostiosoite</label>
                  <input type="email" placeholder="nimi@yritys.fi" required
                    className="w-full border border-white/[0.08] bg-white/[0.03] rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500/40 transition-colors text-[15px] text-white placeholder-neutral-600" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-400 ml-1">Puhelinnumero</label>
                  <input type="tel" placeholder="+358 40 123 4567"
                    className="w-full border border-white/[0.08] bg-white/[0.03] rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500/40 transition-colors text-[15px] text-white placeholder-neutral-600" />
                </div>
              </div>

              {/* Service selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-neutral-400 ml-1">Mitä haluat tilata?</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                   {serviceOptions.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedService(s.id)}
                      className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 border ${
                        selectedService === s.id
                          ? 'bg-blue-500/15 border-blue-500/30 text-blue-300'
                          : 'bg-white/[0.02] border-white/[0.08] text-neutral-400 hover:text-white hover:border-white/[0.15]'
                      }`}
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description + attachment */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-400 ml-1">Kerro projektistasi</label>
                  <textarea
                    rows={4}
                    placeholder="Kerro lyhyesti, mitä haluaisit rakentaa ja mitä tavoitteita projektillasi on."
                    onInput={(e) => {
                      const target = e.currentTarget;
                      target.style.height = "auto";
                      target.style.height = `${target.scrollHeight}px`;
                    }}
                    className="w-full border border-white/[0.08] bg-white/[0.03] rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500/40 transition-colors resize-none overflow-hidden text-[15px] text-white placeholder-neutral-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-400 ml-1">Liitetiedosto <span className="text-neutral-600">(valinnainen)</span></label>
                  <label className="block border-2 border-dashed border-white/[0.12] rounded-xl px-5 py-6 sm:py-8 text-center transition-colors cursor-pointer hover:bg-white/[0.02]">
                    <input type="file" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" className="hidden" />
                    <Paperclip size={22} className="mx-auto mb-2 text-neutral-400" />
                    <p className="text-sm font-medium text-white">Valitse tiedosto</p>
                    <p className="text-xs mt-1 text-neutral-400">PDF, DOC, PNG, JPG</p>
                  </label>
                </div>
              </div>

              <div className="flex items-start gap-3 mt-2 border-l-2 border-blue-400/30 pl-4">
                <p className="text-xs leading-relaxed text-neutral-400">
                  Tämä lomake kerää yhteystietosi, jotta voimme olla sinuun yhteydessä. Tutustu <a href="#" className="font-semibold underline text-white">tietosuojaselosteeseen</a> saadaksesi lisätietoja siitä, miten käsittelemme ja suojaamme tietojasi.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto font-bold text-base py-4 px-12 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] mt-2 group inline-flex items-center justify-center gap-2 bg-white text-black"
                >
                  Lähetä viesti
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </FadeIn>

      </div>
    </section>
  );
};




/* ─── Project Wizard (preserved) ─── */

const ProjectWizard = ({ onBack, onComplete }: { onBack: () => void; onComplete: () => void }) => {
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState({ type: null as string | null, subType: null as string | null });

  const handleTypeSelect = (type: string) => {
    setSelection(prev => ({ ...prev, type, subType: null }));
    setStep(type === 'web' ? 2 : 3);
  };

  const handleSubTypeSelect = (subType: string) => {
    setSelection(prev => ({ ...prev, subType }));
    setStep(3);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-black">
      <Spotlight fill="white" />
      <Navigation onNavigate={() => { onBack(); }} />
      <div className="flex-grow flex flex-col justify-center relative z-10 px-6 lg:px-16 pt-32 pb-12">
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-4">
              <TypewriterTitle text="Mitä rakennetaan?" className="text-3xl md:text-5xl font-bold text-white" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { type: 'web', icon: '🌐', title: 'Nettisivut', desc: '' },
                { type: 'app', icon: '📱', title: 'Web-sovellus', desc: '' },
                { type: 'custom', icon: '⚡', title: 'Prototyypit', desc: 'Nopea MVP tai konsepti' },
              ].map(item => (
                <button key={item.type} onClick={() => handleTypeSelect(item.type)}
                  className="group bg-white/[0.02] p-8 rounded-2xl border border-white/[0.06] hover:border-white/[0.15] text-left transition-all">
                  <span className="text-3xl mb-4 block">{item.icon}</span>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  {item.desc && <p className="text-neutral-500 text-sm mt-1">{item.desc}</p>}
                </button>
              ))}
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center space-y-4">
              <TypewriterTitle text="Millainen sivu?" className="text-3xl md:text-5xl font-bold text-white" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { sub: 'landing', title: 'Landing Page', desc: 'Yhden sivun myyvä kokonaisuus.' },
                { sub: 'multipage', title: 'Multipage', desc: 'Laaja sivusto usealla alasivulla.' },
                { sub: 'growth', title: 'Growth Package', desc: 'Sivut + SEO + analytiikka kasvuun.' },
              ].map(item => (
                <button key={item.sub} onClick={() => handleSubTypeSelect(item.sub)}
                  className="group bg-white/[0.02] p-8 rounded-2xl border border-white/[0.06] hover:border-white/[0.15] text-left transition-all">
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-neutral-500 text-sm">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 w-full max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <TypewriterTitle text="Yhteystiedot" className="text-3xl md:text-5xl font-bold text-white" />
              <p className="text-neutral-400 mt-4">Jätä yhteystietosi, niin palaamme asiaan 24 tunnin sisällä.</p>
            </div>
            <form onSubmit={e => { e.preventDefault(); onComplete(); }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-400 ml-1">Nimi</label>
                  <input required type="text" placeholder="Matti Meikäläinen" className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/40 transition-colors placeholder-neutral-600" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-400 ml-1">Sähköposti</label>
                  <input required type="email" placeholder="matti@yritys.fi" className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/40 transition-colors placeholder-neutral-600" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400 ml-1">Viesti</label>
                <textarea rows={4} placeholder="Kerro lyhyesti projektistasi..." className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500/40 transition-colors resize-none placeholder-neutral-600" />
              </div>
              <button type="submit" className="w-full bg-white text-black font-bold text-lg py-4 rounded-xl hover:bg-neutral-200 transition-all hover:scale-[1.01] active:scale-[0.99]">
                Lähetä viesti
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Main Index ─── */

const Index = () => {
  const [view, setView] = useState('home');
  const { setHidden } = useNavbarVisibility();

  useEffect(() => {
    setHidden(view === 'project');
    return () => setHidden(false);
  }, [view, setHidden]);

  const handleStartProject = () => { setView('project'); window.scrollTo(0, 0); };
  const handleNavigateHome = () => { setView('home'); window.scrollTo(0, 0); };

  return (
    <div className="bg-black min-h-screen font-sans antialiased selection:bg-white/30 selection:text-white relative">
      {view === 'project' ? (
        <ProjectWizard onBack={handleNavigateHome} onComplete={handleNavigateHome} />
      ) : (
        <main className="relative">
          {/* Unified page background accents */}
          
          <Hero onStartProject={handleStartProject} />
          <Services />
          <LandingPagesSection />
          <DinoGameSection />
          <WhyFeim />
          
          <FounderSection />
          <AnimatedBackgroundLines
            title="Valmiina rakentamaan tulevaisuutta?"
            ctaLabel="Tilaa vedos"
            ctaHref="/tilaa-vedos"
          />
          <FAQ />
          <Contact />
          <Footer />
        </main>
      )}
    </div>
  );
};

export default Index;
