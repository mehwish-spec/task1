import { useNavigate } from 'react-router-dom';
import AppSidebar from '../components/app/AppSidebar.jsx';
import VidTicketCard from '../components/app/VidTicketCard.jsx';
import { useTickets } from '../context/TicketsContext.jsx';
import { useUser } from '../context/UserContext.jsx';
import styles from './Dashboard.module.css';

// The app's "home" screen, shown after a teacher finishes onboarding
// (reached from the Onboarding flow's Skip / Send Invites actions), and
// also where the create-Vid-Ticket wizard's "Finish" button lands. Once at
// least one Vid Ticket has been created it replaces the empty-state
// illustration below with a real, deletable list — before that, it's the
// same illustration collage used throughout the site (Login/Signup/Onboarding),
// no real photos, just gradient placeholders.
function Dashboard() {
  const navigate = useNavigate();
  const { tickets, removeTicket } = useTickets();
  const { user } = useUser();
  const hasTickets = tickets.length > 0;

  if (hasTickets) {
    return (
      <div className={styles.shell}>
        <div className={styles.frame}>
          <AppSidebar variant="home" />

          <main className={styles.ticketsMain}>
            <div className={styles.ticketsHeader}>
              <h1 className={styles.ticketsTitle}>Vid Tickets</h1>
              <button type="button" className={styles.newTicketBtnSmall} onClick={() => navigate('/app/new-ticket')}>
                + New Vid Ticket
              </button>
            </div>

            <div className={styles.ticketList}>
              {tickets.map((ticket) => (
                <VidTicketCard key={ticket.id} ticket={ticket} subscribed={user.subscribed} onDelete={removeTicket} />
              ))}
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.shell}>
      <div className={styles.frame}>
        <AppSidebar variant="home" />

        <main className={styles.main}>
          <div className={styles.heroVisual}>
            <div className={styles.bubbleIcon} aria-hidden="true">
              💬
            </div>
            <div className={styles.grid}>
              <div className={styles.gridControls} aria-hidden="true" />
              <div className={styles.gridTiles}>
                {Array.from({ length: 9 }).map((_, i) => (
                  <div className={styles.tile} key={i} />
                ))}
              </div>
              <div className={styles.gridPlayer} aria-hidden="true" />
              <div className={styles.gridFooter} aria-hidden="true" />
            </div>
            <div className={styles.flowerIcon} aria-hidden="true" />
            <div className={styles.replyCardBehind} aria-hidden="true">
              <span className={styles.avatarBadge}>Lana</span>
            </div>
            <div className={styles.replyCard}>
              <div className={styles.replyPhoto} />
              <div className={styles.replyLine} />
              <div className={`${styles.replyLine} ${styles.replyLineShort}`} />
              <div className={styles.replyAvatar} />
            </div>
            <div className={styles.extraAvatar} aria-hidden="true" />
          </div>

          <p className={styles.heroText}>
            Record a question. Students will record their answers, and respond to their peers.
          </p>

          <div className={styles.heroActions}>
            <button type="button" className={styles.tutorialBtn}>
              Watch a Tutorial
            </button>
            <button type="button" className={styles.newTicketBtn} onClick={() => navigate('/app/new-ticket')}>
              + New Vid Ticket
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
