import { useState } from "react";
import { login } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";

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
.orb1{width:450px;height:450px;background:rgba(74,143,255,.15);top:-120px;right:-80px}
.orb2{width:350px;height:350px;background:rgba(42,255,212,.1);bottom:-60px;left:-60px}

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
  background:radial-gradient(ellipse 70% 60% at 50% 40%,rgba(74,143,255,.07),transparent)}
.auth-box{width:100%;max-width:440px}

/* ── CARD ── */
.card{background:var(--s1);border:1px solid var(--border);border-radius:20px;padding:40px;
  box-shadow:0 40px 120px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.04)}

/* ── HEADER ── */
.card-eyebrow{font-family:var(--mono);font-size:.58rem;letter-spacing:3px;text-transform:uppercase;color:var(--teal);
  background:rgba(42,255,212,.06);border:1px solid rgba(42,255,212,.2);border-radius:99px;
  padding:5px 16px;display:inline-block;margin-bottom:20px}
.card-title{font-size:1.9rem;font-weight:800;letter-spacing:-1.5px;margin-bottom:8px;
  background:linear-gradient(135deg,#eef0ff 30%,#8899cc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.card-sub{color:var(--muted2);font-size:.9rem;margin-bottom:32px;line-height:1.5}

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
input:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(74,143,255,.1)}
input::placeholder{color:var(--muted)}

.forgot{display:block;text-align:right;margin-top:6px;font-family:var(--mono);font-size:.65rem;color:var(--muted);
  text-decoration:none;letter-spacing:.5px;transition:color .2s}
.forgot:hover{color:var(--blue)}

/* ── BUTTON ── */
.btn-primary{
  width:100%;margin-top:24px;padding:15px;
  background:linear-gradient(135deg,#3a6fff,#5a30ff);color:#fff;border:none;border-radius:10px;
  font-family:var(--font);font-weight:700;font-size:1rem;letter-spacing:.3px;cursor:pointer;
  box-shadow:0 8px 32px rgba(58,111,255,.35);transition:transform .15s,box-shadow .15s,opacity .15s;
  display:flex;align-items:center;justify-content:center;gap:10px;position:relative;overflow:hidden
}
.btn-primary::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.08),transparent)}
.btn-primary:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 14px 44px rgba(58,111,255,.5)}
.btn-primary:disabled{opacity:.4;cursor:not-allowed;transform:none}

/* ── FEEDBACK ── */
.err-box{background:rgba(255,82,82,.07);border:1px solid rgba(255,82,82,.25);border-radius:10px;
  padding:12px 16px;color:var(--red);font-family:var(--mono);font-size:.76rem;margin-top:14px;display:flex;align-items:center;gap:10px}
.success-box{background:rgba(61,255,160,.06);border:1px solid rgba(61,255,160,.22);border-radius:10px;
  padding:12px 16px;color:var(--green);font-family:var(--mono);font-size:.76rem;margin-top:14px;display:flex;align-items:center;gap:10px}

@keyframes spin{to{transform:rotate(360deg)}}
.spinner{width:16px;height:16px;border:2px solid rgba(255,255,255,.25);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite;flex-shrink:0}

/* ── DIVIDER ── */
.divider{display:flex;align-items:center;gap:14px;margin:28px 0}
.div-line{flex:1;height:1px;background:var(--border)}
.div-text{font-family:var(--mono);font-size:.6rem;color:var(--muted);letter-spacing:1px;text-transform:uppercase;white-space:nowrap}

/* ── SIGNUP LINK ── */
.signup-prompt{text-align:center;font-size:.88rem;color:var(--muted2);margin-top:24px}
.signup-prompt a{color:var(--blue);text-decoration:none;font-weight:600;transition:color .2s}
.signup-prompt a:hover{color:var(--teal)}

@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.auth-box{animation:fadeUp .5s ease both}
`;

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            await login(email, password);
            navigate("/dashboard");
            alert("Login successful");
        } catch (err) {
            navigate("/login");
            setError(err.message || "Login failed. Please check your credentials.");
            console.log("Hi1");
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
                        <div className="card-eyebrow">Welcome Back</div>
                        <div className="card-title">Sign in to your account</div>
                        <div className="card-sub">Continue your career journey where you left off.</div>

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
                                        placeholder="••••••••"
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete="current-password"
                                    />
                                </div>
                                <a href="#" className="forgot">Forgot password?</a>
                            </div>

                            <button
                                type="button"
                                className="btn-primary"
                                onClick={handleLogin}
                                disabled={loading || !email.trim() || !password.trim()}
                            >
                                {loading && <span className="spinner" />}
                                {loading ? "Signing in…" : "Sign In →"}
                            </button>
                        </form>

                        {error && (
                            <div className="err-box">
                                <span>⚠</span>
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="divider">
                            <div className="div-line" />
                            <span className="div-text">Don't have an account?</span>
                            <div className="div-line" />
                        </div>

                        <div className="signup-prompt">
                            <Link to="/signup">Create a free account →</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;