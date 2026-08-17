import PageLayout from '../components/layout/PageLayout.jsx';
import SimpleHeader from '../components/layout/SimpleHeader.jsx';
import styles from './InfoPage.module.css';

function Contact() {
  return (
    <PageLayout>
      <SimpleHeader />
      <div className={styles.wrap}>
        <h1>Contact us</h1>
        <p>Reach our teacher support team any time at support@coraltalk.com.</p>
        <p>Most questions get answered within a school day.</p>
      </div>
    </PageLayout>
  );
}

export default Contact;
