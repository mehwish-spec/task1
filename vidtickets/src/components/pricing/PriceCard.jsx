import styles from './Pricing.module.css';

function PriceCard({ name, price, period, popular, features }) {
  return (
    <article className={`${styles.priceCard} ${popular ? styles.popular : ''}`}>
      <div className={styles.priceIcon} />
      <h3>{name}</h3>
      <div className={styles.cost}>
        {price} <small>{period}</small>
      </div>
      <button className={styles.trial} type="button">
        Start a 7 Day Free Trial →
      </button>
      <ul>
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
    </article>
  );
}

export default PriceCard;
