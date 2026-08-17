import { useState } from 'react';
import styles from './Faq.module.css';

function FaqItem({ question, answer, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`${styles.faqItem} ${isOpen ? styles.open : ''}`}>
      <button
        type="button"
        className={styles.faqSummary}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className={styles.faqIcon} aria-hidden="true">
          {isOpen ? '–' : '+'}
        </span>
        {question}
      </button>
      {isOpen && <p>{answer}</p>}
    </div>
  );
}

export default FaqItem;
