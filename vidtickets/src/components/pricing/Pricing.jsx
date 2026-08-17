import { useState } from 'react';
import { pricingPlans, YEARLY_DISCOUNT } from '../../data/pricingPlans.js';
import PriceCard from './PriceCard.jsx';
import styles from './Pricing.module.css';

function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const isYearly = billingCycle === 'yearly';

  return (
    <section className={styles.pricing} id="pricing">
      <div className={styles.pricingInner}>
        <h2>Affordable, teacher-friendly pricing</h2>

        <div className={styles.toggle} role="tablist" aria-label="Billing cycle">
          <button
            type="button"
            role="tab"
            aria-selected={isYearly}
            className={isYearly ? styles.active : ''}
            onClick={() => setBillingCycle('yearly')}
          >
            Yearly (Save 30%)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={!isYearly}
            className={!isYearly ? styles.active : ''}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </button>
        </div>

        <div className={styles.priceGrid}>
          {pricingPlans.map((plan) => {
            const price = isYearly ? plan.monthlyPrice * (1 - YEARLY_DISCOUNT) : plan.monthlyPrice;
            return (
              <PriceCard
                key={plan.id}
                name={plan.name}
                price={`$${price.toFixed(2)}`}
                period={isYearly ? '/ month, billed yearly' : '/ month'}
                popular={plan.popular}
                features={plan.features}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
