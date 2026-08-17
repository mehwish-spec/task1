import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../components/common/BackButton.jsx';
import styles from './SignupSplit.module.css';

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

function TeacherIllustration() {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
      <ellipse cx="30" cy="34" rx="22" ry="16" fill="#ff9000" />
      <path d="M52 34 L64 24 L64 44 Z" fill="#ff9000" />
      <path d="M14 22 Q20 10 30 14 Q26 20 20 22 Z" fill="#ffb84d" />
      <circle cx="22" cy="30" r="9" fill="#fff" opacity="0.9" />
      <circle cx="38" cy="30" r="9" fill="#fff" opacity="0.9" />
      <circle cx="22" cy="30" r="4" fill="#1a1a1a" />
      <circle cx="38" cy="30" r="4" fill="#1a1a1a" />
      <path d="M13 30 Q30 20 47 30" stroke="#1a1a1a" strokeWidth="2" fill="none" />
      <path d="M24 44 Q30 49 36 44" stroke="#7a3d00" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function StudentIllustration() {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
      <ellipse cx="30" cy="36" rx="20" ry="15" fill="#37d1c2" />
      <path d="M50 36 L62 27 L62 45 Z" fill="#37d1c2" />
      <path d="M20 22 Q26 14 34 18 Q30 24 24 24 Z" fill="#7de8db" />
      <circle cx="24" cy="34" r="5" fill="#fff" />
      <circle cx="36" cy="34" r="5" fill="#fff" />
      <circle cx="24" cy="34" r="2.2" fill="#1a1a1a" />
      <circle cx="36" cy="34" r="2.2" fill="#1a1a1a" />
      <path d="M25 45 Q30 49 35 45" stroke="#0a5c53" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function SignupSplit() {
  const [role, setRole] = useState('teacher');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleContinue = (event) => {
    event.preventDefault();
    // Demo only — wire this up to your auth backend. The role cards above
    // only select "I'm a teacher" / "I'm a student" now — they don't
    // navigate by themselves. Moving to the next page requires actually
    // entering an email (the `required` input below enforces that) and
    // pressing Continue. There's no student flow built yet (no reference
    // design for one), so that path still just confirms via alert.
    if (role === 'teacher') {
      navigate('/signup/teacher');
    } else {
      window.alert(`Signing up as a student with ${email || 'no email entered'} (demo only)`);
    }
  };

  const handleGoogleSignIn = () => {
    // Demo only — wire this up to your OAuth provider.
    window.alert('Sign up with Google (demo only)');
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
          <p className={styles.subtitle}>Sign up for VidTickets!</p>

          <div className={styles.roleCards} role="radiogroup" aria-label="I am a...">
            <button
              type="button"
              role="radio"
              aria-checked={role === 'teacher'}
              className={`${styles.roleCard} ${role === 'teacher' ? styles.roleCardActive : ''}`}
              onClick={() => setRole('teacher')}
            >
              <span className={styles.roleIllustration}>
                <TeacherIllustration />
              </span>
              <span className={styles.roleLabel}>I&apos;m a teacher</span>
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={role === 'student'}
              className={`${styles.roleCard} ${role === 'student' ? styles.roleCardActive : ''}`}
              onClick={() => setRole('student')}
            >
              <span className={styles.roleIllustration}>
                <StudentIllustration />
              </span>
              <span className={styles.roleLabel}>I&apos;m a student</span>
            </button>
          </div>

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

          <p className={styles.loginLink}>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupSplit;
