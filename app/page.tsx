"use client";

import { useMemo, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Banknote,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  FileCheck2,
  FileText,
  Heart,
  HeartHandshake,
  LockKeyhole,
  Menu,
  Plus,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  Users,
  X,
  Zap,
} from "lucide-react";

type Category = "All bills" | "Medical" | "Housing" | "Utilities" | "Education";
type Bill = {
  id: number;
  category: Exclude<Category, "All bills">;
  title: string;
  detail: string;
  amount: number;
  funded: number;
  due: string;
  initials: string;
  color: string;
  urgent?: boolean;
};

const initialBills: Bill[] = [
  { id: 1, category: "Medical", title: "A little more time to heal", detail: "Hospital treatment · Recipient anonymous", amount: 48000, funded: 31200, due: "Due in 2 days", initials: "M", color: "rose", urgent: true },
  { id: 2, category: "Education", title: "Keep a student in class", detail: "Semester fees · Recipient anonymous", amount: 24000, funded: 14400, due: "Due in 8 days", initials: "S", color: "blue" },
  { id: 3, category: "Utilities", title: "Keep the lights on", detail: "Electricity bill · Recipient anonymous", amount: 3250, funded: 1300, due: "Due tomorrow", initials: "A", color: "gold", urgent: true },
  { id: 4, category: "Housing", title: "A little breathing room", detail: "Rent arrears · Recipient anonymous", amount: 18000, funded: 9000, due: "Due in 5 days", initials: "R", color: "green" },
];

