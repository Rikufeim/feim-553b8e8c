import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import backgroundFeim from '@/assets/background-feim.png';
import svcVerkkosivut1 from '@/assets/service-verkkosivut-1.webp';
import svcVerkkosivut2 from '@/assets/service-verkkosivut-2.webp';
import svcVerkkosivut3 from '@/assets/service-verkkosivut-3.webp';
import svcWebapp1 from '@/assets/service-webapp-1.webp';
import svcWebapp2 from '@/assets/service-webapp-2.webp';
import svcWebapp3 from '@/assets/service-webapp-3.webp';
import svcProto1 from '@/assets/service-proto-1.webp';
import svcProto2 from '@/assets/service-proto-2.webp';
import svcProto3 from '@/assets/service-proto-3.webp';

const FadeIn = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay, ease: "easeOut" }} className={className}>
    {children}
  </motion.div>
);

const services = [
  {
    num: "01",
    title: "Verkkosivut",
    desc: "Modernit, liiketoimintaa tukevat verkkosivut — suunniteltu brändin arvon viestimiseen ja kävijöiden muuttamiseen asiakkaiksi.",
    link: "/verkkosivut",
    images: [
      { src: svcVerkkosivut1, alt: "Yrityssivu mockup" },
      { src: svcVerkkosivut2, alt: "Digitaalinen kasvusivu" },
      { src: svcVerkkosivut3, alt: "Landing page mockup" },
    ],
  },
  {
    num: "02",
    title: "Web-sovellukset",
    desc: "Räätälöityjä web-sovelluksia: asiakasportaaleja, SaaS-palveluja, varausjärjestelmiä ja uusia digitaalisia tuotteita.",
    link: "/web-sovellukset",
    images: [
      { src: svcWebapp1, alt: "Analytics dashboard" },
      { src: svcWebapp2, alt: "Varausjärjestelmä" },
      { src: svcWebapp3, alt: "Tuotehallinta" },
    ],
  },
  {
    num: "03",
    title: "Prototyypit ja MVP:t",
    desc: "Ideasta ensimmäinen toimiva versio — klikattava prototyyppi tai MVP, jolla idean toimivuus voidaan todentaa ennen täyttä kehitystä.",
    link: "/prototyypit",
    images: [
      { src: svcProto1, alt: "User flow prototyyppi" },
      { src: svcProto2, alt: "Mobiiliprototyyppi" },
      { src: svcProto3, alt: "Design system" },
    ],
  },
];

const pillars = [
  {
    title: "Strategia ennen suunnittelua",
    desc: "Jokainen projekti alkaa liiketoimintatavoitteiden ymmärtämisestä. Emme suunnittele ennen kuin tiedämme miksi."
  },
  {
    title: "Nopeus ilman kompromisseja",
    desc: "Tekoälyavusteinen kehitysprosessimme tuottaa laadukkaan lopputuloksen viikkojen, ei kuukausien päässä."
  },
  {
    title: "Pitkäjänteinen kumppanuus",
    desc: "Digitaalinen maailma ei pysähdy julkaisuhetkeen. Olemme mukana pitkään."
  },
];

const AUTO_CYCLE_MS = 5000;

