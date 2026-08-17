import { faqItems } from '../../data/faqItems.js';
import FaqItem from './FaqItem.jsx';
import styles from './Faq.module.css';

function Faq() {
  return (
    <section className={styles.faq}>
      <div className={styles.faqRing} aria-hidden="true" />
      <div className={styles.faqDoodle} aria-hidden="true" />
      <h2 className={styles.faqTitle}>FAQ&apos;s</h2>
      <div className={styles.faqList}>
        {faqItems.map((item) => (
          <FaqItem key={item.question} {...item} />
        ))}
      </div>
    </section>
  );
}

export default Faq;
