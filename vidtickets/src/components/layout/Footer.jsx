import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <h2>Turn learning into dialogue.</h2>
      <button className={styles.action} type="button">
        Teachers - Get started
      </button>
      <button className={styles.action} type="button">
        Schools - Learn more
      </button>
    </footer>
  );
}

export default Footer;
