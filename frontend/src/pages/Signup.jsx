import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../services/auth";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#060810;--s1:#0c0f1c;--s2:#111528;--s3:#171d35;
  --border:#1e2540;--border2:#2a3360;
  --gold:#f5c842;--teal:#2affd4;--blue:#4a8fff;
  --red:#ff5252;--green:#3dffa0;
  --text:#eef0ff;--muted:#6070a8;--muted2:#8899cc;
  --font:'Outfit',sans-serif;--mono:'JetBrains Mono',monospace;
}
body{background:var(--bg);color:var(--text);font-family:var(--font);min-height:100vh;display:flex;flex-direction:column}
body::before{
  content:'';position:fixed;inset:0;
  background-image:linear-gradient(rgba(74,143,255,.025) 1px,transparent 1px),
    linear-gradient(90deg,rgba(74,143,255,.025) 1px,transparent 1px);
  background-size:44px 44px;pointer-events:none;z-index:0
}
.orb{position:fixed;border-radius:50%;filter:blur(110px);pointer-events:none;z-index:0;opacity:.4}
.orb1{width:400px;height:400px;background:rgba(192,132,252,.12);top:-100px;left:-60px}
.orb2{width:450px;height:450px;background:rgba(42,255,212,.1);bottom:-80px;right:-80px}

/* ── NAV ── */
.nav{position:relative;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:22px 40px;
  border-bottom:1px solid rgba(30,37,64,.5)}
