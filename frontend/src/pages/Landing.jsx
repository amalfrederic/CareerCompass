import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#060810;--s1:#0c0f1c;--s2:#111528;--s3:#171d35;
  --border:#1e2540;--border2:#2a3360;
  --gold:#f5c842;--gold2:#ffd96e;--teal:#2affd4;--blue:#4a8fff;
  --red:#ff5252;--green:#3dffa0;--orange:#ff9f43;--purple:#c084fc;
  --text:#eef0ff;--muted:#6070a8;--muted2:#8899cc;
  --r:14px;--font:'Outfit',sans-serif;--mono:'JetBrains Mono',monospace;
}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:var(--font);min-height:100vh;overflow-x:hidden}

/* animated grid bg */
body::before{
  content:'';position:fixed;inset:0;
  background-image:linear-gradient(rgba(74,143,255,.03) 1px,transparent 1px),
    linear-gradient(90deg,rgba(74,143,255,.03) 1px,transparent 1px);
  background-size:44px 44px;pointer-events:none;z-index:0;
  animation:gridDrift 20s linear infinite;
}
@keyframes gridDrift{from{background-position:0 0}to{background-position:44px 44px}}

/* floating orbs */
.orb{position:fixed;border-radius:50%;filter:blur(100px);pointer-events:none;z-index:0;opacity:.55;animation:orbFloat 8s ease-in-out infinite alternate}
.orb1{width:520px;height:520px;background:rgba(74,143,255,.18);top:-160px;right:-100px;animation-duration:9s}
.orb2{width:400px;height:400px;background:rgba(42,255,212,.12);bottom:-80px;left:-80px;animation-duration:11s;animation-delay:2s}
.orb3{width:280px;height:280px;background:rgba(192,132,252,.1);top:40%;left:40%;animation-duration:7s;animation-delay:1s}
@keyframes orbFloat{from{transform:translate(0,0) scale(1)}to{transform:translate(30px,-40px) scale(1.07)}}

.page{position:relative;z-index:1}

/* ── NAV ── */
.nav{display:flex;align-items:center;justify-content:space-between;padding:24px 48px;position:sticky;top:0;z-index:100;
  background:rgba(6,8,16,.8);backdrop-filter:blur(18px);border-bottom:1px solid rgba(30,37,64,.5)}
