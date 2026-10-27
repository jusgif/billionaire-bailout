"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
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
  color: string;
  urgent?: boolean;
};

const initialBills: Bill[] = [
  { id: 1, category: "Medical", title: "A little more time to heal", detail: "Hospital treatment · Recipient anonymous", amount: 48000, funded: 31200, due: "Due in 2 days", color: "rose", urgent: true },
  { id: 2, category: "Education", title: "Keep a student in class", detail: "Semester fees · Recipient anonymous", amount: 24000, funded: 14400, due: "Due in 8 days", color: "blue" },
  { id: 3, category: "Utilities", title: "Keep the lights on", detail: "Electricity bill · Recipient anonymous", amount: 3250, funded: 1300, due: "Due tomorrow", color: "gold", urgent: true },
  { id: 4, category: "Housing", title: "A little breathing room", detail: "Rent arrears · Recipient anonymous", amount: 18000, funded: 9000, due: "Due in 5 days", color: "green" },
];

const categories: Category[] = ["All bills", "Medical", "Housing", "Utilities", "Education"];
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set(["application/pdf", "image/jpeg", "image/png"]);
const money = (value: number) => "₹" + value.toLocaleString("en-IN");

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>("All bills");
  const [fundedBills, setFundedBills] = useState<number[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [billCategory, setBillCategory] = useState("");
  const [billAmount, setBillAmount] = useState("");
  const [fileName, setFileName] = useState("");
  const [formError, setFormError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const uploadRef = useRef<HTMLInputElement>(null);

  const bills = useMemo(
    () => initialBills.filter((bill) => activeCategory === "All bills" || bill.category === activeCategory),
    [activeCategory]
  );

  function closeUploadModal() {
    setShowUpload(false);
    setSubmitted(false);
    setBillCategory("");
    setBillAmount("");
    setFileName("");
    setFormError("");
    if (uploadRef.current) uploadRef.current.value = "";
  }

  useEffect(() => {
    if (!showUpload) return;
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") closeUploadModal(); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showUpload]);

  function fundBill(id: number) {
    setFundedBills((current) => current.includes(id) ? current : [...current, id]);
  }

  function handleFile(file?: File) {
    if (!file) return;
    if (!ALLOWED_MIME_TYPES.has(file.type) || file.size > MAX_FILE_BYTES) {
      setFormError("Please select a PDF, JPG, or PNG file under 10 MB.");
      if (uploadRef.current) uploadRef.current.value = "";
      return;
    }
    setFormError("");
    setFileName(file.name);
    setSubmitted(false);
  }

  function handlePreviewSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsedAmount = Number(billAmount);
    if (!billCategory) { setFormError("Please select a bill category."); return; }
    if (!Number.isFinite(parsedAmount) || parsedAmount < 1) { setFormError("Please enter a valid bill amount of at least ₹1."); return; }
    setFormError("");
    setSubmitted(true);
  }

  return (
    <main className="page-wrapper">
      <div className="announcement">
        <span className="announcement-dot" />
        Every bill tells a story. Every act of help changes one.
        <a href="#how-it-works">See how it works <ArrowUpRight size={13} /></a>
      </div>

      <header className="site-header">
        <div className="brand">
          <div className="brand-icon"><Heart size={18} /></div>
          <span>Billionaire Bailout</span>
        </div>
        <nav className={`nav ${mobileMenu ? "open" : ""}`}>
          <a href="#bills">Explore bills</a>
          <a href="#how-it-works">How it works</a>
          <a href="#trust">Trust & safety</a>
        </nav>
        <div className="header-actions">
          <button type="button" className="button button-outline" onClick={() => setShowUpload(true)}>Request a bailout</button>
          <button type="button" className="button button-dark" onClick={() => setShowUpload(true)}>Submit a bill</button>
        </div>
        <button className="mobile-toggle" aria-label="Toggle menu" aria-expanded={mobileMenu} onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X /> : <Menu />}</button>
      </header>

      <section className="hero">
        <div className="hero-badge"><Sparkles size={14} /> Direct peer-to-peer relief</div>
        <h1>Ordinary bills.<br /><em>Extraordinary relief.</em></h1>
        <p className="hero-copy">Connect directly with real people who need help paying essential medical, utility, housing, or education bills — verified, transparent, and direct.</p>
        <div className="hero-ctas">
          <a href="#bills" className="button button-dark button-lg">Explore open bills <ArrowDownRight size={16} /></a>
          <button type="button" className="button button-outline button-lg" onClick={() => setShowUpload(true)}>Submit your bill</button>
        </div>
        <div className="hero-trust-bar">
          <div><ShieldCheck size={16} /> Direct payment flow</div>
          <div><BadgeCheck size={16} /> Verified documentation</div>
          <div><Zap size={16} /> Instant impact</div>
        </div>
      </section>

      <section className="stats-strip">
        <div className="stat-card">
          <span className="stat-value">₹5.2M+</span>
          <span className="stat-label">Bills cleared together</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">1,420+</span>
          <span className="stat-label">Families supported</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">100%</span>
          <span className="stat-label">Direct relief efficiency</span>
        </div>
      </section>

      <section id="bills" className="section">
        <div className="section-header">
          <div>
            <span className="section-kicker">ACTIVE REQUESTS</span>
            <h2>Open bills ready for backing</h2>
          </div>
          <p>Browse active requests or filter by category to find a bill you want to help resolve.</p>
        </div>

        <div className="category-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`pill ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="bills-grid">
          {bills.map((bill) => {
            const isFunded = fundedBills.includes(bill.id);
            const effectiveFunded = isFunded ? bill.amount : bill.funded;
            const progress = Math.min(100, Math.round((effectiveFunded / bill.amount) * 100));

            return (
              <article key={bill.id} className={`bill-card ${bill.urgent ? "urgent" : ""}`}>
                <div className="card-top">
                  <span className={`category-tag ${bill.color}`}>{bill.category}</span>
                  <span className="due-tag"><Clock3 size={12} /> {bill.due}</span>
                </div>
                <h3>{bill.title}</h3>
                <p>{bill.detail}</p>
                <div className="amount-row">
                  <div>
                    <span className="amount-label">Target</span>
                    <span className="amount-value">{money(bill.amount)}</span>
                  </div>
                  <div>
                    <span className="amount-label">Funded</span>
                    <span className="amount-value accent">{money(effectiveFunded)}</span>
                  </div>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <div className="card-footer">
                  <span className="progress-text">{progress}% funded</span>
                  <button
                    className={`button ${isFunded ? "button-success" : "button-dark"} button-sm`}
                    onClick={() => fundBill(bill.id)}
                  >
                    {isFunded ? <><Check size={14} /> Backed</> : "Clear this bill"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="how-it-works" className="section alt-bg">
        <div className="section-header">
          <div>
            <span className="section-kicker">SIMPLE & DIRECT</span>
            <h2>How Billionaire Bailout works</h2>
          </div>
        </div>
        <div className="steps-grid">
          <div className="step-card">
            <span className="step-num">01</span>
            <h3>Upload your bill</h3>
            <p>Submit an essential bill with proof of amount due to start a request for support.</p>
          </div>
          <div className="step-card">
            <span className="step-num">02</span>
            <h3>Community review</h3>
            <p>Supporters view requests and contribute directly toward individual bills.</p>
          </div>
          <div className="step-card">
            <span className="step-num">03</span>
            <h3>Direct payment</h3>
            <p>Funds clear the bill directly, relieving immediate financial burden.</p>
          </div>
        </div>
      </section>

      {showUpload && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeUploadModal(); }}>
        <section className="upload-modal" role="dialog" aria-modal="true" aria-labelledby="upload-title">
          <button type="button" className="modal-close" aria-label="Close" onClick={closeUploadModal}><X size={19} /></button>
          {!submitted ? <form onSubmit={handlePreviewSubmit} noValidate>
            <div className="modal-icon"><HeartHandshake size={25} /></div>
            <span className="section-kicker">A PRIVATE FIRST STEP</span>
            <h2 id="upload-title">Let&apos;s take one<br /><em>thing off your plate.</em></h2>
            <p className="modal-description">Start with the bill. This demo lets you preview the request flow — it won&apos;t upload documents to a server or initiate payments.</p>
            <label className="field-label" htmlFor="bill-category">What kind of bill is it?</label>
            <select id="bill-category" className="form-field" value={billCategory} onChange={(e) => setBillCategory(e.target.value)} required><option value="" disabled>Select a category</option><option value="Medical">Medical</option><option value="Housing / rent">Housing / rent</option><option value="Utilities">Utilities</option><option value="Education">Education</option><option value="Other essential bill">Other essential bill</option></select>
            <label className="field-label" htmlFor="bill-amount">Amount due (₹)</label>
            <input id="bill-amount" className="form-field" type="number" min="1" placeholder="e.g. 4500" value={billAmount} onChange={(e) => setBillAmount(e.target.value)} required />
            <label className="field-label">Bill document <span className="optional-label">Optional for this demo</span></label>
            <button type="button" className="file-drop" onClick={() => uploadRef.current?.click()}><UploadCloud size={22} /> <strong>{fileName || "Choose a bill or invoice"}</strong><span>PDF, JPG or PNG (max 10 MB) · Demo only</span></button>
            <input ref={uploadRef} type="file" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" hidden onChange={(event) => handleFile(event.target.files?.[0])} />
            {formError && <p role="alert" style={{ color: "#b42318", fontSize: "12px", marginTop: "8px", fontWeight: 500 }}>{formError}</p>}
            <div className="privacy-assurance"><LockKeyhole size={15} /><span>Your bill should never be public by default. This prototype does not transmit your file.</span></div>
            <button type="submit" className="button button-dark modal-submit">Preview my request <ArrowRight size={16} /></button>
          </form> : <div className="success-state"><div className="success-icon"><Check size={28} /></div><span className="section-kicker">DEMO PREVIEW</span><h2 id="upload-title">Your first step<br /><em>starts here.</em></h2><p>This is a prototype, so your request hasn&apos;t been sent and no verification or payment has occurred. In the live product, a secure review process would come next.</p><div className="preview-summary"><FileCheck2 size={19} /><span><strong>{billCategory} · {money(Number(billAmount))}</strong><small>{fileName ? `${fileName} · ` : ""}Local demo state only · Nothing uploaded</small></span></div><button type="button" className="button button-dark modal-submit" onClick={closeUploadModal}>Done <Check size={16} /></button></div>}
          <div className="modal-help"><CircleHelp size={13} /> Need urgent help? A live service and support process would be provided at launch.</div>
        </section>
      </div>}
    </main>
  );
}
