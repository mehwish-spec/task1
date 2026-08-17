import { students } from '../../data/students.js';
import styles from './StudentCards.module.css';

function StudentCards() {
  return (
    <>
      <div className={styles.cardsWave} />
      <section className={styles.studentArea}>
        <div className={styles.studentCards} aria-label="Blank student photo placeholders">
          {students.map((student) => (
            <div key={student.name} className={`${styles.studentCard} ${styles[toCamel(student.variant)]}`}>
              <div className={styles.photo} />
              <span>{student.name}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// convert "card-a" -> "cardA" to match CSS module camelCase export
function toCamel(str) {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

export default StudentCards;
