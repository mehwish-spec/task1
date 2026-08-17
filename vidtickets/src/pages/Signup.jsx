import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout.jsx';
import SimpleHeader from '../components/layout/SimpleHeader.jsx';
import styles from './AuthPage.module.css';

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Demo only — wire this up to your auth backend.
    window.alert(`Creating account for ${form.name || 'unknown user'} (demo only)`);
  };

  return (
    <PageLayout>
      <SimpleHeader />
      <div className={styles.wrap}>
        <h1>Create your account</h1>
        <p className={styles.subtitle}>Start your 7 day free trial — no card required.</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="name">Full name</label>
            <input id="name" name="name" type="text" autoComplete="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className={styles.field}>
            <label htmlFor="signup-email">School email</label>
            <input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={styles.submit}>
            Start free trial
          </button>
        </form>

        <p className={styles.switch}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </PageLayout>
  );
}

export default Signup;
