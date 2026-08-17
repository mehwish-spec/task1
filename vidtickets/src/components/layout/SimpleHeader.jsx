import { Link } from 'react-router-dom';
import styles from './SimpleHeader.module.css';

function SimpleHeader() {
  return (
    <header className={styles.simpleHeader}>
      <Link to="/" className={styles.brand}>
        VidTickets<em>™ by CoralTalk</em>
      </Link>
      <Link to="/" className={styles.backLink}>
        ← Back home
      </Link>
    </header>
  );
}

export default SimpleHeader;
