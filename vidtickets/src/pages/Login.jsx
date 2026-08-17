import { useState } from 'react';
import PageLayout from '../components/layout/PageLayout.jsx';
import SimpleHeader from '../components/layout/SimpleHeader.jsx';
import styles from './AuthPage.module.css';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Demo only — wire this up to your auth backend.
    window.alert(`Signing in as ${form.email || 'unknown user'} (demo only)`);
  };

  return (
    <PageLayout>
      <SimpleHeader />
      <div className={styles.wrap}>
        <h1>Welcome back</h1>
        <p className={styles.subtitle}>Log in to your VidTickets account.</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={styles.submit}>
            Log in
          </button>
        </form>
      </div>
    </PageLayout>
  );
}

export default Login;
