import PageLayout from '../components/layout/PageLayout.jsx';
import SimpleHeader from '../components/layout/SimpleHeader.jsx';
import styles from './InfoPage.module.css';

function DataPrivacy() {
  return (
    <PageLayout>
      <SimpleHeader />
      <div className={styles.wrap}>
        <h1>Data privacy</h1>
        <p>
          VidTickets is COPPA and FERPA aligned. Student videos and data stay within your
          district&apos;s agreement and are never used to train external models.
        </p>
        <p>
          For the full privacy policy, data processing agreement, or a district-specific security
          review, contact our support team.
        </p>
      </div>
    </PageLayout>
  );
}

export default DataPrivacy;
