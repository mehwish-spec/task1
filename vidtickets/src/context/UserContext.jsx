import { createContext, useContext, useMemo, useState } from 'react';

const UserContext = createContext(null);

// "John Stephens" is the default identity shown in the app sidebar before
// anyone has actually logged in or signed up — once a visitor does either,
// their real name replaces it everywhere the sidebar is used. `subscribed`
// drives the paid/free variants of the app's pages (e.g. the Dashboard's
// upsell card and the lock state on shared Vid Ticket links) — it defaults
// to false (free/trial), matching the "Go Pro-fessor" upsell card that was
// already always shown before this field existed.
export const DEFAULT_USER = { name: 'John Stephens', tag: 'PRO-fessor', subscribed: false };

export function UserProvider({ children }) {
  const [user, setUser] = useState(DEFAULT_USER);
  const value = useMemo(() => ({ user, setUser }), [user]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return ctx;
}
