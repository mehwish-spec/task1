import { Link } from 'react-router-dom';
import styles from './SiteFooter.module.css';

function SiteFooter() {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.brandMark}>
        VidTickets<sup>™</sup>
      </div>
      <nav className={styles.footerNav}>
        <a href="#">Coraltalk</a>
        <Link to="/data-privacy">Data Privacy</Link>
        <Link to="/contact">Contact us</Link>
        <a href="#pricing">Pricing</a>
        <Link to="/login">Log in</Link>
        <Link to="/signup" className={styles.footerSignup}>
          Sign up
        </Link>
      </nav>
    </footer>
  );
}

export default SiteFooter;
