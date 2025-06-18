// File: src/app/page.tsx
import styles from '../styles/home.module.css';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Feedback Hub</h1>
        <p className={styles.subtitle}>
          Feedback Hub is a modern, anonymous feedback platform that allows users to securely share their thoughts, ideas, or concerns.
        </p>
        <p className={styles.description}>
          Whether it's praise, suggestions, or constructive criticism — your feedback helps us improve. Click below to get started.
        </p>

        <Link href="/feedback">
          <button className={styles.button}>Submit Feedback</button>
        </Link>

        <div className={styles.adminLink}>
          <p>
            <Link href="/admin/login">
              <span className={styles.adminText}>Admin Login</span>
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
