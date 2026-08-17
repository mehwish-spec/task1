import Navbar from '../layout/Navbar.jsx';
import styles from './Hero.module.css';

function Hero() {
  return (
    <>
      <section className={styles.hero}>
        <Navbar />

        <div className={styles.heroCopy}>
          <h1>
            Video discussions to
            <br />
            make learning engaging,
            <br />
            fun, &amp; empowering.
          </h1>
          <div className={styles.actions}>
            <button className={styles.action} type="button">
              Teachers - Get started
            </button>
            <button className={styles.action} type="button">
              Schools - Learn more
            </button>
          </div>
        </div>

        <div className={styles.heroWave} />
      </section>

      <div className={styles.heroMedia} aria-label="Blank media placeholder">
        <div className={`${styles.heroSide} ${styles.heroSideLeft1}`} />
        <div className={`${styles.heroSide} ${styles.heroSideLeft2}`} />
        <div className={`${styles.heroSide} ${styles.heroSideRight1}`} />
        <div className={`${styles.heroSide} ${styles.heroSideRight2}`} />
        <div className={styles.heroCenter} />
      </div>
    </>
  );
}

export default Hero;
