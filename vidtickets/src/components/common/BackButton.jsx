import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.css';

// Small reusable "← Back" control used across the Login/Signup/onboarding
// flow. Pass either `to` (a route to navigate to) or `onClick` (custom
// logic, e.g. stepping back one onboarding step instead of changing route).
function BackButton({ to, onClick, label = 'Back' }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      navigate(to);
    }
  };

  return (
    <button type="button" className={styles.backBtn} onClick={handleClick}>
      <span aria-hidden="true">←</span> {label}
    </button>
  );
}

export default BackButton;
