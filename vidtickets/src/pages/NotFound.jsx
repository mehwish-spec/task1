import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout.jsx';
import SimpleHeader from '../components/layout/SimpleHeader.jsx';
import styles from './InfoPage.module.css';

function NotFound() {
  return (
    <PageLayout>
      <SimpleHeader />
      <div className={styles.wrap}>
        <h1>Page not found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <p>
          <Link to="/">Go back home</Link>
        </p>
      </div>
    </PageLayout>
  );
}

export default NotFound;
