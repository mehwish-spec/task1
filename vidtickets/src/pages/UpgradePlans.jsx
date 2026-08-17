import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppSidebar from '../components/app/AppSidebar.jsx';
import { useUser } from '../context/UserContext.jsx';
import styles from './UpgradePlans.module.css';

// Pricing differs by billing cycle, matching the two provided reference
// designs exactly (yearly is cheaper per month than monthly, and each
// cycle's "hours per month" feature line changes with it too).
const PLANS = [
  {
    id: 'basic',
    name: 'Vid Tickets',
    iconTone: 'orange',
    yearly: {
      price: '6.99',
      features: ['Up to 7 hours of Vid Tickets per month', '1:1 conversational practice for every student', 'Up to two classes'],
    },
    monthly: {
      price: '9.99',
      features: ['Up to 10 hours worth of Vid Tickets each month', '1:1 conversational practice for every student', 'Up to two classes'],
    },
  },
  {
    id: 'ai-grading',
    name: 'Vid Tickets + AI Grading',
    iconTone: 'blue',
    highlighted: true,
    yearlyBadge: 'Best Value',
    monthlyBadge: 'Recommended',
    yearly: {
      price: '10.49',
      features: [
        'Up to 10 hours of Vid Tickets per month',
        'Personalized feedback + grading based on your rubrics',
        'Prioritized customer support',
        'Unlimited classes',
        'AI transcripts + summaries',
      ],
    },
    monthly: {
      price: '14.99',
      features: [
        'Up to 15 hours worth of Vid Tickets each month',
        'Personalized feedback + grading based on your rubrics',
        'Prioritized customer support',
        'Unlimited classes',
        'AI transcripts + summaries',
      ],
    },
  },
];

function PlanCard({ plan, cycle, onStartTrial }) {
  const data = plan[cycle];
  const badge = cycle === 'yearly' ? plan.yearlyBadge : plan.monthlyBadge;

  return (
    <article className={`${styles.planCard} ${plan.highlighted ? styles.planCardHighlighted : ''}`}>
      {badge && <span className={styles.badge}>{badge}</span>}
      <span
        className={`${styles.planIcon} ${plan.iconTone === 'blue' ? styles.planIconBlue : styles.planIconOrange}`}
        aria-hidden="true"
      />
      <h2 className={styles.planName}>{plan.name}</h2>
      <p className={styles.planPrice}>
        <span className={styles.priceValue}>${data.price}</span>
        <span className={styles.pricePeriod}> / month</span>
      </p>
      <button
        type="button"
        className={`${styles.trialBtn} ${plan.highlighted ? styles.trialBtnSolid : ''}`}
        onClick={() => onStartTrial(plan.name)}
      >
        Start a 7 Day Free Trial ✨
      </button>
      <ul className={styles.featureList}>
        {data.features.map((feature) => (
          <li key={feature}>
            <span className={styles.checkIcon} aria-hidden="true">
              ✓
            </span>
            {feature}
          </li>
        ))}
      </ul>
    </article>
  );
}

// Reached from the sidebar's "Go Pro-fessor" upsell card (its "Upgrade"
// button) or a Vid Ticket card's locked "Please upgrade" prompt. Picking
// either plan's trial button marks the demo account as subscribed — same
// UserContext flag the two hardcoded demo accounts (subscribed@gmail.com /
// unsubscribed@gmail.com) set at login — and returns to the Dashboard,
// which immediately reflects the unlocked, subscribed experience.
function UpgradePlans() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [cycle, setCycle] = useState('yearly');

  const handleStartTrial = (planName) => {
    setUser({ ...user, subscribed: true });
    window.alert(`Starting your 7-day free trial of ${planName}! (demo)`);
    navigate('/app');
  };

  return (
    <div className={styles.shell}>
      <div className={styles.frame}>
        <AppSidebar variant="upgrade" />

        <main className={styles.main}>
          <h1 className={styles.title}>Choose your plan</h1>

          <div className={styles.toggle} role="tablist" aria-label="Billing cycle">
            <button
              type="button"
              role="tab"
              aria-selected={cycle === 'yearly'}
              className={`${styles.toggleBtn} ${cycle === 'yearly' ? styles.toggleBtnActive : ''}`}
              onClick={() => setCycle('yearly')}
            >
              Yearly (Save 30%)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={cycle === 'monthly'}
              className={`${styles.toggleBtn} ${cycle === 'monthly' ? styles.toggleBtnActive : ''}`}
              onClick={() => setCycle('monthly')}
            >
              Monthly
            </button>
          </div>

          <div className={styles.planGrid}>
            {PLANS.map((plan) => (
              <PlanCard key={plan.id} plan={plan} cycle={cycle} onStartTrial={handleStartTrial} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default UpgradePlans;
