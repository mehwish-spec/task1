import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/common/BackButton.jsx';
import { useUser } from '../context/UserContext.jsx';
import styles from './SignupTeacher.module.css';

const REFERRAL_OPTIONS = ['Social Media', 'Search Engine', 'Friend or Colleague', 'Conference / Event', 'Other'];

function BrandMark() {
  const petals = [
    [0, -20],
    [17, -10],
    [17, 10],
    [0, 20],
    [-17, 10],
    [-17, -10],
  ];
  return (
    <svg width="36" height="36" viewBox="-24 -24 48 48" className={styles.mark} aria-hidden="true">
      <circle cx="0" cy="0" r="7" fill="#241f5c" />
      {petals.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="6" fill="#241f5c" />
      ))}
    </svg>
  );
}

function SignupTeacher() {
  const [form, setForm] = useState({
    teacherName: '',
    schoolName: '',
    className: '',
    referral: REFERRAL_OPTIONS[0],
  });
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // The name a teacher gives here becomes their identity across the app
    // (shown in the sidebar's profile row). A brand-new signup is always on
    // the free/trial tier, same as the sidebar's "Go Pro-fessor" upsell card
    // already implied before subscriptions existed as a concept here.
    setUser({ name: form.teacherName.trim() || 'John Stephens', tag: 'PRO-fessor', subscribed: false });
    navigate('/onboarding');
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
        <div className={styles.cornerAvatar} aria-hidden="true" />
        <div className={styles.backSlot}>
          <BackButton to="/signup" />
        </div>
        <div className={styles.formWrap}>
          <BrandMark />
          <h1 className={styles.title}>Almost done...</h1>

          <form onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="teacherName">What name do your students call you?</label>
              <input
                id="teacherName"
                name="teacherName"
                type="text"
                placeholder="ex. Ms. Frizzle"
                value={form.teacherName}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="schoolName">School / Organization Name</label>
              <input
                id="schoolName"
                name="schoolName"
                type="text"
                placeholder="ex. Hogwarts"
                value={form.schoolName}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="className">Class name (You can add more later)</label>
              <input
                id="className"
                name="className"
                type="text"
                placeholder="ex. English 1"
                value={form.className}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="referral">How did you hear about us?</label>
              <select id="referral" name="referral" value={form.referral} onChange={handleChange}>
                {REFERRAL_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.consent}>
              <input
                id="ageConsent"
                type="checkbox"
                checked={agreed}
                onChange={(event) => setAgreed(event.target.checked)}
              />
              <label htmlFor="ageConsent">
                I attest that I am 16 years or older and I agree to Coraltalk&apos;s{' '}
                <a href="#terms">Terms of Use</a> and <a href="#privacy">Privacy Policy</a>.
              </label>
            </div>

            <button type="submit" className={styles.startBtn} disabled={!agreed}>
              Let&apos;s start!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupTeacher;
