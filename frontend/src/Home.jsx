import { useEffect, useState } from "react";
import axios from "axios";
import pastorImage from "./assets/pastor.jpeg";
import churchBuilding from "./assets/church-building.jpeg";
import churchLogo from "./assets/church-logo.jpeg";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://172.16.18.162:5000";
const church = {
  nameEn: "DIVINE PRAYER CHURCH",
  nameTe: "పరిశుద్ధ ప్రార్థన మందిరం",
 pastorEn: "SG. JASON VIJAY RAJ",
pastorTe: "ఎస్.జి. జేసన్ విజయ్ రాజ్",
  address: "18-795-F, 60 Feet Rd, Tilak Nagar, Guntakal, Andhra Pradesh 515801",
  phone: "7730801788",
  email: "divineprayerchruch777@gmail.com",
  directionsUrl: "https://maps.app.goo.gl/fpMQp4EBFmr7hNuC9",
  services: [
    { en: "Sunday Worship — First Service", te: "ఆదివారం ఆరాధన — మొదటి సేవ", time: "7:00 AM – 9:00 AM" },
    { en: "Sunday Worship — Second Service", te: "ఆదివారం ఆరాధన — రెండవ సేవ", time: "10:00 AM – 12:00 PM" },
  ],
};
const gallery = [
  { en: "A Place of Prayer", te: "ప్రార్థనా స్థలం", url: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=900&q=85" },
  { en: "Worship Together", te: "కలిసి ఆరాధిద్దాం", url: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=900&q=85" },
  { en: "Faith and Fellowship", te: "విశ్వాసం మరియు సహవాసం", url: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?auto=format&fit=crop&w=900&q=85" },
];
const text = {
  en: {
    family: "A FAMILY UNITED IN CHRIST", call: "Call us", nav: ["Home", "About", "Worship", "Events", "Gallery", "Contact"], admin: "Admin Login", visit: "Visit Us",
    welcome: "WELCOME TO OUR CHURCH", heroA: "A Place of", heroB: "Faith, Hope", heroC: "and Love", heroDesc: "Growing together in faith, sharing the love of Jesus Christ, and serving our community with hope.", discover: "Discover Our Church", join: "Join Us in Worship", verse: "“For where two or three gather in my name, there am I with them.”", welcomeFamily: "WELCOME TO OUR FAMILY", about: "About Our Church", aboutDesc: "A community of faith, prayer, fellowship, and the teachings of Jesus Christ. We welcome you and your family to worship with us, grow in faith, and experience the love of Christ.", pastor: "OUR PASTOR", pastorDesc: "Leading our church in prayer, worship, and faith in Jesus Christ.", ourChurch: "OUR CHURCH", buildingDesc: "A place for prayer, worship, fellowship, and growing together in faith.", guides: "WHAT GUIDES US", values: "Faith in Action", valuesDesc: "Worship God, love one another, and serve our community.", faith: "Faith", faithDesc: "Growing closer to God through Scripture, worship, and prayer.", love: "Love", loveDesc: "Welcoming every person with kindness and the love of Christ.", service: "Service", serviceDesc: "Serving our neighbours and supporting our community.", invited: "YOU ARE INVITED", worship: "Join Us in Worship", worshipDesc: "There is a place for you and your family here.", serviceText: "Come together for praise, prayer, and the Word of God.", churchLife: "LIFE IN OUR CHURCH", events: "Upcoming Events", eventsDesc: "Gatherings, celebrations, and opportunities to grow together.", loading: "Loading church events…", eventError: "Events are temporarily unavailable.", noEvents: "New Gatherings Coming Soon", noEventsDesc: "New church events will be announced here.", moments: "MOMENTS OF FAITH", gallery: "Our Church Gallery", galleryDesc: "A glimpse of worship, fellowship, and life together.", galleryNote: "These are sample photographs. Replace them with your church's own photos before publishing.", meet: "WE WOULD LOVE TO MEET YOU", contact: "Come and Be Part of Our Family", contactDesc: "Visit us in Guntakal. You and your family are welcome.", address: "Address", phone: "Phone", email: "Email", callChurch: "Call the Church", directions: "Get Directions", footer: "Built on faith, hope, and love.", footerNav: ["About", "Worship", "Gallery", "Contact"], rights: "All rights reserved.", close: "Close image", enlarge: "Enlarge",
  },
  te: {
    family: "క్రీస్తులో ఐక్యమైన కుటుంబం", call: "ఫోన్ చేయండి", nav: ["హోమ్", "మా గురించి", "ఆరాధన", "కార్యక్రమాలు", "గ్యాలరీ", "సంప్రదించండి"], admin: "అడ్మిన్ లాగిన్", visit: "మమ్మల్ని సందర్శించండి",
    welcome: "మా ప్రార్థనా మందిరానికి స్వాగతం", heroA: "ఇది ఒక", heroB: "విశ్వాసం, నిరీక్షణ", heroC: "మరియు ప్రేమ నిలయం", heroDesc: "విశ్వాసంలో ఎదుగుతూ, యేసుక్రీస్తు ప్రేమను పంచుకుంటూ, నిరీక్షణతో మన సమాజానికి సేవ చేద్దాం.", discover: "మా ప్రార్థనా మందిరం గురించి తెలుసుకోండి", join: "ఆరాధనలో మాతో కలవండి", verse: "“నా నామమున ఇద్దరు ముగ్గురు కూడియున్న చోట నేను వారి మధ్య ఉంటాను.”", welcomeFamily: "మా కుటుంబానికి స్వాగతం", about: "మా ప్రార్థనా మందిరం గురించి", aboutDesc: "విశ్వాసం, ప్రార్థన, సహవాసం మరియు యేసుక్రీస్తు బోధనలతో కూడిన సమాజం మా ప్రార్థనా మందిరం. మీరు మరియు మీ కుటుంబం మాతో కలిసి ఆరాధించడానికి, విశ్వాసంలో ఎదగడానికి, క్రీస్తు ప్రేమను అనుభవించడానికి సాదరంగా ఆహ్వానిస్తున్నాం.", pastor: "మన పాస్టర్", pastorDesc: "ప్రార్థన, ఆరాధన మరియు యేసుక్రీస్తుపై విశ్వాసంలో మన సంఘాన్ని నడిపిస్తున్నారు.", ourChurch: "మన ప్రార్థనా మందిరం", buildingDesc: "ప్రార్థన, ఆరాధన, సహవాసం మరియు విశ్వాసంలో కలిసి ఎదగడానికి ఒక స్థలం.", guides: "మనకు మార్గదర్శకమైనవి", values: "ఆచరణలో విశ్వాసం", valuesDesc: "దేవుని ఆరాధిద్దాం, ఒకరినొకరు ప్రేమిద్దాం, మన సమాజానికి సేవ చేద్దాం.", faith: "విశ్వాసం", faithDesc: "దేవుని వాక్యం, ఆరాధన మరియు ప్రార్థన ద్వారా దేవునికి మరింత దగ్గరవుదాం.", love: "ప్రేమ", loveDesc: "ప్రతి ఒక్కరినీ దయతో, క్రీస్తు ప్రేమతో ఆహ్వానిద్దాం.", service: "సేవ", serviceDesc: "మన పొరుగువారికి సేవ చేస్తూ సమాజానికి తోడ్పడుదాం.", invited: "మీకు ఇదే మా ఆహ్వానం", worship: "మాతో కలిసి ఆరాధించండి", worshipDesc: "మీకు మరియు మీ కుటుంబానికి ఇక్కడ స్థానం ఉంది.", serviceText: "స్తుతి, ప్రార్థన మరియు దేవుని వాక్యం కోసం కలిసి కలుద్దాం.", churchLife: "మన సంఘ జీవితం", events: "రాబోయే కార్యక్రమాలు", eventsDesc: "కలయికలు, వేడుకలు మరియు కలిసి ఎదగడానికి అవకాశాలు.", loading: "సంఘ కార్యక్రమాలు లోడ్ అవుతున్నాయి…", eventError: "ప్రస్తుతం కార్యక్రమాల వివరాలు అందుబాటులో లేవు.", noEvents: "త్వరలో కొత్త కార్యక్రమాలు", noEventsDesc: "కొత్త సంఘ కార్యక్రమాల వివరాలు ఇక్కడ ప్రకటించబడతాయి.", moments: "విశ్వాసపు మధుర క్షణాలు", gallery: "మన సంఘ చిత్రాలు", galleryDesc: "ఆరాధన, సహవాసం మరియు మన సంఘ జీవితంలోని కొన్ని క్షణాలు.", galleryNote: "ఇవి నమూనా చిత్రాలు. ప్రచురించే ముందు మీ సంఘానికి సంబంధించిన నిజమైన చిత్రాలతో మార్చండి.", meet: "మిమ్మల్ని కలవడం మాకు ఆనందం", contact: "మా కుటుంబంలో భాగస్వాములు కండి", contactDesc: "గుంతకల్లులో మమ్మల్ని సందర్శించండి. మీరు మరియు మీ కుటుంబం సాదరంగా ఆహ్వానించబడుతున్నారు.", address: "చిరునామా", phone: "ఫోన్", email: "ఈమెయిల్", callChurch: "చర్చికి ఫోన్ చేయండి", directions: "దారి తెలుసుకోండి", footer: "విశ్వాసం, నిరీక్షణ మరియు ప్రేమపై నిర్మితమైనది.", footerNav: ["మా గురించి", "ఆరాధన", "గ్యాలరీ", "సంప్రదించండి"], rights: "సర్వ హక్కులు ప్రత్యేకించబడ్డాయి.", close: "చిత్రాన్ని మూసివేయండి", enlarge: "పెద్దగా చూడండి",
  },
};

function Home() {
  const [language, setLanguage] = useState("en");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventError, setEventError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = text[language];
  const churchName = language === "en" ? church.nameEn : church.nameTe;
  const navIds = ["home", "about", "worship", "events", "gallery", "contact"];
  const footerIds = ["about", "worship", "gallery", "contact"];

  useEffect(() => {
    let active = true;
    axios.get(`${API_URL}/api/events`)
      .then((response) => { if (active) setEvents(Array.isArray(response.data) ? response.data : []); })
      .catch((error) => { console.error("Unable to load events:", error.message); if (active) setEventError(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return (
    <div className={`website ${language === "te" ? "telugu-font" : ""}`}>
      <div className="topbar"><span>✦ {t.family} ✦</span><a href={`tel:${church.phone}`}>{t.call}: {church.phone}</a></div>
      <nav className="navbar">
        <a className="brand" href="#home" aria-label={churchName}>
          <img className="church-logo" src={churchLogo} alt={churchName} />
          <span><strong>{churchName}</strong></span>
        </a>
        <button className="menu-toggle" aria-label={language === "en" ? "Toggle navigation" : "నావిగేషన్ తెరవండి లేదా మూసివేయండి"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} type="button">☰</button>
        <div className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          {t.nav.map((item, index) => <a key={navIds[index]} href={`#${navIds[index]}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
          <a href="/admin" className="admin-login-btn" onClick={() => setMenuOpen(false)}>{t.admin}</a>
          <button type="button" className="language-btn" onClick={() => setLanguage((current) => current === "en" ? "te" : "en")}>{language === "en" ? "తెలుగు" : "English"}</button>
          <a className="nav-button" href="#contact" onClick={() => setMenuOpen(false)}>{t.visit}</a>
        </div>
      </nav>

      <header className="hero" id="home"><div className="hero-shade" /><div className="hero-content">
        <p className="eyebrow light">{t.welcome}</p>
        <h1>{t.heroA} <span>{t.heroB}</span> {t.heroC}</h1>
        <p className="hero-description">{t.heroDesc}</p>
        <div className="hero-actions"><a className="button button-gold" href="#about">{t.discover}</a><a className="button button-outline" href="#worship">{t.join}</a></div>
        <p className="verse">{t.verse} <strong>{language === "en" ? "Matthew 18:20" : "మత్తయి 18:20"}</strong></p>
      </div></header>
      
<section className="welcome section" id="about">
  <p className="eyebrow">{t.welcomeFamily}</p>
  <div className="ornament">✝</div>
  <h2>{churchName}</h2>
  <p className="section-description">
    {t.aboutDesc}
  </p>
</section>


      <section className="church-showcase section" id="about">
        <div className="showcase-card">
          <img
            className="pastor-image"
            src={pastorImage}
            alt={church.pastorEn || "Church pastor"}
            loading="lazy"
          />

          <div className="showcase-details">
            <small>{t.pastor}</small>
            <h3>
              {language === "en"
                ? church.pastorEn
                : church.pastorTe}
            </h3>
            <p>{t.pastorDesc}</p>
          </div>
        </div>

        <div className="showcase-card" id="building">
          <img
            className="building-image"
            src={churchBuilding}
            alt={churchName}
            loading="lazy"
          />

          <div className="showcase-details">
            <small>{t.ourChurch}</small>
            <h3>{churchName}</h3>
            <p>{t.buildingDesc}</p>
          </div>
        </div>
      </section>


  <section className="values section">        <div className="showcase-details">
  <small>{t.ourChurch}</small>
  <h3>{churchName}</h3>
  <p>{t.buildingDesc}</p>
</div>

      <div className="section-heading"><p className="eyebrow">{t.guides}</p><h2>{t.values}</h2><p className="section-description">{t.valuesDesc}</p></div>
        <div className="card-grid"><article className="info-card"><span className="card-icon">✝</span><h3>{t.faith}</h3><p>{t.faithDesc}</p></article><article className="info-card"><span className="card-icon">♡</span><h3>{t.love}</h3><p>{t.loveDesc}</p></article><article className="info-card"><span className="card-icon">✧</span><h3>{t.service}</h3><p>{t.serviceDesc}</p></article></div>
      </section>

      <section className="worship section" id="worship"><div className="section-heading"><p className="eyebrow light">{t.invited}</p><h2>{t.worship}</h2><p className="section-description">{t.worshipDesc}</p></div>
        <div className="service-grid">{church.services.map((service, index) => <article className="service-card" key={service.time}><span className="service-number">0{index + 1}</span><h3>{language === "en" ? service.en : service.te}</h3><p>{t.serviceText}</p><div className="service-time">◷ {service.time}</div></article>)}</div>
      </section>

      <section className="events section" id="events"><div className="section-heading"><p className="eyebrow">{t.churchLife}</p><h2>{t.events}</h2><p className="section-description">{t.eventsDesc}</p></div>
        {loading ? <p className="message">{t.loading}</p> : eventError ? <p className="message">{t.eventError}</p> : events.length === 0 ? <div className="empty-events"><span>✧</span><h3>{t.noEvents}</h3><p>{t.noEventsDesc}</p></div> : <div className="card-grid">{events.map((event) => <article className="event-card" key={event._id}><span className="eyebrow">{new Date(event.date).toLocaleDateString(language === "en" ? "en-IN" : "te-IN", { day: "2-digit", month: "short", year: "numeric" })}</span><h3>{event.title}</h3>{event.description && <p>{event.description}</p>}{event.location && <p>⌖ {event.location}</p>}</article>)}</div>}
      </section>

      <section className="gallery section" id="gallery"><div className="section-heading"><p className="eyebrow">{t.moments}</p><h2>{t.gallery}</h2><p className="section-description">{t.galleryDesc}</p></div>
        <div className="gallery-grid">{gallery.map((photo) => { const title = language === "en" ? photo.en : photo.te; return <button className="gallery-item" key={photo.url} onClick={() => setSelectedImage({ ...photo, displayTitle: title })} aria-label={`${t.enlarge} ${title}`} type="button"><img src={photo.url} alt={title} loading="lazy" /><span>{title} ↗</span></button>; })}</div><p className="gallery-note">{t.galleryNote}</p>
      </section>

      <section className="contact section" id="contact"><p className="eyebrow light">{t.meet}</p><h2>{t.contact}</h2><p className="section-description">{t.contactDesc}</p>
        <div className="contact-grid"><article><span>⌖</span><h3>{t.address}</h3><p>{church.address}</p></article><article><span>☎</span><h3>{t.phone}</h3><a href={`tel:${church.phone}`}>{church.phone}</a></article><article><span>✉</span><h3>{t.email}</h3><a href={`mailto:${church.email}`}>{church.email}</a></article></div>
        <div className="contact-actions"><a className="button button-gold" href={`tel:${church.phone}`}>{t.callChurch}</a><a className="button button-outline" href={church.directionsUrl} target="_blank" rel="noopener noreferrer">{t.directions}</a></div>
      </section>

      <footer className="footer"><a className="footer-brand" href="#home">✝ {churchName}</a><p>{t.footer}</p><div className="footer-links">{t.footerNav.map((label, index) => <a key={footerIds[index]} href={`#${footerIds[index]}`}>{label}</a>)}</div><p className="copyright">© {new Date().getFullYear()} {churchName}. {t.rights}</p></footer>

      {selectedImage && <div className="lightbox" role="dialog" aria-modal="true" aria-label={selectedImage.displayTitle} onClick={() => setSelectedImage(null)}><button className="lightbox-close" onClick={() => setSelectedImage(null)} aria-label={t.close} type="button">×</button><img src={selectedImage.url} alt={selectedImage.displayTitle} /><p>{selectedImage.displayTitle}</p></div>}
    </div>
  );
}

export default Home;
