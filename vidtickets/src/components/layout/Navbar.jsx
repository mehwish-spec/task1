import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>
        VidTickets<em>™ by CoralTalk</em>
      </div>
      <div className={styles.navRight}>
        <a href="#pricing">Pricing</a>
        <Link to="/login">Log in</Link>
        <a href="#pricing" className={styles.navStart}>
          Start Free
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