.nav-logo{display:flex;align-items:center;gap:10px;text-decoration:none}
.nav-logo-icon{width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,#3a6fff,#5a30ff);
  display:flex;align-items:center;justify-content:center;font-size:.85rem;font-weight:800;color:#fff}
.nav-logo-text{font-size:1rem;font-weight:800;letter-spacing:-.5px;
  background:linear-gradient(135deg,#eef0ff,#6080ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

/* ── LAYOUT ── */
.auth-wrap{flex:1;display:flex;align-items:center;justify-content:center;padding:40px 20px;position:relative;z-index:1;
  background:radial-gradient(ellipse 70% 60% at 50% 40%,rgba(192,132,252,.06),transparent)}
.auth-box{width:100%;max-width:440px}

/* ── CARD ── */
.card{background:var(--s1);border:1px solid var(--border);border-radius:20px;padding:40px;
  box-shadow:0 40px 120px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.04)}

/* ── HEADER ── */
.card-eyebrow{font-family:var(--mono);font-size:.58rem;letter-spacing:3px;text-transform:uppercase;color:#c084fc;
  background:rgba(192,132,252,.06);border:1px solid rgba(192,132,252,.2);border-radius:99px;
  padding:5px 16px;display:inline-block;margin-bottom:20px}
.card-title{font-size:1.9rem;font-weight:800;letter-spacing:-1.5px;margin-bottom:8px;
  background:linear-gradient(135deg,#eef0ff 30%,#8899cc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.card-sub{color:var(--muted2);font-size:.9rem;margin-bottom:32px;line-height:1.5}

/* ── PERKS ── */
.perks{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:28px}
.perk{font-family:var(--mono);font-size:.6rem;letter-spacing:1px;text-transform:uppercase;
  padding:5px 14px;border-radius:99px;display:flex;align-items:center;gap:6px}
.perk.green{background:rgba(61,255,160,.07);border:1px solid rgba(61,255,160,.2);color:var(--green)}
.perk.blue{background:rgba(74,143,255,.07);border:1px solid rgba(74,143,255,.2);color:var(--blue)}
.perk.gold{background:rgba(245,200,66,.07);border:1px solid rgba(245,200,66,.2);color:var(--gold)}

/* ── FORM ── */
.field{margin-bottom:18px}
.field-label{font-family:var(--mono);font-size:.6rem;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:8px;display:block}
.field-wrap{position:relative}
.field-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:1rem;pointer-events:none;color:var(--muted)}
input[type=email],input[type=password],input[type=text]{
  width:100%;background:var(--bg);border:1px solid var(--border);border-radius:10px;
  color:var(--text);font-family:var(--font);font-size:.95rem;padding:13px 14px 13px 42px;
  outline:none;transition:border-color .2s,box-shadow .2s;
}
input:focus{border-color:#c084fc;box-shadow:0 0 0 3px rgba(192,132,252,.1)}
input::placeholder{color:var(--muted)}

/* password strength */
.strength-wrap{margin-top:8px}
.strength-bars{display:flex;gap:4px;margin-bottom:4px}
.strength-bar{flex:1;height:3px;border-radius:99px;background:var(--border);transition:background .3s}
.strength-label{font-family:var(--mono);font-size:.58rem;color:var(--muted);letter-spacing:.5px}

/* ── BUTTON ── */
.btn-primary{
  width:100%;margin-top:24px;padding:15px;
  background:linear-gradient(135deg,#7c3aed,#5a30ff);color:#fff;border:none;border-radius:10px;
  font-family:var(--font);font-weight:700;font-size:1rem;letter-spacing:.3px;cursor:pointer;
  box-shadow:0 8px 32px rgba(124,58,237,.35);transition:transform .15s,box-shadow .15s,opacity .15s;
  display:flex;align-items:center;justify-content:center;gap:10px;position:relative;overflow:hidden
}
.btn-primary::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.08),transparent)}
.btn-primary:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 14px 44px rgba(124,58,237,.5)}
.btn-primary:disabled{opacity:.4;cursor:not-allowed;transform:none}

/* ── FEEDBACK ── */
.err-box{background:rgba(255,82,82,.07);border:1px solid rgba(255,82,82,.25);border-radius:10px;
  padding:12px 16px;color:var(--red);font-family:var(--mono);font-size:.76rem;margin-top:14px;display:flex;align-items:flex-start;gap:10px}
.success-box{background:rgba(61,255,160,.06);border:1px solid rgba(61,255,160,.22);border-radius:10px;
  padding:12px 16px;color:var(--green);font-family:var(--mono);font-size:.76rem;margin-top:14px;display:flex;align-items:center;gap:10px}
.terms{font-size:.78rem;color:var(--muted);text-align:center;margin-top:18px;line-height:1.5}

@keyframes spin{to{transform:rotate(360deg)}}
.spinner{width:16px;height:16px;border:2px solid rgba(255,255,255,.25);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite;flex-shrink:0}

/* ── DIVIDER ── */
.divider{display:flex;align-items:center;gap:14px;margin:28px 0}
.div-line{flex:1;height:1px;background:var(--border)}
.div-text{font-family:var(--mono);font-size:.6rem;color:var(--muted);letter-spacing:1px;text-transform:uppercase;white-space:nowrap}

.login-prompt{text-align:center;font-size:.88rem;color:var(--muted2);margin-top:24px}
.login-prompt a{color:#c084fc;text-decoration:none;font-weight:600;transition:color .2s}
.login-prompt a:hover{color:var(--teal)}

@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.auth-box{animation:fadeUp .5s ease both}
`;

function getStrength(pw) {
    if (!pw) return { level: 0, label: "" };
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    const labels = ["", "Weak", "Fair", "Good", "Strong"];
    const colors = ["", "var(--red)", "var(--gold)", "var(--blue)", "var(--green)"];
    return { level: score, label: labels[score], color: colors[score] };
}

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const strength = getStrength(password);

    const handleSignup = async () => {
        setLoading(true);
        setError(null);
        try {
            await signup(email, password);
            setSuccess(true);
            alert("Account Created");
            navigate("/login");
        } catch (err) {
            navigate("/signup");
            setError(err.message || "Sign up failed. Please try again.");
            alert(err.message);
            console.log("Hi");
            console.log(err);
            console.log(err.code);
            console.log(err.message);
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <style>{CSS}</style>
            <div className="orb orb1" />
            <div className="orb orb2" />

            {/* NAV */}
            <nav className="nav">
                <Link to="/" className="nav-logo">
                    <div className="nav-logo-icon">CC</div>
                    <span className="nav-logo-text">CareerCompass</span>
                </Link>
            </nav>

            {/* MAIN */}
            <div className="auth-wrap">
                <div className="auth-box">
                    <div className="card">
                        <div className="card-eyebrow">Get Started Free</div>
                        <div className="card-title">Create your account</div>
                        <div className="card-sub">Start your career intelligence journey today.</div>

                        {/* Perks */}
                        <div className="perks">
                            <span className="perk green">✓ Free forever</span>
                            <span className="perk blue">✓ AI-powered</span>
                            <span className="perk gold">✓ Instant results</span>
                        </div>

                        <form onSubmit={e => e.preventDefault()}>
                            <div className="field">
                                <label className="field-label">Email Address</label>
                                <div className="field-wrap">
                                    <span className="field-icon">✉</span>
                                    <input
                                        type="email"
                                        value={email}
                                        placeholder="you@example.com"
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete="email"
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="field-label">Password</label>
                                <div className="field-wrap">
                                    <span className="field-icon">🔒</span>
                                    <input
                                        type="password"
                                        value={password}
                                        placeholder="Create a strong password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete="new-password"
                                    />
                                </div>
                                {password && (
                                    <div className="strength-wrap">
                                        <div className="strength-bars">
                                            {[1, 2, 3, 4].map(i => (
                                                <div
                                                    key={i}
                                                    className="strength-bar"
                                                    style={{ background: i <= strength.level ? strength.color : undefined }}
                                                />
                                            ))}
                                        </div>
                                        <span className="strength-label" style={{ color: strength.color }}>
                                            {strength.label}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <button
                                type="button"
                                className="btn-primary"
                                onClick={handleSignup}
                                disabled={loading || !email.trim() || !password.trim()}
                            >
                                {loading && <span className="spinner" />}
                                {loading ? "Creating account…" : "Create Account →"}
                            </button>
                        </form>

                        {error && (
                            <div className="err-box">
                                <span>⚠</span>
                                <span>{error}</span>
                            </div>
                        )}
                        {success && (
                            <div className="success-box">
                                <span>✓</span>
                                <span>Account created! Redirecting to login…</span>
                            </div>
                        )}

                        <p className="terms">
                            By signing up you agree to our Terms of Service and Privacy Policy.
                        </p>

                        <div className="divider">
                            <div className="div-line" />
                            <span className="div-text">Already have an account?</span>
                            <div className="div-line" />
                        </div>

                        <div className="login-prompt">
                            <Link to="/login">Sign in instead →</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}