const categories: Category[] = ["All bills", "Medical", "Housing", "Utilities", "Education"];
const money = (value: number) => "₹" + value.toLocaleString("en-IN");

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>("All bills");
  const [fundedBills, setFundedBills] = useState<number[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const uploadRef = useRef<HTMLInputElement>(null);

  const bills = useMemo(
    () => initialBills.filter((bill) => activeCategory === "All bills" || bill.category === activeCategory),
    [activeCategory]
  );

  function fundBill(id: number) {
    setFundedBills((current) => current.includes(id) ? current : [...current, id]);
  }

  function handleFile(file?: File) {
    if (!file) return;
    setFileName(file.name);
    setSubmitted(false);
  }

  return (
    <main>
      <div className="announcement">
        <span className="announcement-dot" />
        Every bill tells a story. Every act of help changes one.
        <a href="#how-it-works">See how it works <ArrowUpRight size={13} /></a>
      </div>

      <header className="site-header">
        <a className="brand" href="#" aria-label="Bailout home">
          <span className="brand-mark"><HeartHandshake size={23} strokeWidth={2.1} /></span>
          <span className="brand-name">bailout<span>.</span></span>
        </a>
        <nav className={mobileMenu ? "nav-links nav-open" : "nav-links"}>
          <a href="#explore" onClick={() => setMobileMenu(false)}>Explore bills</a>
          <a href="#how-it-works" onClick={() => setMobileMenu(false)}>How it works</a>
          <a href="#impact" onClick={() => setMobileMenu(false)}>Our impact</a>
        </nav>
        <div className="header-actions">
          <button className="button button-quiet sign-in" onClick={() => document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" })}>Sign in</button>
          <button className="button button-dark header-cta" onClick={() => { setShowUpload(true); setSubmitted(false); }}>Request help <ArrowRight size={15} /></button>
        </div>
        <button className="mobile-toggle" aria-label="Toggle menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X /> : <Menu />}</button>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> HELP, WITHOUT THE HOOPS</div>
          <h1>Your bills.<br />A little less <span className="serif-accent">heavy.</span></h1>
          <p className="hero-description">Life happens. A medical bill, a rent payment, a semester fee. We connect real people with people who can help — one verified bill at a time.</p>
          <div className="hero-actions">
            <button className="button button-dark button-large" onClick={() => { setShowUpload(true); setSubmitted(false); }}>I need a hand <ArrowRight size={17} /></button>
            <a className="text-link" href="#explore">I want to help <ArrowDownRight size={17} /></a>
          </div>
          <div className="trust-row">
            <div className="trust-icon"><ShieldCheck size={17} /></div>
            <span>Verified bills. Direct payments. <strong>Your dignity, always.</strong></span>
          </div>
        </div>
        <div className="hero-art" aria-label="Illustration of a bill being supported">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="floating-note note-top"><span className="note-check"><Check size={13} /></span><span><strong>Bill verified</strong><small>Checked and confirmed</small></span></div>
          <div className="bill-illustration">
            <div className="bill-topline"><span className="mini-brand"><HeartHandshake size={17} /></span><span className="bill-tag"><span /> VERIFIED</span></div>
            <p className="bill-kicker">ELECTRICITY · APRIL</p>
            <p className="bill-title">Your monthly<br />essentials.</p>
            <div className="bill-rule" />
            <div className="bill-line"><span>Amount due</span><strong>₹3,250</strong></div>
            <div className="bill-line muted-line"><span>Due date</span><span>Tomorrow</span></div>
            <div className="bill-progress"><span /></div>
            <div className="bill-progress-label"><span>40% covered</span><span>₹1,300 of ₹3,250</span></div>
          </div>
          <div className="floating-note note-bottom"><span className="note-heart"><Heart size={15} fill="currentColor" /></span><span><strong>A bill cleared.</strong><small>A little more breathing room.</small></span></div>
          <div className="art-spark spark-one"><Sparkles size={23} /></div>
          <div className="art-spark spark-two"><Plus size={20} /></div>
          <div className="art-caption">Small act. Real relief.</div>
        </div>
        <div className="hero-bottom">
          <span>BUILT ON TRUST, NOT TEARS</span>
          <div><LockKeyhole size={13} /> Private by default</div>
          <div><BadgeCheck size={14} /> Verification first</div>
          <div><Banknote size={14} /> Pay providers directly</div>
        </div>
      </section>

      <section className="impact-strip" id="impact">
        <div className="impact-intro"><span className="section-kicker">THE BIG PICTURE</span><p>Help should feel<br />human. <em>And work.</em></p></div>
        <div className="impact-stat"><span className="stat-label">Example bills in this demo</span><strong>04</strong><span className="stat-foot"><span className="stat-dot green-dot" /> Sample requests</span></div>
        <div className="impact-stat"><span className="stat-label">Illustrative funding pool</span><strong>₹1.2L</strong><span className="stat-foot">Demo figures only</span></div>
        <div className="impact-note"><div className="impact-note-icon"><Zap size={18} /></div><p><strong>Help that lands where it matters.</strong><br />Contributions are designed to go to the bill provider, not through the recipient.</p></div>
      </section>

      <section className="explore-section" id="explore">
        <div className="section-heading">
          <div><span className="section-kicker">A LITTLE HELP GOES A LONG WAY</span><h2>Make room for <em>better days.</em></h2><p>Every request here is a chance to make a tangible difference.</p></div>
          <button className="button button-outline desktop-submit" onClick={() => { setShowUpload(true); setSubmitted(false); }}><Plus size={16} /> Submit a bill</button>
        </div>
        <div className="market-toolbar">
          <div className="category-tabs" role="tablist" aria-label="Filter bills">
            {categories.map((category) => <button key={category} role="tab" aria-selected={activeCategory === category} className={activeCategory === category ? "category-tab active" : "category-tab"} onClick={() => setActiveCategory(category)}>{category}</button>)}
          </div>
          <button className="sort-button" onClick={() => setShowAll(!showAll)}>{showAll ? "Show featured" : "Recently added"} <ChevronDown size={15} /></button>
        </div>
        <div className="bill-grid">
          {(showAll ? [...bills].reverse() : bills).map((bill) => {
            const funded = bill.funded + (fundedBills.includes(bill.id) ? Math.min(1000, bill.amount - bill.funded) : 0);
            const percent = Math.min(100, Math.round((funded / bill.amount) * 100));
            return <article className="request-card" key={bill.id}>
              <div className={"card-art card-art-" + bill.color}>
                <div className="card-art-top"><span className="category-pill">{bill.category}</span>{bill.urgent && <span className="urgent-pill"><Clock3 size={11} /> Time-sensitive</span>}</div>
                <div className="card-art-symbol">{bill.category === "Medical" ? <Heart size={31} /> : bill.category === "Education" ? <Sparkles size={31} /> : bill.category === "Utilities" ? <Zap size={31} /> : <Users size={31} />}</div>
                <span className="card-art-label">{bill.category === "Medical" ? "CARE, WHEN IT COUNTS" : bill.category === "Education" ? "A FUTURE IN REACH" : bill.category === "Utilities" ? "KEEP THE LIGHTS ON" : "ROOM TO BREATHE"}</span>
              </div>
              <div className="request-content">
                <div className="verified-line"><BadgeCheck size={14} /> DEMO REQUEST <span>·</span> <span className="privacy-label"><LockKeyhole size={11} /> Private</span></div>
                <h3>{bill.title}</h3>
                <p className="request-detail">{bill.detail}</p>
                <div className="request-amount"><div><span>Still needed</span><strong>{money(Math.max(0, bill.amount - funded))}</strong></div><span className="total-amount">of {money(bill.amount)}</span></div>
                <div className="funding-track"><span style={{ width: percent + "%" }} /></div>
                <div className="funding-meta"><span>{percent}% funded</span><span>{bill.due}</span></div>
                <button className={fundedBills.includes(bill.id) ? "button fund-button funded-button" : "button fund-button"} onClick={() => fundBill(bill.id)}>{fundedBills.includes(bill.id) ? <><Check size={15} /> Demo contribution added</> : <>Help clear this bill <ArrowRight size={15} /></>}</button>
                {fundedBills.includes(bill.id) && <p className="demo-notice">Demo only — no payment was made.</p>}
              </div>
            </article>;
          })}
        </div>
        <div className="browse-foot"><span>Showing illustrative requests, not real recipients.</span><button className="text-link" onClick={() => { setActiveCategory("All bills"); setShowAll(!showAll); }}>{showAll ? "Back to featured" : "Explore all requests"} <ArrowRight size={15} /></button></div>
      </section>

      <section className="how-section" id="how-it-works">
        <div className="how-heading"><span className="section-kicker">SIMPLE BY DESIGN</span><h2>Three steps.<br /><em>A world of difference.</em></h2><p>No public sob stories. No popularity contest. Just real bills, checked properly, and help that reaches the right place.</p></div>
        <div className="steps">
          <div className="step-card"><div className="step-number">01 <FileText size={18} /></div><div className="step-icon step-icon-peach"><UploadCloud size={23} /></div><h3>Share the bill</h3><p>Upload a bill privately. Choose what, if anything, you want the public to know about you.</p><span className="step-foot"><LockKeyhole size={13} /> Your documents stay private</span></div>
          <div className="step-card"><div className="step-number">02 <FileCheck2 size={18} /></div><div className="step-icon step-icon-blue"><ShieldCheck size={23} /></div><h3>We check it</h3><p>Authenticity, amount due, and duplicate checks come first. Our goal is to protect everyone involved.</p><span className="step-foot"><BadgeCheck size={13} /> Verification before funding</span></div>
          <div className="step-card"><div className="step-number">03 <HeartHandshake size={18} /></div><div className="step-icon step-icon-green"><Banknote size={23} /></div><h3>A bill gets cleared</h3><p>A supporter funds the request. The intended model pays the provider and confirms the settlement.</p><span className="step-foot"><Check size={13} /> Proof when payment lands</span></div>
        </div>
      </section>

      <section className="closing-cta">
        <div className="closing-decoration decoration-left"><Sparkles size={25} /></div>
        <div><span className="section-kicker">A BETTER KIND OF BAILOUT</span><h2>There is power in<br /><em>showing up.</em></h2><p>One bill can change someone's whole week. Sometimes, their whole life.</p><div className="closing-actions"><button className="button button-light button-large" onClick={() => { setShowUpload(true); setSubmitted(false); }}>Request help <ArrowRight size={16} /></button><a href="#explore" className="closing-link">Browse bills <ArrowUpRight size={15} /></a></div></div>
        <div className="closing-decoration decoration-right"><HeartHandshake size={55} /></div>
      </section>

      <footer className="footer">
        <div className="footer-main"><a className="brand footer-brand" href="#"><span className="brand-mark"><HeartHandshake size={21} /></span><span className="brand-name">bailout<span>.</span></span></a><p>Making essential bills a little less heavy.<br />Built on dignity, transparency, and trust.</p></div>
        <div className="footer-links"><div><strong>Explore</strong><a href="#explore">Browse bills</a><a href="#how-it-works">How it works</a><a href="#impact">Our impact</a></div><div><strong>Our promise</strong><a href="#how-it-works">Privacy first</a><a href="#how-it-works">Verification</a><a href="mailto:hello@bailout.example">Contact</a></div></div>
        <div className="footer-bottom"><span>© 2026 Bailout. A concept built around real-world relief.</span><span><LockKeyhole size={12} /> Your story is yours to tell.</span></div>
      </footer>

      {showUpload && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowUpload(false); }}>
        <section className="upload-modal" role="dialog" aria-modal="true" aria-labelledby="upload-title">
          <button className="modal-close" aria-label="Close" onClick={() => setShowUpload(false)}><X size={19} /></button>
          {!submitted ? <>
            <div className="modal-icon"><HeartHandshake size={25} /></div>
            <span className="section-kicker">A PRIVATE FIRST STEP</span>
            <h2 id="upload-title">Let's take one<br /><em>thing off your plate.</em></h2>
            <p className="modal-description">Start with the bill. This demo lets you preview the request flow — it won't upload documents to a server or initiate payments.</p>
            <label className="field-label" htmlFor="bill-category">What kind of bill is it?</label>
            <select id="bill-category" className="form-field" defaultValue=""><option value="" disabled>Select a category</option><option>Medical</option><option>Housing / rent</option><option>Utilities</option><option>Education</option><option>Other essential bill</option></select>
            <label className="field-label" htmlFor="bill-amount">Amount due (₹)</label>
            <input id="bill-amount" className="form-field" type="number" min="1" placeholder="e.g. 4500" />
            <label className="field-label">Bill document <span className="optional-label">Optional for this demo</span></label>
            <button className="file-drop" onClick={() => uploadRef.current?.click()}><UploadCloud size={22} /><strong>{fileName || "Choose a bill or invoice"}</strong><span>PDF, JPG or PNG · Demo only</span></button>
            <input ref={uploadRef} type="file" accept=".pdf,.jpg,.jpeg,.png,image/*" hidden onChange={(event) => handleFile(event.target.files?.[0])} />
            <div className="privacy-assurance"><LockKeyhole size={15} /><span>Your bill should never be public by default. This prototype does not transmit your file.</span></div>
            <button className="button button-dark modal-submit" onClick={() => setSubmitted(true)}>Preview my request <ArrowRight size={16} /></button>
          </> : <div className="success-state"><div className="success-icon"><Check size={28} /></div><span className="section-kicker">DEMO PREVIEW</span><h2 id="upload-title">Your first step<br /><em>starts here.</em></h2><p>This is a prototype, so your request hasn't been sent and no verification or payment has occurred. In the live product, a secure review process would come next.</p><div className="preview-summary"><FileCheck2 size={19} /><span><strong>{fileName || "Bill details captured for preview"}</strong><small>Local demo state only · Nothing uploaded</small></span></div><button className="button button-dark modal-submit" onClick={() => { setShowUpload(false); setFileName(""); setSubmitted(false); }}>Done <Check size={16} /></button></div>}
          <div className="modal-help"><CircleHelp size={13} /> Need urgent help? A live service and support process would be provided at launch.</div>
        </section>
      </div>}
    </main>
  );
}