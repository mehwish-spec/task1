import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../components/common/BackButton.jsx';
import { DEFAULT_USER, useUser } from '../context/UserContext.jsx';
import styles from './LoginSplit.module.css';

// Two hardcoded demo accounts so the paid vs. free experience can actually
// be tried: log in with either address (any password) to see the Dashboard
// as a subscribed or unsubscribed teacher. Any other email falls back to
// the free/unsubscribed experience, same as before this existed.
const DEMO_PAID_EMAIL = 'subscribed@gmail.com';
const DEMO_UNSUBSCRIBED_EMAIL = 'unsubscribed@gmail.com';

// Any address other than the two demo accounts above defaults to the free
// experience, same as the rest of this demo's auth (there's no real backend
// checking a subscription record).
function subscribedFromEmail(email) {
  const normalized = email.trim().toLowerCase();
  if (normalized === DEMO_PAID_EMAIL) return true;
  if (normalized === DEMO_UNSUBSCRIBED_EMAIL) return false;
  return false;
}

// Turns "jane.doe23@school.edu" into "Jane Doe23" — just enough to give the
// sidebar a plausible name for someone who logged in without ever entering
// one directly (unlike the teacher signup form, which asks for a name).
function nameFromEmail(email) {
  const localPart = email.split('@')[0] || '';
  const words = localPart.split(/[.\-_+]+/).filter(Boolean);
  if (!words.length) return 'John Stephens';
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.91c1.7-1.57 2.69-3.88 2.69-6.62z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.81.54-1.84.86-3.05.86-2.34 0-4.33-1.58-5.04-3.71H.96v2.33A9 9 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.96 10.71A5.41 5.41 0 0 1 3.68 9c0-.59.1-1.17.28-1.71V4.96H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.04l3-2.33z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.96l3 2.33C4.67 5.16 6.66 3.58 9 3.58z"
      />
    </svg>
  );
}

function LoginSplit() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleContinue = (event) => {
    event.preventDefault();
    // Demo only — wire this up to your auth backend. There's no real
    // account to read a name from, so approximate one from the email.
    setUser({ name: nameFromEmail(email), tag: 'PRO-fessor', subscribed: subscribedFromEmail(email) });
    navigate('/app');
  };

  const handleGoogleSignIn = () => {
    // Demo only — wire this up to your OAuth provider. Goes straight to the
    // Dashboard, same as the email/password flow above, using the default
    // demo identity since there's no real Google account to read a name from.
    setUser(DEFAULT_USER);
    navigate('/app');
  };

  return (
    <div className={styles.shell}>
      <div className={styles.panelLeft}>
        <div className={styles.collage}>
          <div className={styles.bubbleIcon} aria-hidden="true">
            💬
          </div>
          <div className={styles.grid}>
            <div className={styles.gridControls} aria-hidden="true" />
            <div className={styles.gridTiles}>
              {Array.from({ length: 9 }).map((_, i) => (
                <div className={styles.tile} key={i} />
              ))}
            </div>
            <div className={styles.gridPlayer} aria-hidden="true" />
            <div className={styles.gridFooter} aria-hidden="true" />
          </div>
          <div className={styles.flowerIcon} aria-hidden="true" />
          <div className={styles.replyCardBehind} aria-hidden="true">
            <span className={styles.avatarBadge}>Lana</span>
          </div>
          <div className={styles.replyCard}>
            <div className={styles.replyPhoto} />
            <div className={styles.replyLine} />
            <div className={`${styles.replyLine} ${styles.replyLineShort}`} />
            <div className={styles.replyAvatar} />
          </div>
        </div>

        <h1 className={styles.headline}>
          Turn
          <br />
          learning
          <br />
          into
          <br />
          <span>dialogue.</span>
        </h1>
      </div>

      <div className={styles.panelRight}>
        <div className={styles.backSlot}>
          <BackButton to="/" />
        </div>
        <div className={styles.formWrap}>
          <div className={styles.brand}>
            VidTickets<sup>™</sup>
          </div>
          <p className={styles.subtitle}>Log back into VidTickets</p>

          <form onSubmit={handleContinue}>
            <input
              type="email"
              className={styles.emailInput}
              placeholder="name@school.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-label="Email"
              required
            />
            <button type="submit" className={styles.continueBtn}>
              Continue
            </button>
          </form>

          <div className={styles.divider}>
            <span />
            <em>OR</em>
            <span />
          </div>

          <button type="button" className={styles.googleBtn} onClick={handleGoogleSignIn}>
            <GoogleIcon />
            Sign in with Google
          </button>

          <p className={styles.signupLink}>
            <Link to="/signup">New to VidTickets?</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginSplit;