const Palvelut = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % services.length);
    }, AUTO_CYCLE_MS);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  const selectService = useCallback((i: number) => {
    setActiveIndex(i);
    resetTimer();
  }, [resetTimer]);

  const markImageLoaded = useCallback((src: string) => {
    setLoadedImages(prev => (prev[src] ? prev : { ...prev, [src]: true }));
  }, []);

  useEffect(() => {
    const nextIndex = (activeIndex + 1) % services.length;
    const preloadSources = [
      ...services[activeIndex].images.map((img) => img.src),
      ...services[nextIndex].images.map((img) => img.src),
    ];

    preloadSources.forEach((src) => {
      if (loadedImages[src]) return;
      const preloader = new Image();
      preloader.decoding = 'async';
      preloader.onload = () => markImageLoaded(src);
      preloader.src = src;
    });
  }, [activeIndex, loadedImages, markImageLoaded]);

  const active = services[activeIndex];

  return (
    <div className="bg-black min-h-screen font-sans antialiased selection:bg-white/30 selection:text-white">
      <Helmet>
        <title>Palvelut — FEIM Digital Studio</title>
        <meta name="description" content="FEIM suunnittelee ja rakentaa verkkosivuja, web-sovelluksia ja prototyyppejä. Moderneja digitaalisia ratkaisuja yrityksille ja idean omistajille." />
        <link rel="canonical" href="https://feim.fi/palvelut" />
        <meta property="og:title" content="Palvelut — FEIM Digital Studio" />
        <meta property="og:description" content="Verkkosivut, web-sovellukset ja digitaaliset tuotteet. Suunnittelusta toteutukseen." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://feim.fi/palvelut" />
      </Helmet>

      {/* ── Palvelulista — auto-cycling tabs ── */}
      <section id="palvelut-lista" className="relative pt-32 sm:pt-52 pb-16 sm:pb-32 overflow-hidden">
        {/* Background image as section backdrop */}
        <img src={backgroundFeim} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black pointer-events-none" />

        <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-16 relative z-10">

          {/* Navigation tabs */}
          <div className="relative flex gap-0 mb-14">
            <motion.div
              className="absolute bottom-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"
              animate={{
                left: `${(activeIndex / services.length) * 100}%`,
                width: `${100 / services.length}%`,
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/[0.06]" />

            {services.map((s, i) => (
              <button
                key={i}
                onClick={() => selectService(i)}
                className="relative flex-1 group py-5 text-left transition-colors duration-500"
              >
                <div className="flex items-baseline gap-4 px-1">
                  <span className={`text-sm font-mono transition-colors duration-500 ${
                    activeIndex === i ? "text-blue-400" : "text-neutral-700"
                  }`}>{s.num}</span>
                  <span className={`text-xl sm:text-xl font-semibold transition-colors duration-500 ${
                    activeIndex === i ? "text-white" : "text-neutral-600 group-hover:text-neutral-400"
                  }`}>{s.title}</span>
                </div>
                {activeIndex === i && (
                  <motion.span
                    key={`progress-${activeIndex}`}
                    className="absolute bottom-0 left-0 h-[1px] bg-blue-500/60"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: AUTO_CYCLE_MS / 1000, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Active service content */}
          <div className="relative overflow-hidden" style={{ minHeight: 340 }}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <Link to={active.link} className="group flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-16 mb-10">
                  <div className="flex items-start gap-6 flex-1">
                    <motion.h3
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className="text-3xl md:text-4xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 flex items-center gap-4 leading-tight"
                    >
                      {active.title}
                      <ArrowRight size={22} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-blue-400 shrink-0" />
                    </motion.h3>
                  </div>
                </Link>

                <div className="grid grid-cols-3 gap-4">
                  {active.images.map((img, j) => (
                    <motion.div
                      key={img.src}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.55,
                        delay: 0.15 + j * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="relative rounded-2xl overflow-hidden border border-white/[0.06] aspect-video bg-neutral-950 shadow-lg shadow-black/30"
                    >
                      {!loadedImages[img.src] && (
                        <div className="absolute inset-0 bg-neutral-900 animate-pulse" />
                      )}
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading={activeIndex === 0 ? "eager" : "lazy"}
                        decoding="async"
                        fetchPriority={activeIndex === 0 && j === 0 ? "high" : "auto"}
                        onLoad={() => markImageLoaded(img.src)}
                        className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.02] ${
                          loadedImages[img.src] ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black to-transparent pointer-events-none" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── Lähestymistapa ── */}
      <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse at 30% 50%, #0021ff12 0%, transparent 55%), #000" }} />
        <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-start">
            <FadeIn>
              <p className="text-sm font-medium text-blue-400/70 tracking-widest uppercase mb-4 sm:mb-6">Lähestymistapamme</p>
              <h2 className="text-3xl sm:text-3xl md:text-5xl font-bold text-white leading-[1.1] mb-6 sm:mb-8">
                kokonaisia digitaalisia ratkaisuja.
              </h2>
              <p className="text-neutral-400 text-lg leading-relaxed">
                FEIM ei ole mainostoimisto. Rakennamme kokonaisia digitaalisia tuotteita ja palveluja, jotka tukevat liiketoimintaa, ratkaisevat oikeita ongelmia ja skaalautuvat tarpeen mukaan.
              </p>
              <p className="text-neutral-500 text-lg leading-relaxed mt-5">
                Palvelumme eivät ole vain yrityksille. Autamme myös yksityishenkilöitä ja tiimejä, joilla on idea sovelluksesta tai digitaalisesta tuotteesta — ideasta rakennetaan nopeasti prototyyppi, testattava MVP tai valmis sovellus.
              </p>
            </FadeIn>
            <div className="space-y-10 lg:pt-16">
              {pillars.map((p, i) => (
                <FadeIn key={i} delay={i * 0.1 + 0.1}>
                  <div className="flex gap-6">
                    <div className="shrink-0 w-px bg-blue-500/30 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{p.title}</h3>
                      <p className="text-neutral-500 text-[15px] leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-20 sm:py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse at 50% 60%, #0021ff1e 0%, transparent 55%), #000" }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 relative z-10 text-center">
          <FadeIn>
            <p className="text-xs sm:text-sm font-medium text-blue-400/70 tracking-widest uppercase mb-4 sm:mb-6">Aloita tästä</p>
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6 leading-[1.08]">Tilaa maksuton vedos</h2>
            <p className="text-neutral-400 text-lg max-w-lg mx-auto mb-12 leading-relaxed">
              Kerro projektistasi ja saat konkreettisen ehdotuksen siitä, miten kannattaa lähteä liikkeelle.
            </p>
            <Link to="/tilaa-vedos" className="inline-flex items-center justify-center px-10 py-5 bg-white hover:bg-neutral-100 text-black font-bold text-lg sm:text-lg rounded-full transition-all duration-300 hover:scale-105">
              Tilaa maksuton vedos
            </Link>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Palvelut;
