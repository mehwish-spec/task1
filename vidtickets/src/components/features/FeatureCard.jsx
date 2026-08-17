import styles from './Features.module.css';

function FeatureCard({ number, title, body }) {
  return (
    <article className={styles.card}>
      <span className={styles.number}>{number}</span>
      <div>
        <h3>
          {title.map((line, i) => (
            <span key={line}>
              {line}
              {i < title.length - 1 && <br />}
            </span>
          ))}
        </h3>
        <p>{body}</p>
      </div>
    </article>
  );
}

export default FeatureCard;
