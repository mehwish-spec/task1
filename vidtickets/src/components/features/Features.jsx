import { features } from '../../data/features.js';
import FeatureCard from './FeatureCard.jsx';
import styles from './Features.module.css';

function Features() {
  return (
    <section className={styles.features}>
      <h2>
        The loop your class <span>loved.</span>
      </h2>
      <p className={styles.lead}>
        When Microsoft shut down Flipgrid, districts lost the easiest way to hear every student out loud.
        <br />
        VidTalk brings it back — and now every reply grades itself against your rubric.
      </p>

      <div className={styles.cards}>
        {features.map((feature) => (
          <FeatureCard key={feature.number} {...feature} />
        ))}
      </div>
    </section>
  );
}

export default Features;
