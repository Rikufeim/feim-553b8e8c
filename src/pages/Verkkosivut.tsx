import ServicePageLayout from '@/components/ServicePageLayout';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/components/ThemeContext';
import serviceVerkkosivut1 from '@/assets/service-verkkosivut-1.png';
import heroVerkkosivut from '@/assets/hero-verkkosivut.webp';
import hinnastoBgCustom from '@/assets/hinnasto-bg-custom.png';
import serviceVerkkosivut2 from '@/assets/service-verkkosivut-2.png';
import serviceVerkkosivut3 from '@/assets/service-verkkosivut-3.png';
import refLujainfra from '@/assets/ref-lujainfra.png';
import refSodergard from '@/assets/ref-sodergard.png';
import referenssi1 from '@/assets/referenssi-1.jpeg';

const FadeIn = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay, ease: "easeOut" }} className={className}>
    {children}
  </motion.div>
);

const pricingPlans = [
  {
    name: "Yksinkertainen käyntikortti",
    subtitle: "Landing page / 1 sivu",
    price: "499",
    features: [
      "1-sivuinen landing page",
      "Moderni ja selkeä ulkoasu",
      "Yrityksen ja palveluiden esittely",
      "Yhteystiedot",
      "Mobiiliystävällinen toteutus",
    ],
    description: "Selkeä ja laadukas verkkokäyntikortti yritykselle, joka haluaa ammattimaisen ensivaikutelman verkossa.",
    footer: "Sopii yrityksille, jotka haluavat yksinkertaisen mutta toimivan verkkoratkaisun.",
  },
  {
    name: "Moderni käyntikortti",
    subtitle: "2–3 sivua",
    price: "999",
    features: [
      "2–3 sivua",
      "Räätälöidyt komponentit ja visuaalinen toteutus",
      "Fontit ja animaatiot",
      "Tarjous- / yhteydenottolomake",
      "Sähköposti-integraatio",
      "Responsiivinen toteutus",
    ],
    description: "Moderni ja myyvä nettisivu, joka erottuu edukseen ja tukee myyntiä.",
    footer: "Erinomainen valinta yrityksille, jotka haluavat modernin ja uskottavan nettisivun.",
  },
  {
    name: "Multipage",
    subtitle: "4–7 sivua",
    price: "1500",
    highlighted: true,
    features: [
      "4–7 sivua",
      "Täysin räätälöidyt UI-komponentit ja animaatiot",
      "Visuaalinen toteutus brändin mukaan",
      "Tekoälyystävällinen ja helposti jatkokehitettävä rakenne",
      "Kertaluontoinen hakukoneoptimointi (SEO)",
      "Tarjouslomake ja sähköposti-integraatio",
    ],
    description: "Laajempi kokonaisuus yrityksille, jotka haluavat kasvattaa näkyvyyttä ja asiakasmäärää.",
    footer: "Sopii pk-yrityksille, jotka haluavat enemmän kuin vain perussivut.",
  },
  {
    name: "Kasvupaketti",
    subtitle: "Täysi digitaalinen kokonaisuus",
    price: "2000",
    features: [
      "Laaja, räätälöity monisivuinen nettisivusto",
      "Edistynyt UI Design ja UX-ajattelu",
      "Tekoälyoptimointi ja skaalautuva tekninen rakenne",
      "Hakukoneoptimointi ja analytiikka",
      "Valmis pohja automaatioille ja integraatioille",
      "Mahdollisuus jatkokehitykseen ja laajennuksiin",
    ],
    description: "Täysi digitaalinen kokonaisuus kasvuhakuisille yrityksille.",
    footer: "Paras valinta yrityksille, jotka haluavat pitkäjänteistä kasvua ja modernin teknisen pohjan.",
  },
];

