import ServicePageLayout from '@/components/ServicePageLayout';
import hinnastoBgCustom from '@/assets/hinnasto-bg-custom.png';

const WebSovellukset = () => (
  <ServicePageLayout
    heroVariant="technical"
    seo={{
      title: "Web-sovellukset — FEIM Digital Studio",
      description: "Rakennamme räätälöityjä web-sovelluksia ja digitaalisia palveluja — SaaS-palveluja, asiakasportaaleja, hallintajärjestelmiä ja uusia digitaalisia tuotteita.",
      url: "https://feim.fi/web-sovellukset"
    }}
    hero={{
      label: "Web-sovellukset",
      title: "Rakennamme web-sovelluksia ja digitaalisia tuotteita",
      intro: "",
      cta: "",
      ctaHref: "/yhteystiedot#vedos"
    }}
    sections={[
      {
        title: "Millaisia sovelluksia rakennamme",
        description: "Rakennamme digitaalisia tuotteita ja palveluja, jotka ratkaisevat oikeita ongelmia ja skaalautuvat tarpeen mukaan.",
        bullets: [
          "SaaS-palvelut ja tilauspohjaiset tuotteet",
          "Asiakasportaalit ja itsepalvelualustat",
          "Digitaaliset alustat ja markkinapaikat",
          "Automatisoidut työkalut ja sisäiset järjestelmät",
          "Uudet digitaaliset tuotteet ja palvelukonseptit"
        ]
      },
      {
        title: "Prosessi ideasta tuotteeksi",
        description: "Jokainen sovellusprojekti etenee hallitusti vaihe kerrallaan — ilman turhaa monimutkaisuutta.",
        bullets: [
          "Idean kartoitus: ymmärrämme mitä ratkaistaan ja kenelle",
          "Konsepti ja UX: määrittelemme rakenteen, käyttäjäpolut ja ydinominaisuudet",
          "Prototyyppi: rakennamme ensimmäisen klikattavan version",
          "MVP: julkaistava minimiversio, jolla kerätään käyttäjäpalautetta",
          "Skaalautuva sovellus: kehitämme tuotteen valmiiksi vaiheittain"
        ]
      },
      {
        title: "Teknologia ja arkkitehtuuri",
        description: "Ratkaisumme rakennetaan modernilla teknologialla ja skaalautuvalla arkkitehtuurilla, joka kasvaa liiketoiminnan mukana.",
        bullets: [
          "Modernit frontend-teknologiat: React, TypeScript, Tailwind",
          "Skaalautuva backend ja tietokantarakenne",
          "Tietoturva ja käyttäjähallinta sisäänrakennettuna",
          "API-integraatiot ja kolmannen osapuolen palvelut",
          "Suorituskykyoptimointi ja monitorointi",
          "Jatkuva kehitys ja ylläpito julkaisun jälkeen"
        ]
      }
    ]}
    audience={{
      title: "Kenelle tämä sopii",
      items: [
        "Yritykset joilla on tarve digitaaliselle palvelulle, portaalille tai sisäiselle järjestelmälle.",
        "Tiimit ja yrittäjät joilla on SaaS-idea tai uusi digitaalinen tuotekonsepti.",
        "Organisaatiot jotka haluavat automatisoida prosesseja ja rakentaa tehokkaampia työkaluja."
      ]
    }}
    cta={{
      title: "Kerro ideastasi",
      description: "",
      buttonText: "Keskustele sovellusideastasi",
      buttonHref: "/yhteystiedot#vedos"
    }}
    ctaImageBelowSrc={hinnastoBgCustom}
  />
);

export default WebSovellukset;
