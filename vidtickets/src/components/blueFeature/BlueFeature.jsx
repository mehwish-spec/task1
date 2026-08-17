import styles from './BlueFeature.module.css';

const bullets = [
  'Uses the rubric you already have, nothing new to build',
  'Feedback is specific, not just a number',
  'Class-wide misconceptions surface automatically, so you know what to reteach',
];

function BlueFeature() {
  return (
    <section className={styles.blueWrap}>
      <div className={styles.blueBox}>
        <h2>
          The engagement, without
          <br />
          the grading backlog.
        </h2>
        <p>
          Every video reply gets transcribed, scored to your existing rubric, and sent back with
          specific, encouraging feedback before your next class starts.
        </p>
        <ul>
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
        <div className={styles.blueMedia} aria-label="Blank illustration placeholder" />
      </div>
    </section>
  );
}

export default BlueFeature;
