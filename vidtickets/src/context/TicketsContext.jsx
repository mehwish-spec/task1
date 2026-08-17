import { createContext, useContext, useMemo, useRef, useState } from 'react';

const TicketsContext = createContext(null);

// Every Vid Ticket created through the wizard (VidTicketNew -> VidTicketRecord
// -> VidTicketAssess) lands here so the Dashboard can list it — this is a
// demo, so there's no backend behind it, just in-memory state for the
// session. The title matches the reference design's "(example) Book review
// and recommendation" placeholder, since the wizard doesn't currently thread
// the actual typed question across its three steps.
const DEMO_TICKET_TITLE = '(example) Book review and recommendation';

export function TicketsProvider({ children }) {
  const [tickets, setTickets] = useState([]);
  // A plain counter, not tickets.length — ids must stay unique even after a
  // ticket is deleted and a new one is added (length alone would repeat).
  const nextId = useRef(1);

  const addTicket = (overrides = {}) => {
    const id = `ticket-${nextId.current}`;
    nextId.current += 1;
    setTickets((prev) => [
      {
        id,
        title: DEMO_TICKET_TITLE,
        shareLink: 'https://coraltalk.com/yourschool/dialoguewriting',
        replies: 0,
        views: 0,
        engagementHours: 0,
        ...overrides,
      },
      ...prev,
    ]);
  };

  const removeTicket = (id) => {
    setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
  };

  const value = useMemo(() => ({ tickets, addTicket, removeTicket }), [tickets]);

  return <TicketsContext.Provider value={value}>{children}</TicketsContext.Provider>;
}

export function useTickets() {
  const ctx = useContext(TicketsContext);
  if (!ctx) {
    throw new Error('useTickets must be used within a TicketsProvider');
  }
  return ctx;
}
