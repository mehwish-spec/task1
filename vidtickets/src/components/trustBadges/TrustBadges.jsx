import { trustBadges } from '../../data/trustBadges.js';
import styles from './TrustBadges.module.css';

function TrustBadges() {
  return (
    <section className={styles.trust}>
      {trustBadges.map((badge) => (
        <div className={styles.trustBadge} key={badge.id}>
          <img className={styles.badgeIcon} src={badge.src} alt={badge.alt} />
          <span>
            {badge.label[0]}
            <br />
            {badge.label[1]}
          </span>
        </div>
      ))}
    </section>
  );
}

export default TrustBadges;
