import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ArrowRight, Check, Mail, Calendar, Quote } from "lucide-react";

/* ============================================================
   CLIO ACADEMY — live preview site (single-file React)
   Design system lives in the <style> block below.
   Ports cleanly to the Next.js + Tailwind production build.
   ============================================================ */

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');

:root{
  --parchment:#F6F1E7;
  --parchment-2:#EFE7D6;
  --marble:#FCFAF5;
  --ink:#14213A;
  --navy:#223B63;
  --charcoal:#34332E;
  --stone:#726D62;
  --gold:#B8965E;
  --gold-deep:#86673B;
  --line:rgba(20,33,58,0.12);
  --line-gold:rgba(184,150,94,0.42);
  --font-display:'Cinzel','Trajan Pro',Georgia,serif;
  --font-serif:'Cormorant Garamond',Garamond,'Times New Roman',serif;
  --font-body:'Inter',system-ui,-apple-system,'Segoe UI',sans-serif;
}

*{box-sizing:border-box}
.ca-root{
  font-family:var(--font-body);
  color:var(--charcoal);
  background:var(--parchment);
  line-height:1.6;
  -webkit-font-smoothing:antialiased;
  position:relative;
  overflow-x:hidden;
}
/* faint paper grain over everything */
.ca-root::before{
  content:"";position:fixed;inset:0;pointer-events:none;z-index:1;opacity:0.035;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
.ca-root > *{position:relative;z-index:2}

p{margin:0 0 1rem}
a{color:inherit;text-decoration:none}
img{max-width:100%}
button{font-family:inherit;cursor:pointer}

:focus-visible{outline:2px solid var(--gold);outline-offset:3px;border-radius:2px}

.wrap{max-width:1180px;margin:0 auto;padding:0 28px}
.narrow{max-width:820px;margin:0 auto;padding:0 28px}

/* ---------- type ---------- */
.eyebrow{
  font-family:var(--font-display);
  font-size:12px;font-weight:600;letter-spacing:0.32em;text-transform:uppercase;
  color:var(--gold-deep);margin:0 0 20px;display:block;
}
.eyebrow.on-dark{color:var(--gold)}
.display{
  font-family:var(--font-display);font-weight:600;color:var(--ink);
  letter-spacing:0.02em;line-height:1.08;text-transform:uppercase;
}
h1.display{font-size:clamp(38px,6.4vw,74px);margin:0}
h2.serif{
  font-family:var(--font-serif);font-weight:500;color:var(--ink);
  font-size:clamp(30px,4.4vw,48px);line-height:1.1;letter-spacing:0.01em;margin:0 0 22px;
}
h3.serif{font-family:var(--font-serif);font-weight:600;color:var(--ink);font-size:24px;line-height:1.2;margin:0 0 12px}
.lede{font-family:var(--font-serif);font-size:clamp(19px,2.3vw,24px);color:var(--charcoal);line-height:1.5}
.muted{color:var(--stone)}

/* ---------- rule / ornament ---------- */
.rule{display:flex;align-items:center;gap:16px;margin:0 auto;justify-content:center}
.rule .ln{height:1px;background:linear-gradient(90deg,transparent,var(--line-gold),transparent);flex:1;max-width:180px}
.rule.left{justify-content:flex-start}
.rule.left .ln:first-child{display:none}
.rule.left .ln{max-width:120px}
.glyph{width:20px;height:20px;flex:none}
.glyph path{stroke:var(--gold);stroke-width:1.4;fill:none;stroke-linecap:square}

/* ---------- buttons ---------- */
.btn{
  display:inline-flex;align-items:center;gap:9px;font-size:14px;font-weight:500;letter-spacing:0.04em;
  padding:15px 26px;border-radius:2px;transition:all .25s ease;border:1px solid transparent;text-transform:uppercase;
}
.btn svg{width:15px;height:15px;transition:transform .25s ease}
.btn--primary{background:var(--ink);color:var(--parchment);border-color:var(--ink)}
.btn--primary:hover{background:var(--navy);border-color:var(--navy)}
.btn--primary:hover svg{transform:translateX(4px)}
.btn--gold{background:var(--gold);color:var(--ink);border-color:var(--gold);font-weight:600}
.btn--gold:hover{background:var(--gold-deep);border-color:var(--gold-deep);color:var(--parchment)}
.btn--gold:hover svg{transform:translateX(4px)}
.btn--ghost{background:transparent;color:var(--ink);border-color:rgba(20,33,58,0.25)}
.btn--ghost:hover{border-color:var(--ink);background:rgba(20,33,58,0.03)}
.btn--ghost.on-dark{color:var(--parchment);border-color:rgba(246,241,231,0.35)}
.btn--ghost.on-dark:hover{border-color:var(--parchment);background:rgba(246,241,231,0.06)}

/* ---------- nav ---------- */
.nav{position:sticky;top:0;z-index:40;background:rgba(246,241,231,0.9);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.nav-in{display:flex;align-items:center;justify-content:space-between;height:78px}
.logo{display:flex;align-items:center;gap:11px;background:none;border:none;padding:0}
.logo .mark{width:26px;height:26px}
.logo .mark path{stroke:var(--gold);stroke-width:1.4;fill:none;stroke-linecap:square}
.logo .word{font-family:var(--font-display);font-weight:600;font-size:19px;letter-spacing:0.14em;color:var(--ink);text-transform:uppercase;line-height:1}
.logo .word small{display:block;font-size:8.5px;letter-spacing:0.42em;color:var(--gold-deep);margin-top:3px;font-weight:500}
.nav-links{display:flex;align-items:center;gap:30px}
.nav-links a{font-size:13.5px;font-weight:500;color:var(--charcoal);letter-spacing:0.02em;background:none;border:none;padding:4px 0;position:relative;transition:color .2s}
.nav-links a::after{content:"";position:absolute;left:0;bottom:-3px;height:1px;width:0;background:var(--gold);transition:width .25s ease}
.nav-links a:hover,.nav-links a.active{color:var(--ink)}
.nav-links a:hover::after,.nav-links a.active::after{width:100%}
.nav-cta{margin-left:8px}
.burger{display:none;background:none;border:none;color:var(--ink);padding:6px}
.mobile-menu{display:none}
@media(max-width:960px){
  .nav-links,.nav-cta.desktop{display:none}
  .burger{display:block}
  .mobile-menu{display:block;border-top:1px solid var(--line);background:var(--parchment);padding:12px 0 22px}
  .mobile-menu a{display:block;padding:13px 28px;font-size:15px;color:var(--charcoal);border:none;background:none;width:100%;text-align:left;font-weight:500}
  .mobile-menu a:hover{background:var(--parchment-2);color:var(--ink)}
  .mobile-menu .mm-cta{margin:16px 28px 0;width:calc(100% - 56px);justify-content:center}
}

/* ---------- sections ---------- */
.sec{padding:96px 0}
.sec-sm{padding:70px 0}
.bg-parch2{background:var(--parchment-2)}
.bg-marble{background:var(--marble)}
.bg-ink{background:var(--ink);color:var(--parchment)}
.bg-ink h2.serif,.bg-ink h3.serif,.bg-ink .display{color:var(--parchment)}
.bg-ink .lede{color:rgba(246,241,231,0.86)}
.bg-ink .muted{color:rgba(246,241,231,0.62)}
.center{text-align:center}
.sec-head{max-width:660px;margin:0 auto 56px}
.sec-head.center{text-align:center}
.sec-head p{color:var(--stone);font-size:17px;margin-top:14px}
.bg-ink .sec-head p{color:rgba(246,241,231,0.72)}

/* ---------- hero ---------- */
.hero{position:relative;padding:118px 0 104px;overflow:hidden;
  background:
    radial-gradient(120% 90% at 78% -10%,rgba(184,150,94,0.10),transparent 55%),
    radial-gradient(90% 80% at 12% 8%,rgba(34,59,99,0.06),transparent 60%),
    linear-gradient(180deg,var(--marble),var(--parchment) 70%);
}
.hero .col{max-width:820px}
.hero h1{margin:22px 0 0}
.hero .sub{margin:30px 0 38px;max-width:620px}
.hero .cta-row{display:flex;gap:14px;flex-wrap:wrap}
.hero-foot{margin-top:56px;display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.carve{text-shadow:0 1px 0 rgba(255,255,255,0.55),0 -1px 0 rgba(20,33,58,0.04)}

/* ---------- credibility strip ---------- */
.creds{border-top:1px solid var(--line);border-bottom:1px solid var(--line);background:var(--parchment-2)}
.creds-in{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;padding:26px 28px}
.cred{font-family:var(--font-display);font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:var(--ink);font-weight:500;white-space:nowrap}
.cred-dot{width:5px;height:5px;border-radius:50%;background:var(--gold);flex:none}

/* ---------- grid + cards ---------- */
.grid{display:grid;gap:26px}
.g2{grid-template-columns:repeat(2,1fr)}
.g3{grid-template-columns:repeat(3,1fr)}
.g4{grid-template-columns:repeat(4,1fr)}
@media(max-width:900px){.g3,.g4{grid-template-columns:repeat(2,1fr)}}
@media(max-width:620px){.g2,.g3,.g4{grid-template-columns:1fr}}

.card{background:var(--marble);border:1px solid var(--line);border-radius:3px;padding:30px;transition:transform .3s ease,box-shadow .3s ease,border-color .3s ease}
.card:hover{transform:translateY(-4px);box-shadow:0 18px 40px -24px rgba(20,33,58,0.35);border-color:var(--line-gold)}
.card .kw{font-family:var(--font-display);font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold-deep);margin-bottom:16px;display:block}
.card p{font-size:15px;color:var(--stone);margin:0}
.card p + p{margin-top:10px}

/* topic card */
.topic{background:var(--marble);border:1px solid var(--line);border-radius:3px;padding:30px;position:relative;overflow:hidden;transition:transform .3s ease,box-shadow .3s ease}
.topic:hover{transform:translateY(-4px);box-shadow:0 18px 40px -24px rgba(20,33,58,0.35)}
.topic .tag{font-family:var(--font-display);font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:var(--gold-deep)}
.topic .dates{font-family:var(--font-serif);font-style:italic;color:var(--stone);font-size:16px;margin-top:6px}
.topic h3{margin:14px 0 12px}
.topic p{font-size:15px;color:var(--stone);margin:0}
.topic .band{position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--gold)}

/* method steps */
.step{display:flex;gap:24px;padding:30px 0;border-top:1px solid var(--line)}
.step:last-child{border-bottom:1px solid var(--line)}
.step .num{font-family:var(--font-display);font-size:15px;font-weight:600;color:var(--gold);letter-spacing:0.1em;padding-top:5px;min-width:42px}
.step h3{margin:0 0 8px}
.step p{margin:0;color:var(--stone);font-size:16px;max-width:640px}

/* list */
.tick{list-style:none;padding:0;margin:0}
.tick li{display:flex;gap:12px;align-items:flex-start;padding:9px 0;font-size:16px}
.tick li svg{width:18px;height:18px;color:var(--gold);flex:none;margin-top:4px}
.bg-ink .tick li{color:rgba(246,241,231,0.9)}

/* price */
.price-card{background:var(--marble);border:1px solid var(--line-gold);border-radius:4px;padding:44px;max-width:560px;margin:0 auto;text-align:center}
.price-card .amt{font-family:var(--font-display);font-size:60px;font-weight:600;color:var(--ink);line-height:1}
.price-card .amt span{font-family:var(--font-serif);font-size:22px;font-style:italic;color:var(--stone);font-weight:400}
.price-card .tick{text-align:left;max-width:360px;margin:28px auto 30px}

/* quote / testimonial */
.tcard{background:var(--marble);border:1px solid var(--line);border-radius:3px;padding:32px;position:relative}
.tcard .q{width:26px;height:26px;color:var(--gold);opacity:0.5;margin-bottom:14px}
.tcard p{font-family:var(--font-serif);font-size:19px;font-style:italic;color:var(--charcoal);line-height:1.5;margin:0 0 18px}
.tcard .by{font-size:13px;letter-spacing:0.06em;color:var(--stone);text-transform:uppercase}
.ph-note{font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:var(--gold-deep);margin-top:10px;display:inline-block;border:1px dashed var(--line-gold);padding:4px 10px;border-radius:2px}

/* faq */
.faq{border-top:1px solid var(--line)}
.faq-item{border-bottom:1px solid var(--line)}
.faq-q{width:100%;background:none;border:none;text-align:left;display:flex;justify-content:space-between;align-items:center;gap:20px;padding:24px 4px;font-family:var(--font-serif);font-size:21px;color:var(--ink);font-weight:500}
.faq-q svg{width:20px;height:20px;color:var(--gold);flex:none;transition:transform .3s ease}
.faq-q[aria-expanded="true"] svg{transform:rotate(180deg)}
.faq-a{max-height:0;overflow:hidden;transition:max-height .35s ease}
.faq-a.open{max-height:340px}
.faq-a p{padding:0 4px 26px;color:var(--stone);font-size:16px;margin:0;max-width:760px}

/* callout CTA band */
.cband{background:var(--ink);border-radius:4px;padding:64px 44px;text-align:center;position:relative;overflow:hidden}
.cband::after{content:"";position:absolute;inset:0;background:radial-gradient(80% 120% at 50% -20%,rgba(184,150,94,0.16),transparent 60%);pointer-events:none}
.cband > *{position:relative}
.cband h2{color:var(--parchment)}
.cband p{color:rgba(246,241,231,0.8);max-width:520px;margin:0 auto 30px;font-size:17px}

/* contact form */
.form{background:var(--marble);border:1px solid var(--line);border-radius:4px;padding:38px}
.field{margin-bottom:20px}
.field label{display:block;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:var(--gold-deep);margin-bottom:8px;font-weight:600}
.field input,.field select,.field textarea{
  width:100%;font-family:var(--font-body);font-size:15px;color:var(--charcoal);
  background:var(--parchment);border:1px solid var(--line);border-radius:2px;padding:13px 14px;transition:border-color .2s;
}
.field input:focus,.field select:focus,.field textarea:focus{outline:none;border-color:var(--gold)}
.field textarea{resize:vertical;min-height:110px}
.two{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media(max-width:560px){.two{grid-template-columns:1fr}}
.sent{background:var(--parchment-2);border:1px solid var(--line-gold);border-radius:3px;padding:22px;text-align:center}
.sent h3{margin-bottom:6px}
.integ{font-size:12px;color:var(--stone);margin-top:14px;text-align:center;letter-spacing:0.04em}

/* footer */
.foot{background:var(--ink);color:rgba(246,241,231,0.7);padding:64px 0 30px}
.foot .word{font-family:var(--font-display);font-size:20px;letter-spacing:0.14em;color:var(--parchment);text-transform:uppercase}
.foot-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:40px;margin-bottom:44px}
@media(max-width:760px){.foot-grid{grid-template-columns:1fr;gap:30px}}
.foot h4{font-family:var(--font-display);font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:var(--gold);margin:0 0 18px}
.foot a{display:block;color:rgba(246,241,231,0.68);font-size:14px;padding:6px 0;background:none;border:none;text-align:left}
.foot a:hover{color:var(--parchment)}
.foot .bottom{border-top:1px solid rgba(246,241,231,0.14);padding-top:24px;display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;font-size:12.5px;color:rgba(246,241,231,0.5)}

/* two-col about */
.split{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center}
@media(max-width:860px){.split{grid-template-columns:1fr;gap:34px}}
.plate{background:var(--ink);border-radius:4px;padding:44px;color:var(--parchment);position:relative;overflow:hidden}
.plate::after{content:"";position:absolute;inset:0;background:radial-gradient(90% 90% at 90% 0%,rgba(184,150,94,0.18),transparent 55%);pointer-events:none}
.plate > *{position:relative}
.plate .kv{border-top:1px solid rgba(246,241,231,0.16);padding:14px 0;display:flex;justify-content:space-between;gap:20px;font-size:14px}
.plate .kv span:first-child{color:rgba(246,241,231,0.6);letter-spacing:0.04em}
.plate .kv span:last-child{color:var(--parchment);text-align:right;font-weight:500}

/* page entry animation */
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
.page-enter{animation:fadeUp .5s ease both}
@media(prefers-reduced-motion:reduce){
  *{animation:none!important;transition:none!important}
  .card:hover,.topic:hover{transform:none}
}
`;

/* ---------- little building blocks ---------- */
const GLYPH = "M2 2 H18 V18 H6 V6 H14 V14 H10 V10";

function Glyph({ cls = "glyph" }) {
  return (
    <svg className={cls} viewBox="0 0 20 20" aria-hidden="true">
      <path d={GLYPH} />
    </svg>
  );
}

function Rule({ left = false }) {
  return (
    <div className={`rule${left ? " left" : ""}`}>
      <div className="ln" />
      <Glyph />
      <div className="ln" />
    </div>
  );
}

function Eyebrow({ children, dark = false }) {
  return <span className={`eyebrow${dark ? " on-dark" : ""}`}>{children}</span>;
}

function Btn({ children, variant = "primary", onClick, arrow = false, dark = false }) {
  return (
    <button className={`btn btn--${variant}${dark ? " on-dark" : ""}`} onClick={onClick}>
      {children}
      {arrow && <ArrowRight />}
    </button>
  );
}

const NAV = [
  ["tuition", "Tuition"],
  ["topics", "OCR Topics"],
  ["gcse", "GCSE Taster"],
  ["resources", "Resources"],
  ["about", "About"],
  ["safeguarding", "Safeguarding"],
];

function Nav({ page, go }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className="nav">
      <div className="wrap nav-in">
        <button className="logo" onClick={() => { go("home"); setOpen(false); }} aria-label="Clio Academy home">
          <svg className="mark" viewBox="0 0 20 20" aria-hidden="true"><path d={GLYPH} /></svg>
          <span className="word">Clio<small>Academy</small></span>
        </button>
        <div className="nav-links">
          {NAV.map(([k, label]) => (
            <button key={k} className={page === k ? "active" : ""} onClick={() => go(k)}>{label}</button>
          ))}
        </div>
        <div className="nav-cta desktop">
          <Btn variant="gold" onClick={() => go("contact")}>Book a consultation</Btn>
        </div>
        <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="mobile-menu">
          {NAV.map(([k, label]) => (
            <button key={k} onClick={() => { go(k); setOpen(false); }}>{label}</button>
          ))}
          <button className="btn btn--gold mm-cta" onClick={() => { go("contact"); setOpen(false); }}>Book a consultation</button>
        </div>
      )}
    </nav>
  );
}

function Footer({ go }) {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="word">Clio Academy</div>
            <p style={{ marginTop: 16, fontSize: 14, color: "rgba(246,241,231,0.62)", maxWidth: 320 }}>
              Specialist 1:1 online tuition for OCR A Level Ancient History (H407). Greece and Rome, taught by recent top candidates.
            </p>
            <div style={{ marginTop: 18 }}><Rule left /></div>
          </div>
          <div>
            <h4>Explore</h4>
            <button className="" onClick={() => go("tuition")} style={ftLink}>Tuition</button>
            <button onClick={() => go("topics")} style={ftLink}>OCR H407 Topics</button>
            <button onClick={() => go("gcse")} style={ftLink}>GCSE Taster</button>
            <button onClick={() => go("resources")} style={ftLink}>Resources</button>
          </div>
          <div>
            <h4>Academy</h4>
            <button onClick={() => go("about")} style={ftLink}>About</button>
            <button onClick={() => go("safeguarding")} style={ftLink}>Safeguarding & Standards</button>
            <button onClick={() => go("contact")} style={ftLink}>Contact & Booking</button>
          </div>
        </div>
        <div className="bottom">
          <span>© {new Date().getFullYear()} Clio Academy. Independent OCR Ancient History tuition.</span>
          <span>Not affiliated with or endorsed by OCR.</span>
        </div>
      </div>
    </footer>
  );
}
const ftLink = { display: "block", color: "rgba(246,241,231,0.68)", fontSize: 14, padding: "6px 0", background: "none", border: "none", textAlign: "left", cursor: "pointer" };

/* =========================================================
   PAGES
   ========================================================= */

function Home({ go }) {
  return (
    <div className="page-enter" key="home">
      {/* HERO */}
      <header className="hero">
        <div className="wrap col">
          <Eyebrow>OCR A Level Ancient History · H407</Eyebrow>
          <h1 className="display carve">Ancient History,<br />taught to the top.</h1>
          <p className="lede sub">
            Specialist 1:1 online tuition for OCR A Level Ancient History. We focus on Greece and Rome — the
            sources, the essays, and the exam technique that separate an A from an A* — taught by recent top
            candidates who know the paper from the inside.
          </p>
          <div className="cta-row">
            <Btn variant="gold" arrow onClick={() => go("contact")}>Book a consultation</Btn>
            <Btn variant="ghost" onClick={() => go("tuition")}>Explore tuition</Btn>
          </div>
          <div className="hero-foot"><Rule left /></div>
        </div>
      </header>

      {/* CREDIBILITY STRIP */}
      <div className="creds">
        <div className="wrap creds-in">
          {["Harrow School", "Incoming — Dartmouth College", "Top Ancient History Prize", "OCR H407 Specialist"].map((c, i) => (
            <React.Fragment key={c}>
              {i > 0 && <span className="cred-dot" />}
              <span className="cred">{c}</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* PROBLEM */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head center">
            <div className="center" style={{ marginBottom: 26 }}><Rule /></div>
            <Eyebrow>The challenge</Eyebrow>
            <h2 className="serif">A demanding subject, rarely taught in depth</h2>
            <p>
              Few schools offer Ancient History, and fewer still have a specialist to teach it. Bright students are
              often left to master a difficult, source-heavy A Level with thin support and little tailored material.
            </p>
          </div>
          <div className="grid g3">
            {[
              ["Sources, not narration", "Examiners reward candidates who analyse and evaluate ancient evidence in support of an argument. Most lose marks by naming a source and simply retelling the story."],
              ["Argument under pressure", "The papers demand substantiated judgement — a clear line of reasoning held across a timed essay. It is a skill that has to be taught and practised, not assumed."],
              ["Breadth and scarcity", "From Athens to the Julio-Claudians, the content is vast and unfamiliar, and quality resources aimed squarely at the OCR spec are hard to find."],
            ].map(([t, d]) => (
              <div className="card" key={t}>
                <span className="kw">Where marks go</span>
                <h3 className="serif">{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="sec bg-parch2">
        <div className="wrap">
          <div className="split">
            <div>
              <Eyebrow>The Clio approach</Eyebrow>
              <h2 className="serif">Taught by someone who sat the paper — and topped it</h2>
              <p className="muted" style={{ fontSize: 17, marginBottom: 24 }}>
                Clio Academy is near-peer specialist tuition: not a generic tutor, but a recent top candidate who
                understands the OCR exam from the inside and knows exactly where students lose marks — and how to
                win them back.
              </p>
              <ul className="tick">
                {["Content mastery across your Greek and Roman topics",
                  "Source analysis and evaluation, drilled properly",
                  "Essay planning, argument, and substantiated judgement",
                  "Marked written feedback between every lesson",
                  "Exam technique tuned to the H407 mark scheme"].map(li => (
                  <li key={li}><Check />{li}</li>
                ))}
              </ul>
              <div style={{ marginTop: 30 }}><Btn variant="primary" arrow onClick={() => go("tuition")}>How tuition works</Btn></div>
            </div>
            <div className="plate">
              <Eyebrow dark>At a glance</Eyebrow>
              <h3 className="serif" style={{ color: "var(--parchment)", marginBottom: 22 }}>1:1 online tuition</h3>
              <div className="kv"><span>Format</span><span>1:1 live video</span></div>
              <div className="kv"><span>Default session</span><span>Weekly · 60 minutes</span></div>
              <div className="kv"><span>Included</span><span>Marked essay feedback</span></div>
              <div className="kv"><span>Focus</span><span>Greece &amp; Rome (H407)</span></div>
              <div className="kv"><span>Rate</span><span>£60 / hour</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* TOPICS */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head center">
            <Eyebrow>What we teach</Eyebrow>
            <h2 className="serif">Focused on the topics we know best</h2>
            <p>Clio Academy specialises rather than spreading thin. Students are screened for topic fit before booking, so every hour is taught with genuine depth.</p>
          </div>
          <TopicGrid />
          <div className="center" style={{ marginTop: 40 }}>
            <Btn variant="ghost" onClick={() => go("topics")}>See full topic coverage</Btn>
          </div>
        </div>
      </section>

      {/* METHOD */}
      <section className="sec bg-ink">
        <div className="wrap">
          <div className="sec-head">
            <Eyebrow dark>The method</Eyebrow>
            <h2 className="serif">Every lesson, built to move the grade</h2>
            <p>A repeatable structure that turns unfamiliar material into confident, well-argued answers.</p>
          </div>
          <MethodSteps />
        </div>
      </section>

      {/* PRICING */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head center">
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="serif">Premium, specialist tuition</h2>
            <p>One clear rate. No packages you don't need — just focused teaching and real feedback.</p>
          </div>
          <div className="price-card">
            <div className="amt">£60<span> / hour</span></div>
            <ul className="tick">
              {["Weekly 60-minute 1:1 online lessons",
                "Content teaching and exam strategy",
                "Source evaluation and essay technique",
                "Marked written work between sessions",
                "Progress tracked against the mark scheme"].map(li => <li key={li}><Check />{li}</li>)}
            </ul>
            <Btn variant="gold" arrow onClick={() => go("contact")}>Book a consultation</Btn>
            <p className="integ">Lesson packages available on request.</p>
          </div>
        </div>
      </section>

      {/* GCSE */}
      <section className="sec bg-parch2">
        <div className="wrap">
          <div className="split">
            <div className="plate">
              <Eyebrow dark>Considering the subject?</Eyebrow>
              <h3 className="serif" style={{ color: "var(--parchment)", fontSize: 30, marginBottom: 16 }}>GCSE taster sessions</h3>
              <p style={{ color: "rgba(246,241,231,0.82)", fontSize: 16 }}>
                An introduction to Ancient History for GCSE students weighing up their A Level options — a real taste
                of Greece, Rome, ancient sources, and the way historians think.
              </p>
              <div style={{ marginTop: 26 }}><Btn variant="gold" arrow dark onClick={() => go("gcse")}>Explore the taster</Btn></div>
            </div>
            <div>
              <Eyebrow>Is it right for you?</Eyebrow>
              <h2 className="serif">See the subject before you choose it</h2>
              <p className="muted" style={{ fontSize: 17 }}>
                Ancient History is one of the most rewarding A Levels — and one of the least understood at GCSE. A
                taster session shows you what studying it is actually like, honestly and vividly, so you can commit
                with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head center">
            <Eyebrow>In their words</Eyebrow>
            <h2 className="serif">What students and parents say</h2>
          </div>
          <div className="grid g3">
            {[
              ["The difference in her essays after a term was remarkable — she finally understood how to use the sources rather than just describe them.", "Parent of an Upper Sixth student"],
              ["I went from feeling lost with the Julio-Claudians to genuinely enjoying the exam. The feedback on my essays was the thing that changed everything.", "Lower Sixth student"],
              ["Clear, patient, and clearly brilliant on the subject. Worth every penny for a course our school couldn't fully support.", "Parent of an A Level candidate"],
            ].map(([q, by]) => (
              <div className="tcard" key={by}>
                <Quote className="q" />
                <p>{q}</p>
                <span className="by">— {by}</span>
              </div>
            ))}
          </div>
          <div className="center"><span className="ph-note">Sample testimonials — replace with real ones before launch</span></div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec bg-parch2">
        <div className="narrow">
          <div className="sec-head center">
            <Eyebrow>Good questions</Eyebrow>
            <h2 className="serif">Frequently asked</h2>
          </div>
          <FAQ />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="sec-sm">
        <div className="wrap">
          <div className="cband">
            <Eyebrow dark>Begin</Eyebrow>
            <h2 className="serif">Ready to master the ancient world?</h2>
            <p>Book a short consultation to talk through your topics, your goals, and how Clio Academy can help.</p>
            <Btn variant="gold" arrow onClick={() => go("contact")}>Book a consultation</Btn>
          </div>
        </div>
      </section>
    </div>
  );
}

function TopicGrid() {
  const T = [
    ["Greek", "Relations between Greek states", "492–404 BC", "The Persian Wars, the rise of Athenian power, and the descent into the Peloponnesian War — the compulsory Greek period study, taught through its sources."],
    ["Greek", "The Politics and Culture of Athens", "c. 460–399 BC", "Democracy, empire, and Athenian society at its height and its crisis — the depth study that rewards precise use of evidence and scholarship."],
    ["Roman", "The Julio-Claudian Emperors", "31 BC–AD 68", "From Augustus to Nero: power, succession, and the sources that shape how we read the first imperial dynasty — the compulsory Roman period study."],
    ["Roman", "The Flavians", "AD 68–96", "Vespasian, Titus, and Domitian: the rebuilding of Rome after civil war, told through Tacitus, Suetonius, Josephus, and the monuments themselves."],
  ];
  return (
    <div className="grid g2">
      {T.map(([tag, name, dates, d]) => (
        <div className="topic" key={name}>
          <div className="band" />
          <span className="tag">{tag} · OCR H407</span>
          <h3 className="serif">{name}</h3>
          <div className="dates">{dates}</div>
          <p style={{ marginTop: 12 }}>{d}</p>
        </div>
      ))}
    </div>
  );
}

function MethodSteps() {
  const S = [
    ["Content mastery", "We build genuine command of the topic — the events, figures, and context — filling the gaps a stretched school course often leaves."],
    ["Source analysis", "We drill the prescribed sources: what each says, its value and its limitations, and how to weave evaluation into analysis rather than bolting it on."],
    ["Argument & essay", "We turn a question into a clear line of argument with substantiated judgement — the exact quality examiners say is most often missing."],
    ["Timed practice", "We rehearse under exam conditions, so technique holds up against the clock and the pressure of an unseen question."],
    ["Marked feedback", "Written work is marked against the mark scheme between lessons, with specific next steps — the loop that actually raises grades."],
  ];
  return (
    <div>
      {S.map(([t, d], i) => (
        <div className="step" key={t}>
          <div className="num">{String(i + 1).padStart(2, "0")}</div>
          <div>
            <h3 className="serif">{t}</h3>
            <p>{d}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className="faq-q" aria-expanded={open} onClick={() => setOpen(!open)}>
        {q}<ChevronDown />
      </button>
      <div className={`faq-a${open ? " open" : ""}`}><p>{a}</p></div>
    </div>
  );
}

function FAQ() {
  const Q = [
    ["Do you cover the whole OCR Ancient History spec?", "No — deliberately. Clio Academy specialises in a focused set of Greek and Roman topics so that every lesson is taught with real depth. We'll always confirm your exact OCR options before booking, and tell you honestly if we're not the right fit."],
    ["How much does tuition cost?", "£60 per hour, for weekly 60-minute 1:1 online lessons that include content teaching, source and essay technique, exam strategy, and marked written feedback. Lesson packages are available on request."],
    ["Is this for struggling students or top students?", "Both. We help students who find the subject hard to build confidence and structure, and we help strong students push from an A towards an A* through sharper argument and source work."],
    ["Do you mark essays?", "Yes — marked written feedback between lessons is a core part of the service, not an add-on. It's usually the single thing that moves a grade the most."],
    ["Are lessons online?", "Yes. All tuition is delivered 1:1 over live video, with a shared space for sources, essay plans, and marked work."],
    ["Can GCSE students try Ancient History?", "Yes. We offer taster sessions for GCSE students considering the A Level — a genuine introduction to Greece, Rome, and the way the subject is studied."],
    ["How do you handle safeguarding?", "We work professionally with under-18 students: parental consent is required, lessons run through business accounts, and we don't contact students on social media. See our Safeguarding & Standards page for detail."],
    ["How do I book?", "Start with a short consultation. Tell us your year group, school, and OCR topics through the contact page, and we'll arrange a time to talk through how we can help."],
  ];
  return <div className="faq">{Q.map(([q, a]) => <FAQItem key={q} q={q} a={a} />)}</div>;
}

/* ---------- ABOUT ---------- */
function About({ go }) {
  return (
    <div className="page-enter" key="about">
      <PageHead eyebrow="About" title="Scholarship, taught with precision" sub="Why Clio Academy exists, and the person behind it." />
      <section className="sec-sm">
        <div className="narrow">
          <h2 className="serif">A subject that deserves better support</h2>
          <p className="muted" style={{ fontSize: 17 }}>
            Ancient History is one of the most intellectually rich A Levels a student can take — and one of the
            hardest to get real help with. Few schools offer it; fewer have a specialist to teach it well. Good
            tutors are rare, and material built for the OCR specification is scarce. Clio Academy exists to close
            that gap: to give ambitious students the depth, the technique, and the feedback the subject demands.
          </p>

          <div style={{ margin: "44px 0" }}><Rule left /></div>

          <Eyebrow>The near-peer advantage</Eyebrow>
          <h2 className="serif">Taught from inside the exam</h2>
          <p className="muted" style={{ fontSize: 17 }}>
            The tuition is led by a recent top candidate in the subject — someone who sat these exact papers, knows
            precisely where marks are won and lost, and can teach the reasoning behind a top answer rather than just
            the content. That closeness to the exam is the whole point: current, credible, and honest about what
            actually works.
          </p>

          <div className="plate" style={{ margin: "36px 0 44px" }}>
            <Eyebrow dark>Credentials</Eyebrow>
            <div className="kv"><span>School</span><span>Harrow School</span></div>
            <div className="kv"><span>Grade</span><span>Predicted A* (Ancient History)</span></div>
            <div className="kv"><span>Recognition</span><span>Harrow prize — top Ancient History candidate</span></div>
            <div className="kv"><span>Role</span><span>Head of Archaeology</span></div>
            <div className="kv"><span>Writing</span><span>Prize-winning essayist</span></div>
            <div className="kv"><span>Next</span><span>Incoming student, Dartmouth College</span></div>
          </div>

          <Eyebrow>The name</Eyebrow>
          <h2 className="serif">Why "Clio Academy"</h2>
          <p className="muted" style={{ fontSize: 17 }}>
            Clio was the Greek Muse of history — the keeper of record and remembrance. "Academy" recalls the school
            Plato founded outside Athens, and the ideal of structured, serious learning. Together they name what we
            do: history taught with rigour, and with a genuine love of the ancient world.
          </p>

          <div style={{ margin: "44px 0" }}><Rule left /></div>

          <Eyebrow>Teaching philosophy</Eyebrow>
          <h2 className="serif">Argument, sources, precision, judgement</h2>
          <p className="muted" style={{ fontSize: 17 }}>
            Every lesson comes back to four things: a clear argument, evidence used well, precision in how it's
            expressed, and judgement that's earned rather than asserted. Master those, and the grade follows.
          </p>
          <div style={{ marginTop: 30 }}><Btn variant="primary" arrow onClick={() => go("contact")}>Book a consultation</Btn></div>
        </div>
      </section>
    </div>
  );
}

/* ---------- TUITION ---------- */
function Tuition({ go }) {
  return (
    <div className="page-enter" key="tuition">
      <PageHead eyebrow="Tuition" title="1:1 tuition, built around the exam" sub="Focused lessons, real feedback, and a clear path to a better grade." />
      <section className="sec-sm">
        <div className="wrap">
          <div className="split">
            <div>
              <Eyebrow>Who it's for</Eyebrow>
              <h2 className="serif">Lower and Upper Sixth students</h2>
              <p className="muted" style={{ fontSize: 17 }}>
                For any student taking OCR A Level Ancient History who wants specialist support — whether you're
                finding the subject difficult and need structure, or you're strong and pushing for an A*. Lessons are
                tailored to your topics, your school's pace, and your goals.
              </p>
            </div>
            <div className="plate">
              <Eyebrow dark>The essentials</Eyebrow>
              <div className="kv"><span>Format</span><span>1:1 live online video</span></div>
              <div className="kv"><span>Default</span><span>Weekly · 60 minutes</span></div>
              <div className="kv"><span>Rate</span><span>£60 / hour</span></div>
              <div className="kv"><span>Feedback</span><span>Marked work between lessons</span></div>
              <div className="kv"><span>Packages</span><span>Available on request</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec bg-parch2">
        <div className="wrap">
          <div className="sec-head center">
            <Eyebrow>Inside a lesson</Eyebrow>
            <h2 className="serif">What a typical session covers</h2>
          </div>
          <MethodSteps />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="grid g3">
            {[
              ["Source evaluation", "We work through the prescribed ancient sources until you can judge their value and limits and use them as evidence — the skill the mark scheme rewards most."],
              ["Essay planning", "We turn questions into arguments: a thesis, a structure, and a judgement you can defend under timed conditions."],
              ["Exam technique", "We rehearse pace, question choice, and how to answer the specific H407 question types with confidence."],
            ].map(([t, d]) => (
              <div className="card" key={t}><span className="kw">Core skill</span><h3 className="serif">{t}</h3><p>{d}</p></div>
            ))}
          </div>
          <div className="center" style={{ marginTop: 46 }}>
            <div className="price-card">
              <div className="amt">£60<span> / hour</span></div>
              <p className="muted" style={{ margin: "16px 0 24px" }}>Weekly 1:1 online tuition with marked written feedback included.</p>
              <Btn variant="gold" arrow onClick={() => go("contact")}>Book a consultation</Btn>
              <p className="integ">Lesson packages available on request.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- TOPICS ---------- */
function Topics({ go }) {
  return (
    <div className="page-enter" key="topics">
      <PageHead eyebrow="OCR H407" title="Topic coverage" sub="The Greek and Roman options we teach — and why focus is a strength." />
      <section className="sec-sm">
        <div className="wrap">
          <div className="sec-head center">
            <Eyebrow>Greek world</Eyebrow>
            <h2 className="serif">Greece</h2>
          </div>
          <div className="grid g2">
            {[
              ["Relations between Greek states", "492–404 BC", "The compulsory Greek period study: the Persian Wars, the growth of the Athenian empire, and the road to the Peloponnesian War — taught through its literary and material sources."],
              ["The Politics and Culture of Athens", "c. 460–399 BC", "The Athenian depth study: democracy, empire, religion, and society, and the sources and scholarship that let you argue about them with precision."],
            ].map(([n, dt, d]) => (
              <div className="topic" key={n}><div className="band" /><span className="tag">Greek period / depth study</span><h3 className="serif">{n}</h3><div className="dates">{dt}</div><p style={{ marginTop: 12 }}>{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec bg-parch2">
        <div className="wrap">
          <div className="sec-head center">
            <Eyebrow>Roman world</Eyebrow>
            <h2 className="serif">Rome</h2>
          </div>
          <div className="grid g2">
            {[
              ["The Julio-Claudian Emperors", "31 BC–AD 68", "The compulsory Roman period study: Augustus, Tiberius, Gaius, Claudius, and Nero — power and succession read through Tacitus, Suetonius, and Cassius Dio."],
              ["The Flavians", "AD 68–96", "The Roman depth study: Vespasian, Titus, and Domitian, and the rebuilding of Rome after civil war — told through the historians and the monuments alike."],
            ].map(([n, dt, d]) => (
              <div className="topic" key={n}><div className="band" /><span className="tag">Roman period / depth study</span><h3 className="serif">{n}</h3><div className="dates">{dt}</div><p style={{ marginTop: 12 }}>{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="narrow center">
          <Eyebrow>Why specialise</Eyebrow>
          <h2 className="serif">Depth beats breadth</h2>
          <p className="muted" style={{ fontSize: 17 }}>
            OCR Ancient History offers several routes, and no single tutor can teach every one of them brilliantly.
            Clio Academy chooses depth: we teach the topics we know inside out, so your hours are spent with someone
            who truly commands the material. Before you book, we'll confirm your exact OCR options and only take you
            on if we're the right fit — because your grade matters more than our booking.
          </p>
          <div style={{ marginTop: 30 }}><Btn variant="primary" arrow onClick={() => go("contact")}>Check your topic fit</Btn></div>
        </div>
      </section>
    </div>
  );
}

/* ---------- GCSE ---------- */
function Gcse({ go }) {
  return (
    <div className="page-enter" key="gcse">
      <PageHead eyebrow="GCSE Taster" title="Discover Ancient History" sub="For GCSE students weighing up their A Level choices." />
      <section className="sec-sm">
        <div className="narrow">
          <h2 className="serif">See what the subject is really like</h2>
          <p className="muted" style={{ fontSize: 17 }}>
            Choosing A Levels is hard when you've never studied a subject before. A taster session gives GCSE
            students a genuine introduction to Ancient History — the world of Greece and Rome, the thrill of reading
            ancient sources, and the way historians build arguments about the distant past. Exciting, but honest:
            you'll leave knowing whether it's the right subject for you.
          </p>
          <div style={{ margin: "40px 0" }}><Rule left /></div>
          <div className="grid g2">
            {[
              ["Greece & Rome", "A vivid tour of the periods you'd study — from Athenian democracy to the emperors of Rome."],
              ["Ancient sources", "Try reading a real ancient source the way an A Level student does, and see how much it reveals."],
              ["Thinking like a historian", "A first taste of argument, evidence, and judgement — the heart of the A Level."],
              ["An honest picture", "What the course involves, how it's assessed, and what makes it rewarding and demanding."],
            ].map(([t, d]) => (
              <div className="card" key={t}><span className="kw">In the taster</span><h3 className="serif">{t}</h3><p>{d}</p></div>
            ))}
          </div>
          <div style={{ marginTop: 40 }}><Btn variant="gold" arrow onClick={() => go("contact")}>Enquire about a taster</Btn></div>
        </div>
      </section>
    </div>
  );
}

/* ---------- RESOURCES ---------- */
function Resources({ go }) {
  return (
    <div className="page-enter" key="resources">
      <PageHead eyebrow="Resources" title="A growing library, built for H407" sub="Specialist material designed around the OCR Ancient History specification." />
      <section className="sec-sm">
        <div className="wrap">
          <div className="sec-head center">
            <p className="muted" style={{ fontSize: 17 }}>
              We're building a library of resources aimed squarely at the OCR spec. Materials below are in
              development — students of Clio Academy will receive them as part of their tuition.
            </p>
          </div>
          <div className="grid g3">
            {[
              ["Source booklets", "The prescribed ancient sources, gathered by topic with guided evaluation."],
              ["Model essays", "Annotated top-band answers that show why they score — not just what to write."],
              ["Essay planning guides", "Frameworks for turning any question into a clear, argued response."],
              ["Timelines", "Clear chronologies for each period, from the Persian Wars to the Flavians."],
              ["Knowledge organisers", "Concise, high-yield notes for revision and quick reference."],
              ["Exam technique guides", "How to read, choose, and answer each H407 question type under time."],
            ].map(([t, d]) => (
              <div className="card" key={t}>
                <span className="kw" style={{ color: "var(--gold-deep)" }}>Coming soon</span>
                <h3 className="serif">{t}</h3><p>{d}</p>
              </div>
            ))}
          </div>
          <div className="center" style={{ marginTop: 42 }}>
            <span className="ph-note">Resource downloads to be added · available to enrolled students</span>
            <div style={{ marginTop: 26 }}><Btn variant="ghost" onClick={() => go("contact")}>Ask about student resources</Btn></div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- SAFEGUARDING ---------- */
function Safeguarding() {
  return (
    <div className="page-enter" key="safeguarding">
      <PageHead eyebrow="Safeguarding & Standards" title="A safe, professional space to learn" sub="How Clio Academy works with students under 18." />
      <section className="sec-sm">
        <div className="narrow">
          <p className="muted" style={{ fontSize: 17 }}>
            Clio Academy works with young people, and their safety and wellbeing come first. We hold ourselves to
            clear professional standards, and we're always happy to talk parents through them before any lessons
            begin.
          </p>
          <div style={{ margin: "36px 0 8px" }}><Rule left /></div>
          <ul className="tick" style={{ marginTop: 24 }}>
            {[
              "We work professionally with students under 18, with a parent or guardian involved throughout.",
              "Parental consent is required before tuition begins.",
              "Lessons are conducted through business accounts on established video platforms — never personal ones.",
              "We do not contact students through social media or private messaging.",
              "Communication and scheduling follow clear, agreed norms, with parents kept informed.",
              "Student information is handled carefully and privately, in line with data-protection good practice.",
            ].map(li => <li key={li} style={{ fontSize: 16.5 }}><Check />{li}</li>)}
          </ul>

          <div className="plate" style={{ margin: "40px 0" }}>
            <Eyebrow dark>In place / on request</Eyebrow>
            <h3 className="serif" style={{ color: "var(--parchment)", marginBottom: 14 }}>Policies &amp; checks</h3>
            <p style={{ color: "rgba(246,241,231,0.82)", fontSize: 15.5 }}>
              A written safeguarding policy is available to parents on request. Background (DBS) and safeguarding
              checks are being arranged in line with current official guidance for those working with children, and
              we're glad to confirm their status with families directly.
            </p>
          </div>

          <p className="muted" style={{ fontSize: 14 }}>
            This page describes our commitments and practice. It is not legal advice, and specific arrangements are
            confirmed with each family before tuition begins.
          </p>
        </div>
      </section>
    </div>
  );
}

/* ---------- CONTACT ---------- */
function Contact() {
  const [f, setF] = useState({ name: "", email: "", role: "Parent", year: "Lower Sixth", school: "", topics: "", concerns: "", time: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  return (
    <div className="page-enter" key="contact">
      <PageHead eyebrow="Contact & Booking" title="Book a consultation" sub="Tell us about the student, and we'll arrange a time to talk." />
      <section className="sec-sm">
        <div className="wrap">
          <div className="split" style={{ alignItems: "flex-start" }}>
            <div>
              <Eyebrow>What happens next</Eyebrow>
              <h2 className="serif">A short, no-pressure conversation</h2>
              <p className="muted" style={{ fontSize: 17 }}>
                Share a few details and we'll be in touch to arrange a consultation. We'll confirm your OCR topics,
                talk through where you'd like to improve, and agree how tuition could work — before you commit to
                anything.
              </p>
              <ul className="tick" style={{ marginTop: 20 }}>
                {["We confirm your exact OCR options and fit",
                  "We agree goals, cadence, and timing",
                  "You decide whether to go ahead"].map(li => <li key={li}><Check />{li}</li>)}
              </ul>
              <div style={{ marginTop: 28 }}>
                <p className="muted" style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 10 }}><Calendar size={16} style={{ color: "var(--gold)" }} /> Scheduling via Calendly — to be connected.</p>
                <p className="muted" style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 10 }}><Mail size={16} style={{ color: "var(--gold)" }} /> Payments via Stripe — to be connected.</p>
              </div>
            </div>

            <div className="form">
              {sent ? (
                <div className="sent">
                  <h3 className="serif">Thank you</h3>
                  <p className="muted" style={{ margin: 0 }}>Your details have been captured. Once the booking system is connected, enquiries will arrive by email and you'll be offered consultation times.</p>
                  <div style={{ marginTop: 18 }}><Btn variant="ghost" onClick={() => setSent(false)}>Send another</Btn></div>
                </div>
              ) : (
                <div>
                  <div className="two">
                    <div className="field"><label>Name</label><input value={f.name} onChange={set("name")} placeholder="Your name" /></div>
                    <div className="field"><label>Email</label><input value={f.email} onChange={set("email")} placeholder="you@email.com" /></div>
                  </div>
                  <div className="two">
                    <div className="field"><label>You are a</label>
                      <select value={f.role} onChange={set("role")}><option>Parent</option><option>Student</option><option>Other</option></select>
                    </div>
                    <div className="field"><label>Year group</label>
                      <select value={f.year} onChange={set("year")}><option>Lower Sixth</option><option>Upper Sixth</option><option>GCSE (taster)</option><option>Other</option></select>
                    </div>
                  </div>
                  <div className="field"><label>School</label><input value={f.school} onChange={set("school")} placeholder="School name" /></div>
                  <div className="field"><label>OCR topics studied</label><input value={f.topics} onChange={set("topics")} placeholder="e.g. Athens · The Julio-Claudians" /></div>
                  <div className="field"><label>Current concerns / goals</label><textarea value={f.concerns} onChange={set("concerns")} placeholder="What would you like to improve?" /></div>
                  <div className="field"><label>Preferred session time</label><input value={f.time} onChange={set("time")} placeholder="e.g. weekday evenings" /></div>
                  <button className="btn btn--gold" style={{ width: "100%", justifyContent: "center" }} onClick={() => setSent(true)}>Request a consultation<ArrowRight /></button>
                  <p className="integ">This preview stores nothing. Connect Calendly, Stripe, or an email handler before launch.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* shared page header */
function PageHead({ eyebrow, title, sub }) {
  return (
    <header className="hero" style={{ padding: "84px 0 66px" }}>
      <div className="wrap">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="display carve" style={{ fontSize: "clamp(34px,5vw,58px)" }}>{title}</h1>
        {sub && <p className="lede" style={{ marginTop: 20, maxWidth: 640 }}>{sub}</p>}
        <div style={{ marginTop: 34 }}><Rule left /></div>
      </div>
    </header>
  );
}

/* =========================================================
   APP
   ========================================================= */
export default function App() {
  const [page, setPage] = useState("home");
  const go = (p) => setPage(p);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [page]);

  const pages = {
    home: <Home go={go} />,
    about: <About go={go} />,
    tuition: <Tuition go={go} />,
    topics: <Topics go={go} />,
    gcse: <Gcse go={go} />,
    resources: <Resources go={go} />,
    safeguarding: <Safeguarding />,
    contact: <Contact />,
  };

  return (
    <div className="ca-root">
      <style>{STYLES}</style>
      <Nav page={page} go={go} />
      {pages[page]}
      <Footer go={go} />
    </div>
  );
}
