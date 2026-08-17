import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext.jsx';
import styles from './AppSidebar.module.css';

// Shared sidebar for the post-onboarding app pages (Dashboard, VidTicketNew,
// VidTicketRecord, VidTicketAssess, UpgradePlans). `variant` toggles the
// small set of differences between the reference designs: the ticket-wizard
// pages and the plans/upgrade page both show a collapse icon instead of the
// profile avatar and expand the "Vid Tickets" nav item to list existing
// tickets; only the ticket-wizard pages hide the "Go Pro-fessor" upsell card
// (the plans page keeps showing it, matching its reference design).
function AppSidebar({ variant = 'home' }) {
  const isTicket = variant === 'ticket';
  const isUpgrade = variant === 'upgrade';
  const showCollapseIcon = isTicket || isUpgrade;
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoRow}>
        <button type="button" className={styles.logo} onClick={() => navigate('/app')}>
          VidTickets<sup>7</sup>
        </button>
        {showCollapseIcon ? (
          <button type="button" className={styles.collapseBtn} aria-label="Collapse sidebar">
            ⏴
          </button>
        ) : (
          <button type="button" className={styles.avatarBtn} aria-label="Account menu">
            <span className={styles.avatarImg} aria-hidden="true" />
            <span className={styles.avatarChevron}>⌄</span>
          </button>
        )}
      </div>

      <button type="button" className={styles.classSelector}>
        Miss Name&apos;s Class <span className={styles.chevronUpDown}>⌄</span>
      </button>

      <nav className={styles.nav}>
        <div className={styles.navItemActive}>
          <span className={styles.navIcon} aria-hidden="true">
            ✉️
          </span>
          Vid Tickets
        </div>
        {showCollapseIcon && (
          <div className={styles.ticketSubList}>
            <div className={styles.ticketSubItem}>Title of question goes here [...]</div>
            <div className={styles.ticketSubItem}>Title of question goes here [...]</div>
          </div>
        )}
      </nav>

      <div className={styles.spacer} />

      {!isTicket && !user.subscribed && (
        <div className={styles.upsellCard}>
          <p className={styles.upsellTitle}>🍎 Go Pro-fessor</p>
          <p className={styles.upsellBody}>4 days remaining — upgrade to continue using Vid Tickets.</p>
          <button type="button" className={styles.upgradeBtn} onClick={() => navigate('/app/upgrade')}>
            Upgrade
          </button>
        </div>
      )}

      <div className={styles.bottomNav}>
        <div className={styles.bottomNavItem}>
          <span className={styles.navIcon} aria-hidden="true">
            📋
          </span>
          Class List
        </div>
        <div className={styles.bottomNavItem}>
          <span className={styles.navIcon} aria-hidden="true">
            💗
          </span>
          Referrals
        </div>
      </div>

      <div className={styles.profileRow}>
        <span className={styles.profileAvatar} aria-hidden="true" />
        <div className={styles.profileText}>
          <p className={styles.profileName}>{user.name}</p>
          <p className={styles.profileTag}>{user.tag}</p>
        </div>
        <span className={styles.chevronUpDown}>⌄</span>
      </div>
    </aside>
  );
}

export default AppSidebar;