const maintenancePlans = [
  {
    name: "Perusylläpito",
    price: "17",
    unit: "/ kk",
    features: [
      "Sivuston kunnossapito",
      "Pienet päivitykset",
      "Kävijäseuranta ja perusanalytiikka",
    ],
  },
  {
    name: "Laajennettu ylläpito",
    price: "33",
    unit: "/ kk",
    features: [
      "Kaikki perusylläpidon palvelut",
      "Jatkuva tekoälyoptimointi",
      "Jatkuva tekoäly sisällön tuotanto",
      "Sisällön päivitykset ja kehitys",
      "Laajempi analytiikka ja raportointi",
    ],
  },
];

const mobileShowcaseImages = [
  serviceVerkkosivut1,
  serviceVerkkosivut2,
  serviceVerkkosivut3,
  refLujainfra,
  refSodergard,
  referenssi1,
];

const WebsiteBenefitsSection = () => {
  const { isDark } = useTheme();
  const heading = isDark ? 'text-white' : 'text-neutral-900';
  const body = isDark ? 'text-neutral-300' : 'text-neutral-700';
  const frame = isDark
    ? 'border-white/[0.14] bg-white/[0.04] shadow-[0_16px_50px_rgba(0,0,0,0.35)]'
    : 'border-black/[0.12] bg-black/[0.03] shadow-[0_14px_42px_rgba(0,0,0,0.12)]';

  return (
    <section className="relative py-20 sm:py-24">
      <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-start">
          <FadeIn>
            <div className="flex items-center justify-center h-full min-h-[400px]">
              <h2 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold italic text-center leading-tight ${heading}`}>
                Yrityksesi<br /><span className="text-[hsl(217,91%,60%)]">tähän?</span>
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="space-y-8">
              <div>
                <h3 className={`text-2xl sm:text-3xl font-bold leading-tight mb-4 ${heading}`}>
                  Sivusto, joka tuntuu <span className="text-[hsl(217,91%,60%)]">brändiltäsi.</span>
                </h3>
                <p className={`text-base sm:text-lg leading-relaxed ${body}`}>
                  Useimmat asiakkaat kohtaavat yrityksesi ensimmäistä kertaa verkossa. Siksi verkkosivujen ei pitäisi olla vain informatiiviset – niiden pitää välittää sama laatu, tunne ja uskottavuus kuin yrityksesi oikeasti edustaa.
                  <br />
                  <br />
                  Hyödynnämme vibe-koodausta, jossa brändisi visuaalinen identiteetti, tunnelma ja liiketoiminnan tavoitteet käännetään suoraan toimivaksi digitaaliseksi kokemukseksi.
                </p>
              </div>

              <div>
                <h3 className={`text-2xl sm:text-3xl font-bold leading-tight mb-4 ${heading}`}>
                  Sivusto, joka tekee <span className="text-[hsl(217,91%,60%)]">myyntiä</span> puolestasi.
                </h3>
                <p className={`text-base sm:text-lg leading-relaxed ${body}`}>
                  Hyvin rakennettu verkkosivusto ei ole pelkkä käyntikortti – se on yrityksesi tehokkain myyntityökalu. Sen tehtävä on ohjata kävijää, rakentaa luottamusta ja tehdä yhteydenotosta mahdollisimman helppoa.
                  <br />
                  <br />
                  Rakennamme sivustoja, jotka ovat nopeita, responsiivisia ja suunniteltu konversio edellä. Jokainen elementti palvelee yhtä tarkoitusta: muuttaa kävijät asiakkaiksi.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const PricingSection = () => {
  const { isDark } = useTheme();

  const heading = isDark ? 'text-white' : 'text-neutral-900';
  const desc = isDark ? 'text-neutral-400' : 'text-neutral-500';
  const cardBase = isDark
    ? 'bg-gradient-to-b from-[#0b132b] via-[#070a12] to-[#070a12] border border-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_22px_70px_rgba(0,0,0,0.55)] hover:border-white/[0.20]'
    : 'bg-black/[0.02] border border-black/[0.08] hover:bg-black/[0.04] hover:border-black/[0.14]';
  const cardHighlighted = isDark
    ? 'bg-gradient-to-b from-[#123060] via-[#0a1733] to-[#070a12] border-2 border-blue-400/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_0_55px_rgba(59,130,246,0.35),0_22px_70px_rgba(0,0,0,0.55)] hover:border-blue-400/65'
    : 'bg-black/[0.03] border-2 border-neutral-400/40 hover:border-neutral-400/60';
  const badgeBg = isDark ? 'bg-blue-500' : 'bg-neutral-800';
  const priceColor = isDark ? 'text-white' : 'text-neutral-900';
  const featureIcon = isDark ? 'text-cyan-300/85' : 'text-neutral-400';
  const featureText = isDark ? 'text-neutral-300' : 'text-neutral-600';
  const footerBorder = isDark ? 'border-white/[0.06]' : 'border-black/[0.06]';
  const btnHighlighted = isDark ? 'bg-blue-400/15 text-blue-100 border border-blue-400/35 hover:bg-blue-400/20' : 'bg-black text-white hover:bg-neutral-800';
  const btnNormal = isDark
    ? 'bg-white/[0.04] text-white border border-white/[0.14] hover:bg-white/[0.07] hover:border-white/[0.22]'
    : 'bg-black/[0.05] text-neutral-900 border border-black/[0.1] hover:bg-black/[0.1]';
  const landingCtaCard = isDark
    ? 'border border-blue-500/25 bg-blue-500/[0.08]'
    : 'border border-black/[0.15] bg-black/[0.03]';
  const landingCtaText = isDark ? 'text-blue-100' : 'text-neutral-700';
  const radialBg = isDark
    ? 'radial-gradient(circle at 50% 50%, #0021ff10 0%, transparent 50%), #000'
    : 'radial-gradient(circle at 50% 50%, #00000008 0%, transparent 50%), #fff';

  return (
    <>
      <WebsiteBenefitsSection />

      {/* Main pricing */}
      <section className="relative pt-32 sm:pt-48 md:pt-56 lg:pt-44 pb-24 overflow-hidden">
        {/* Desktop bg */}
        <img
          src={hinnastoBgCustom}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none hidden sm:block"
          style={{ objectPosition: 'center 40%' }}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        {/* Mobile bg */}
        <img
          src={hinnastoBgCustom}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none block sm:hidden"
          style={{ objectPosition: 'center 35%' }}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/30 sm:via-black/40 to-black/80 pointer-events-none" />
        <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">

          <FadeIn delay={0.05} className="mb-10">
            <div className={`rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${landingCtaCard}`}>
              <div>
                <p className={`text-sm sm:text-base font-semibold ${heading}`}>Landing page nopeasti yrityksellesi</p>
                <p className={`text-sm mt-1 ${landingCtaText}`}>Tilaa 1-sivuinen myyvä landing page -vedos ennen varsinaista toteutusta.</p>
              </div>
              <Link
                to="/tilaa-vedos"
                className={`inline-flex items-center justify-center px-6 py-3 font-semibold rounded-full transition-all duration-300 hover:scale-105 text-sm whitespace-nowrap ${
                  isDark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800'
                }`}
              >
                Tilaa landing page -vedos
              </Link>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {pricingPlans.map((plan, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className={`relative h-full rounded-2xl p-8 transition-all duration-500 flex flex-col ${
                  plan.highlighted ? cardHighlighted : cardBase
                }`}>
                  {plan.highlighted && (
                    <span className={`absolute -top-3 left-8 px-4 py-1 ${badgeBg} text-white text-xs font-bold rounded-full uppercase tracking-wider`}>
                      Suosituin
                    </span>
                  )}
                  <div className="mb-6">
                    <h3 className={`text-xl font-bold mb-1 ${priceColor}`}>{plan.name}</h3>
                    <p className="text-neutral-300 text-sm">{plan.subtitle}</p>
                  </div>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className={`text-4xl font-bold ${priceColor}`}>{plan.price} €</span>
                    <span className="text-neutral-300 text-sm">+ ALV</span>
                  </div>
                  <p className={`text-sm leading-relaxed mb-6 ${desc}`}>{plan.description}</p>
                  
                  <div className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <CheckCircle2 size={16} className={`${featureIcon} mt-0.5 shrink-0`} />
                        <p className={`text-sm leading-relaxed ${featureText}`}>{feature}</p>
                      </div>
                    ))}
                  </div>
                  
                  <p className={`text-neutral-300 text-xs leading-relaxed mb-6 border-t ${footerBorder} pt-6`}>{plan.footer}</p>
                  
          <Link
                    to="/yhteystiedot#vedos"
                    className={`inline-flex items-center justify-center px-6 py-3 font-semibold rounded-full transition-all duration-300 hover:scale-105 text-sm ${
                      plan.highlighted ? btnHighlighted : btnNormal
                    }`}
                  >
                    Tilaa vedos
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance pricing */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ background: radialBg }} />
        <div className="max-w-7xl lg:max-w-[90rem] mx-auto px-6 lg:px-16 relative z-10">

          {/* Big centered headline */}
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className={`text-4xl sm:text-5xl md:text-7xl font-extrabold italic leading-tight mb-6 ${heading}`}>
                Ylläpitopalvelu alkaen<br />
                <span className="text-[hsl(217,91%,60%)]">17€ / kk</span>
              </h2>
              <p className={`text-base sm:text-lg max-w-2xl mx-auto leading-relaxed ${desc}`}>
                Tekninen ylläpitopalvelu pitää kotisivusi aina ajan tasalla. Varmistamme, että sivut toimivat moitteettomasti vuoden jokaisena päivänä. Päivitykset ja varmuuskopiot huoletta. Nopeus ja tietoturva aina huippuluokkaa. Tuki ja apu, kun sitä tarvitset.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {maintenancePlans.map((plan, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                      <div className={`rounded-2xl p-8 transition-all duration-500 h-full flex flex-col ${cardBase}`}>
                  <h3 className={`text-lg font-bold mb-4 ${priceColor}`}>{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className={`text-3xl font-bold ${priceColor}`}>{plan.price} €</span>
                    <span className="text-neutral-500 text-sm">{plan.unit}</span>
                  </div>
                    <div className="space-y-3 flex-1">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <CheckCircle2 size={16} className={`${featureIcon} mt-0.5 shrink-0`} />
                        <p className={`text-sm leading-relaxed ${featureText}`}>{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

    </>
  );
};

const Verkkosivut = () => (
  <>
    <ServicePageLayout
      heroImage={heroVerkkosivut}
      heroImageObjectClassName="object-cover object-bottom translate-y-16 md:translate-y-20 lg:translate-y-24"
      heroVariant="commercial"
      seo={{
        title: "Verkkosivut yritykselle — FEIM Digital Studio",
        description: "FEIM suunnittelee ja rakentaa moderneja verkkosivuja, jotka tukevat liiketoimintaa, rakentavat brändiä ja muuttavat kävijät asiakkaiksi.",
        url: "https://feim.fi/verkkosivut"
      }}
      hero={{
        label: "",
        title: "Verkkosivut jotka erottuvat",
        titlePlacement: "overlay-bottom-left",
        intro: "",
        cta: "",
        ctaHref: "/yhteystiedot#vedos"
      }}
      sections={[]}
      cta={{
        title: "Tilaa maksuton vedos verkkosivustasi",
        description: "",
        buttonText: "Tilaa maksuton vedos",
        buttonHref: "/yhteystiedot#vedos"
      }}
      ctaSecondary={{
        buttonText: "Tutustu prototyyppeihin",
        buttonHref: "/prototyypit"
      }}
      pricingSlot={<PricingSection />}
    />
  </>
);

export default Verkkosivut;