.nav-logo{display:flex;align-items:center;gap:10px}
.nav-logo-icon{width:34px;height:34px;border-radius:8px;background:linear-gradient(135deg,#3a6fff,#5a30ff);display:flex;align-items:center;justify-content:center;font-size:.95rem;font-weight:800;color:#fff;flex-shrink:0;box-shadow:0 4px 16px rgba(58,111,255,.35)}
.nav-logo-text{font-size:1.15rem;font-weight:800;letter-spacing:-.5px;
  background:linear-gradient(135deg,#eef0ff,#6080ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.nav-links{display:flex;align-items:center;gap:8px}
.nav-btn{font-family:var(--font);font-size:.88rem;font-weight:600;padding:9px 22px;border-radius:8px;cursor:pointer;transition:all .18s;border:1px solid transparent;text-decoration:none;display:inline-block}
.nav-btn.ghost{background:transparent;border-color:var(--border2);color:var(--muted2)}
.nav-btn.ghost:hover{background:var(--s2);border-color:var(--border);color:var(--text)}
.nav-btn.solid{background:linear-gradient(135deg,#3a6fff,#5a30ff);color:#fff;border-color:transparent;box-shadow:0 4px 18px rgba(58,111,255,.3)}
.nav-btn.solid:hover{transform:translateY(-1px);box-shadow:0 8px 28px rgba(58,111,255,.45)}

/* ── HERO ── */
.hero{min-height:calc(100vh - 77px);display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:60px 24px 80px;text-align:center;
  background:radial-gradient(ellipse 90% 60% at 50% -5%,rgba(74,143,255,.08) 0%,transparent 65%)}
.hero-eyebrow{font-family:var(--mono);font-size:.62rem;letter-spacing:3px;text-transform:uppercase;color:var(--teal);
  border:1px solid rgba(42,255,212,.22);border-radius:99px;padding:6px 20px;margin-bottom:28px;
  background:rgba(42,255,212,.05);display:inline-block;
  animation:fadeUp .6s ease both}
.hero h1{font-size:clamp(3rem,8vw,6rem);font-weight:800;letter-spacing:-4px;line-height:.9;margin-bottom:20px;
  animation:fadeUp .6s ease .1s both}
.hero h1 .w1{background:linear-gradient(135deg,#eef0ff 40%,#8899cc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero h1 .w2{background:linear-gradient(135deg,var(--gold),var(--gold2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero h1 .w3{background:linear-gradient(135deg,var(--teal),var(--blue));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-sub{color:var(--muted2);font-size:1.1rem;line-height:1.7;max-width:500px;margin:0 auto 48px;animation:fadeUp .6s ease .2s both}
.hero-cta{display:flex;align-items:center;gap:12px;justify-content:center;flex-wrap:wrap;animation:fadeUp .6s ease .3s both}
.cta-btn{font-family:var(--font);font-size:1rem;font-weight:700;padding:15px 36px;border-radius:10px;cursor:pointer;transition:all .18s;border:none;text-decoration:none;display:inline-block}
.cta-primary{background:linear-gradient(135deg,#3a6fff,#5a30ff);color:#fff;box-shadow:0 8px 32px rgba(58,111,255,.35)}
.cta-primary:hover{transform:translateY(-2px);box-shadow:0 14px 44px rgba(58,111,255,.55)}
.cta-secondary{background:transparent;border:1px solid var(--border2);color:var(--muted2)}
.cta-secondary:hover{background:var(--s2);border-color:var(--border);color:var(--text)}

/* trust strip */
.trust-strip{display:flex;align-items:center;gap:24px;justify-content:center;margin-top:56px;flex-wrap:wrap;animation:fadeUp .6s ease .45s both}
.trust-item{display:flex;align-items:center;gap:8px;font-family:var(--mono);font-size:.65rem;color:var(--muted);letter-spacing:1px;text-transform:uppercase}
.trust-dot{width:6px;height:6px;border-radius:50%}

/* ── FEATURES ── */
.section{padding:96px 24px}
.section-inner{max-width:1120px;margin:0 auto}
.section-tag{font-family:var(--mono);font-size:.62rem;letter-spacing:3px;text-transform:uppercase;color:var(--blue);
  background:rgba(74,143,255,.08);border:1px solid rgba(74,143,255,.2);border-radius:99px;padding:5px 16px;margin-bottom:20px;display:inline-block}
.section-title{font-size:clamp(2rem,5vw,3.2rem);font-weight:800;letter-spacing:-2px;line-height:1;margin-bottom:16px;
  background:linear-gradient(135deg,#eef0ff 40%,#6080ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.section-sub{color:var(--muted2);font-size:1rem;line-height:1.7;max-width:460px}

.feat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px;margin-top:56px}
.feat-card{background:var(--s1);border:1px solid var(--border);border-radius:18px;padding:28px;
  position:relative;overflow:hidden;transition:border-color .25s,transform .25s;cursor:default}
.feat-card:hover{border-color:var(--border2);transform:translateY(-4px)}
.feat-card::before{content:'';position:absolute;inset:0;opacity:0;transition:opacity .3s;border-radius:18px}
.feat-card:hover::before{opacity:1}
.feat-card.c-blue:hover::before{background:radial-gradient(circle at 30% 20%,rgba(74,143,255,.06),transparent 60%)}
.feat-card.c-teal:hover::before{background:radial-gradient(circle at 30% 20%,rgba(42,255,212,.06),transparent 60%)}
.feat-card.c-gold:hover::before{background:radial-gradient(circle at 30% 20%,rgba(245,200,66,.06),transparent 60%)}
.feat-card.c-green:hover::before{background:radial-gradient(circle at 30% 20%,rgba(61,255,160,.06),transparent 60%)}
.feat-card.c-purple:hover::before{background:radial-gradient(circle at 30% 20%,rgba(192,132,252,.06),transparent 60%)}
.feat-card.c-orange:hover::before{background:radial-gradient(circle at 30% 20%,rgba(255,159,67,.06),transparent 60%)}
.feat-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.4rem;margin-bottom:20px;flex-shrink:0}
.feat-icon.blue{background:rgba(74,143,255,.1);border:1px solid rgba(74,143,255,.2)}
.feat-icon.teal{background:rgba(42,255,212,.08);border:1px solid rgba(42,255,212,.18)}
.feat-icon.gold{background:rgba(245,200,66,.08);border:1px solid rgba(245,200,66,.2)}
.feat-icon.green{background:rgba(61,255,160,.08);border:1px solid rgba(61,255,160,.18)}
.feat-icon.purple{background:rgba(192,132,252,.08);border:1px solid rgba(192,132,252,.18)}
.feat-icon.orange{background:rgba(255,159,67,.08);border:1px solid rgba(255,159,67,.2)}
.feat-title{font-size:1.05rem;font-weight:700;margin-bottom:8px;letter-spacing:-.3px}
.feat-desc{color:var(--muted2);font-size:.88rem;line-height:1.65}
.feat-tag{display:inline-block;margin-top:16px;font-family:var(--mono);font-size:.6rem;letter-spacing:1.5px;text-transform:uppercase;padding:4px 12px;border-radius:99px}
.feat-tag.blue{background:rgba(74,143,255,.08);border:1px solid rgba(74,143,255,.2);color:var(--blue)}
.feat-tag.teal{background:rgba(42,255,212,.06);border:1px solid rgba(42,255,212,.18);color:var(--teal)}
.feat-tag.gold{background:rgba(245,200,66,.07);border:1px solid rgba(245,200,66,.2);color:var(--gold)}
.feat-tag.green{background:rgba(61,255,160,.07);border:1px solid rgba(61,255,160,.18);color:var(--green)}
.feat-tag.purple{background:rgba(192,132,252,.07);border:1px solid rgba(192,132,252,.18);color:var(--purple)}
.feat-tag.orange{background:rgba(255,159,67,.07);border:1px solid rgba(255,159,67,.2);color:var(--orange)}

/* ── HOW IT WORKS ── */
.how-section{padding:96px 24px;background:radial-gradient(ellipse 70% 50% at 50% 50%,rgba(74,143,255,.05),transparent)}
.steps{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:0;margin-top:56px;position:relative}
.steps::before{content:'';position:absolute;top:36px;left:calc(12.5% + 20px);right:calc(12.5% + 20px);height:1px;
  background:linear-gradient(90deg,transparent,var(--border2),var(--border2),transparent);pointer-events:none}
@media(max-width:900px){.steps::before{display:none}}
.step{text-align:center;padding:0 20px 40px;position:relative}
.step-num{width:72px;height:72px;border-radius:50%;background:var(--s2);border:1px solid var(--border);
  display:flex;align-items:center;justify-content:center;margin:0 auto 24px;
  font-size:1.5rem;font-weight:800;letter-spacing:-1px;position:relative;z-index:1;transition:all .25s}
.step:hover .step-num{border-color:var(--blue);box-shadow:0 0 0 8px rgba(74,143,255,.08)}
.step-n1 .step-num{color:var(--blue)}
.step-n2 .step-num{color:var(--teal)}
.step-n3 .step-num{color:var(--gold)}
.step-n4 .step-num{color:var(--green)}
.step-title{font-size:1rem;font-weight:700;margin-bottom:8px}
.step-desc{color:var(--muted2);font-size:.85rem;line-height:1.6}

/* ── STATS ── */
.stats-section{padding:80px 24px;border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
.stats-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1px;background:var(--border);border:1px solid var(--border);border-radius:18px;overflow:hidden;max-width:900px;margin:0 auto}
.stat-item{background:var(--s1);padding:36px 28px;text-align:center}
.stat-val{font-size:2.8rem;font-weight:800;letter-spacing:-2px;line-height:1;margin-bottom:6px}
.stat-lbl{font-family:var(--mono);font-size:.6rem;letter-spacing:2px;text-transform:uppercase;color:var(--muted)}

/* ── CTA SECTION ── */
.cta-section{padding:100px 24px;text-align:center;
  background:radial-gradient(ellipse 70% 60% at 50% 50%,rgba(58,111,255,.08),transparent)}
.cta-card{max-width:680px;margin:0 auto;background:var(--s1);border:1px solid var(--border);border-radius:24px;padding:56px 40px;
  box-shadow:0 40px 120px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.04)}
.cta-card h2{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;letter-spacing:-2px;line-height:1.05;margin-bottom:16px;
  background:linear-gradient(135deg,#eef0ff 30%,#6080ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.cta-card p{color:var(--muted2);font-size:1rem;line-height:1.6;margin-bottom:36px}
.cta-btns{display:flex;align-items:center;gap:12px;justify-content:center;flex-wrap:wrap}

/* ── FOOTER ── */
.footer{padding:32px 48px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px}
.footer-copy{font-family:var(--mono);font-size:.65rem;color:var(--muted);letter-spacing:1px}
.footer-logo{font-size:.88rem;font-weight:800;letter-spacing:-.3px;
  background:linear-gradient(135deg,#eef0ff,#6080ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

/* ── ANIMATIONS ── */
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
.reveal{opacity:0;transform:translateY(28px);transition:opacity .65s ease,transform .65s ease}
.reveal.in{opacity:1;transform:translateY(0)}
.reveal.d1{transition-delay:.1s}.reveal.d2{transition-delay:.2s}.reveal.d3{transition-delay:.3s}
.reveal.d4{transition-delay:.4s}.reveal.d5{transition-delay:.5s}.reveal.d6{transition-delay:.6s}

/* ── COUNTER ANIMATION ── */
@keyframes countUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}

@media(max-width:640px){
  .nav{padding:18px 20px}
  .section{padding:64px 20px}
  .cta-card{padding:40px 24px}
  .footer{padding:24px 20px}
}
`;

const FEATURES = [
    { icon: "🔍", color: "blue", tag: "AI Analysis", title: "Intelligent Resume Parsing", desc: "Our AI extracts your skills, experience, and strengths from raw resume text — no formatting required." },
    { icon: "🎯", color: "teal", tag: "Gap Detection", title: "Precise Skill Gap Report", desc: "Know exactly which skills are missing for your target role, classified by core, important, and optional priority." },
    { icon: "🗺️", color: "gold", tag: "Roadmap", title: "Personalised Learning Path", desc: "Step-by-step learning roadmap with hands-on projects to bridge your skill gaps as efficiently as possible." },
    { icon: "📊", color: "green", tag: "Analytics", title: "Role Match Radar", desc: "Visualise how you compare across multiple roles simultaneously with interactive radar and bar charts." },
    { icon: "💰", color: "orange", tag: "Salary Intel", title: "Salary Benchmarking", desc: "Get estimated salary ranges for your target role and alternative roles you can target right now." },
    { icon: "🚀", color: "purple", tag: "Alternatives", title: "Better-Fit Role Discovery", desc: "Discover roles that match your current skill set so you can start applying immediately while you upskill." },
];

const STEPS = [
    { n: "01", title: "Paste Your Resume", desc: "Drop your resume text into the analyzer — plain text works perfectly." },
    { n: "02", title: "Choose Target Role", desc: "Type the role you're aiming for. Be specific — 'ML Engineer', 'Frontend Developer', etc." },
    { n: "03", title: "Run AI Analysis", desc: "Our model cross-references your skills against real role requirements in seconds." },
    { n: "04", title: "Get Your Roadmap", desc: "Receive a complete gap report, learning path, salary data and role alternatives." },
];

const STATS = [
    { val: "50+", label: "Roles Mapped", col: "var(--blue)" },
    { val: "95%", label: "Accuracy Rate", col: "var(--green)" },
    { val: "<5s", label: "Analysis Time", col: "var(--teal)" },
    { val: "Free", label: "To Get Started", col: "var(--gold)" },
];

function Landing() {
    const revealRefs = useRef([]);

    useEffect(() => {
        const obs = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); }),
            { threshold: 0.12 }
        );
        revealRefs.current.forEach(el => el && obs.observe(el));
        return () => obs.disconnect();
    }, []);

    const addRef = el => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el); };

    return (
        <>
            <style>{CSS}</style>
            <div className="page">
                <div className="orb orb1" />
                <div className="orb orb2" />
                <div className="orb orb3" />

                {/* NAV */}
                <nav className="nav">
                    <div className="nav-logo">
                        <div className="nav-logo-icon">CC</div>
                        <span className="nav-logo-text">CareerCompass</span>
                    </div>
                    <div className="nav-links">
                        <Link to="/login"><button className="nav-btn ghost">Login</button></Link>
                        <Link to="/signup"><button className="nav-btn solid">Get Started →</button></Link>
                    </div>
                </nav>

                {/* HERO */}
                <section className="hero">
                    <div className="hero-eyebrow">AI-Powered Career Intelligence</div>
                    <h1>
                        <span className="w1">Navigate</span><br />
                        <span className="w2">Your Career</span><br />
                        <span className="w3">With Clarity</span>
                    </h1>
                    <p className="hero-sub">
                        Paste your resume, pick a target role — get a full skill gap report, personalised roadmap, and salary insight in seconds.
                    </p>
                    <div className="hero-cta">
                        <Link to="/signup"><button className="cta-btn cta-primary">Start Free Analysis →</button></Link>
                        <Link to="/login"><button className="cta-btn cta-secondary">Sign In</button></Link>
                    </div>
                    <div className="trust-strip">
                        {[
                            { dot: "var(--green)", text: "AI-Powered" },
                            { dot: "var(--teal)", text: "50+ Roles" },
                            { dot: "var(--blue)", text: "Instant Results" },
                            { dot: "var(--gold)", text: "Free to Use" },
                        ].map(({ dot, text }) => (
                            <div key={text} className="trust-item">
                                <div className="trust-dot" style={{ background: dot }} />
                                {text}
                            </div>
                        ))}
                    </div>
                </section>

                {/* STATS */}
                <div className="stats-section">
                    <div className="stats-grid">
                        {STATS.map(({ val, label, col }, i) => (
                            <div key={label} className="stat-item" ref={addRef} style={{ transitionDelay: `${i * 0.1}s` }}>
                                <div className="stat-val" style={{ color: col }}>{val}</div>
                                <div className="stat-lbl">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FEATURES */}
                <section className="section">
                    <div className="section-inner">
                        <div style={{ textAlign: "center", marginBottom: 8 }}>
                            <span className="section-tag">Features</span>
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <h2 className="section-title">Everything you need to<br />accelerate your career</h2>
                            <p className="section-sub" style={{ margin: "0 auto" }}>
                                CareerCompass gives you an unfair advantage — real data, real insights, real roadmaps.
                            </p>
                        </div>
                        <div className="feat-grid">
                            {FEATURES.map(({ icon, color, tag, title, desc }, i) => (
                                <div key={title} className={`feat-card c-${color} reveal d${(i % 3) + 1}`} ref={addRef}>
                                    <div className={`feat-icon ${color}`}>{icon}</div>
                                    <div className="feat-title">{title}</div>
                                    <div className="feat-desc">{desc}</div>
                                    <span className={`feat-tag ${color}`}>{tag}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* HOW IT WORKS */}
                <div className="how-section">
                    <div className="section-inner">
                        <div style={{ textAlign: "center", marginBottom: 8 }}>
                            <span className="section-tag">How It Works</span>
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <h2 className="section-title">Four steps to clarity</h2>
                            <p className="section-sub" style={{ margin: "0 auto" }}>From resume to roadmap in under a minute.</p>
                        </div>
                        <div className="steps">
                            {STEPS.map(({ n, title, desc }, i) => (
                                <div key={n} className={`step step-n${i + 1} reveal d${i + 1}`} ref={addRef}>
                                    <div className="step-num">{n}</div>
                                    <div className="step-title">{title}</div>
                                    <div className="step-desc">{desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <section className="cta-section">
                    <div className="cta-card reveal" ref={addRef}>
                        <span className="section-tag" style={{ marginBottom: 24 }}>Ready to start?</span>
                        <h2>Your career roadmap<br />is one click away</h2>
                        <p>Join thousands of professionals who used CareerCompass to land their dream role.</p>
                        <div className="cta-btns">
                            <Link to="/signup"><button className="cta-btn cta-primary">Create Free Account →</button></Link>
                            <Link to="/login"><button className="cta-btn cta-secondary">Already have an account?</button></Link>
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="footer">
                    <span className="footer-logo">CareerCompass</span>
                    <span className="footer-copy">© 2025 CareerCompass — AI-Powered Career Intelligence</span>
                </footer>
            </div>
        </>
    );
}

export default Landing;