import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './VidTicketCard.module.css';

// A single created Vid Ticket on the Dashboard. Subscribed teachers get a
// fully working share link with a real "Copy" action; unsubscribed teachers
// see the same card with the link locked behind a "Please upgrade" prompt —
// this is the concrete "some pages look different depending on subscription
// status" behavior asked for. The two decorative avatar bubbles in the
// locked state are gradient placeholders, not real photos, consistent with
// the rest of the project.
function VidTicketCard({ ticket, subscribed, onDelete }) {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(ticket.shareLink);
    } catch {
      // Clipboard access can be denied/unavailable (e.g. no permission,
      // insecure context) — the button still gives visual feedback either way.
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  const handleUpgradePrompt = () => {
    navigate('/app/upgrade');
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.titleRow}>
          <span className={styles.titleAvatar} aria-hidden="true" />
          <div>
            <p className={styles.title}>{ticket.title}</p>
            <p className={styles.statsRow}>
              {ticket.replies} replies &middot; {ticket.views} views &middot; {ticket.engagementHours} hours of
              engagement
            </p>
          </div>
        </div>
        <div className={styles.cardActions}>
          <button type="button" className={styles.iconBtn} aria-label="Edit Vid Ticket" onClick={() => window.alert('Edit (demo only)')}>
            📝
          </button>
          <button type="button" className={styles.iconBtn} aria-label="Delete Vid Ticket" onClick={() => onDelete(ticket.id)}>
            🗑️
          </button>
          <button
            type="button"
            className={styles.shareBtn}
            onClick={subscribed ? handleCopy : handleUpgradePrompt}
          >
            🔗 Share
          </button>
        </div>
      </div>

      <div className={styles.illustrationBox}>
        <div className={styles.illustrationEmojis} aria-hidden="true">
          <span>🐠</span>
          <span>📬</span>
        </div>
        <p className={styles.illustrationTitle}>Your Vid Ticket was successfully created!</p>
        <p className={styles.illustrationSubtitle}>Share this link with your students to have them reply:</p>

        <div className={styles.linkRow}>
          <input type="text" className={styles.linkInput} value={ticket.shareLink} readOnly aria-label="Share link" />
          <button type="button" className={styles.copyBtn} onClick={handleCopy} disabled={!subscribed}>
            {copied ? '✓ Copied' : '📋 Copy'}
          </button>

          {!subscribed && (
            <>
              <span className={styles.bubbleAvatarA} aria-hidden="true" />
              <span className={styles.bubbleAvatarB} aria-hidden="true" />
              <button type="button" className={styles.lockOverlay} onClick={handleUpgradePrompt}>
                <span className={styles.lockBadge}>🔒 Please upgrade</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default VidTicketCard;
