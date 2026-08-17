import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppSidebar from '../components/app/AppSidebar.jsx';
import { useTickets } from '../context/TicketsContext.jsx';
import styles from './VidTicketAssess.module.css';

const CRITERIA = [
  'Critical Thinking',
  'Communication Skills',
  'Subject Knowledge',
  'Creativity & Innovation',
  'Research Skills',
  'Problem Solving',
];

// Step 3 (final) of the "create a Vid Ticket" wizard — choose how AI grades
// student replies. Two mutually exclusive modes: "Areas to assess" (pick
// criteria + describe what success looks like) or "Teacher-Generated"
// (assignment based on curriculum items, no sub-form in the reference
// design). Reached from VidTicketRecord's "Continue →" button.
function VidTicketAssess() {
  const navigate = useNavigate();
  const { addTicket } = useTickets();
  const [assessMode, setAssessMode] = useState('areas'); // 'areas' | 'teacher'
  const [selectedCriteria, setSelectedCriteria] = useState(() => new Set(['Critical Thinking']));
  const [successCriteria, setSuccessCriteria] = useState('');

  const toggleCriterion = (name) => {
    setSelectedCriteria((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  const handleFinish = () => {
    // Demo only — there's no backend, so this just adds the ticket to the
    // shared in-memory list the Dashboard reads from. The Dashboard's card
    // for it carries the "successfully created" messaging, so no separate
    // alert is needed here.
    addTicket();
    navigate('/app');
  };

  return (
    <div className={styles.shell}>
      <div className={styles.frame}>
        <AppSidebar variant="ticket" />

        <main className={styles.main}>
          <div className={styles.header}>
            <button
              type="button"
              className={styles.backCircle}
              aria-label="Back to recording"
              onClick={() => navigate('/app/new-ticket/record')}
            >
              ←
            </button>
            <h1 className={styles.pageTitle}>Vid Ticket</h1>
          </div>

          <div className={styles.progressBar} aria-hidden="true">
            <span className={`${styles.progressSegment} ${styles.progressActive}`} />
            <span className={`${styles.progressSegment} ${styles.progressActive}`} />
            <span className={`${styles.progressSegment} ${styles.progressActive}`} />
          </div>

          <div className={styles.modeStack}>
            <button
              type="button"
              className={`${styles.modeCard} ${assessMode === 'areas' ? styles.modeCardActive : ''}`}
              onClick={() => setAssessMode('areas')}
            >
              <div className={styles.modeHeader}>
                <span className={styles.modeIconBlue} aria-hidden="true" />
                <div className={styles.modeHeaderText}>
                  <p className={styles.modeTitle}>Areas to assess</p>
                  <p className={styles.modeSubtitle}>
                    AI will automatically evaluate student performance based on the selected criteria and your
                    success criteria below.
                  </p>
                </div>
              </div>

              {assessMode === 'areas' && (
                <div className={styles.modeBody}>
                  <div className={styles.criteriaGrid}>
                    {CRITERIA.map((name) => {
                      const checked = selectedCriteria.has(name);
                      return (
                        <div
                          key={name}
                          role="checkbox"
                          tabIndex={0}
                          aria-checked={checked}
                          className={`${styles.criterionItem} ${checked ? styles.criterionItemChecked : ''}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleCriterion(name);
                          }}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault();
                              event.stopPropagation();
                              toggleCriterion(name);
                            }
                          }}
                        >
                          <span className={`${styles.checkbox} ${checked ? styles.checkboxChecked : ''}`} aria-hidden="true">
                            {checked && '✓'}
                          </span>
                          {name}
                        </div>
                      );
                    })}
                  </div>

                  <div className={styles.successField} onClick={(event) => event.stopPropagation()}>
                    <p className={styles.successLabel}>What does success look like?</p>
                    <textarea
                      className={styles.successTextarea}
                      placeholder="Describe your personal success criteria and what you're looking for in student responses..."
                      value={successCriteria}
                      onChange={(event) => setSuccessCriteria(event.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
              )}
            </button>

            <button
              type="button"
              className={`${styles.modeCard} ${assessMode === 'teacher' ? styles.modeCardActive : ''}`}
              onClick={() => setAssessMode('teacher')}
            >
              <div className={styles.modeHeader}>
                <span className={`${styles.radioDot} ${assessMode === 'teacher' ? styles.radioDotActive : ''}`} aria-hidden="true" />
                <div className={styles.modeHeaderText}>
                  <p className={styles.modeTitle}>
                    <span className={styles.docIcon} aria-hidden="true">
                      📄
                    </span>
                    Teacher-Generated
                  </p>
                  <p className={styles.modeSubtitle}>Assignment based on the curriculum items and success criteria.</p>
                </div>
              </div>
            </button>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.finishBtn} onClick={handleFinish}>
              Finish
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default VidTicketAssess;
