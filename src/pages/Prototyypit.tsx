import ServicePageLayout from '@/components/ServicePageLayout';
import heroProtoDesktop from '@/assets/hero-proto-desktop.webp';
import heroProtoMobile from '@/assets/hero-proto-mobile.webp';
import { useIsMobile } from '@/hooks/use-mobile';

const Prototyypit = () => {
  const isMobile = useIsMobile();
  const heroImage = isMobile ? heroProtoMobile : heroProtoDesktop;

  return (
    <ServicePageLayout
      heroVariant="creative"
      heroImage={heroImage}
      seo={{
        title: "Prototyypit ja MVP — FEIM Digital Studio",
        description: "Muuta sovellusidea konkreettiseksi prototyypiksi tai MVP:ksi. FEIM auttaa rakentamaan ensimmäisen version nopeasti — ideasta testaukseen.",
        url: "https://feim.fi/prototyypit"
      }}
      hero={{
        title: "Muuta ideasi prototyypiksi",
        titlePlacement: "overlay-center",
        intro: "",
        cta: "",
        ctaHref: "/yhteystiedot#vedos"
      }}
      sections={[
        {
          title: "Miksi prototyyppi kannattaa tehdä",
          description: "Prototyyppi säästää aikaa, rahaa ja riskejä — ja antaa konkreettisen lähtöpisteen koko projektille.",
          bullets: [
            "Idean konkretisointi: näet miltä tuotteesi näyttää ja tuntuu ennen kuin kirjoitetaan riviäkään koodia",
            "Käyttäjätestaus: saat palautetta oikeilta käyttäjiltä ennen täyttä kehitystä",
            "Sijoittajien vakuuttaminen: esittele toimiva konsepti, ei pelkkä slide-deck",
            "Riskin pienentäminen: validoi idea nopeasti ja edullisesti ennen suurta investointia"
          ]
        },
        {
          title: "Mitä voimme rakentaa",
          description: "Rakennamme erilaisia prototyyppejä ja ensimmäisiä versioita riippuen siitä, missä vaiheessa ideasi on.",
          bullets: [
            "Klikattavat UI-prototyypit: interaktiivinen demo, jolla ideaa voidaan testata ja esitellä",
            "MVP-sovellukset: julkaistava minimiversio, jolla kerätään käyttäjäpalautetta ja validoidaan konsepti",
            "Proof-of-concept: tekninen konseptitodistus, joka osoittaa idean toimivuuden",
            "Tuotekonseptit: visuaalinen ja rakenteellinen esitys koko tuoteideasta"
          ]
        }
      ]}
      audience={{
        title: "Kenelle tämä sopii",
        items: [
          "Startup-tiimit ja yrittäjät, joilla on uusi tuoteidea ja jotka haluavat validoida sen nopeasti.",
          "Yksityiset henkilöt, joilla on sovellusidea mutta ei teknistä taustaa — autamme tekemään ensimmäisen version.",
          "Yritykset jotka kehittävät uutta digitaalista tuotetta tai palvelua ja haluavat testata konseptin ennen täyttä investointia."
        ]
      }}
      cta={{
        title: "Tilaa maksuton vedos ideastasi",
        description: "",
        buttonText: "Tilaa maksuton vedos",
        buttonHref: "/yhteystiedot#vedos"
      }}
    />
  );
};

export default Prototyypit;
