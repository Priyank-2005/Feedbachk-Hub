// File: src/app/admin/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/admin.module.css';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('admin_logged_in', 'true');
      toast.success('Login successful!');
      setTimeout(() => router.push('/admin'), 1000);
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <main className={styles.main}>
      <Toaster position="top-center" />
      <div className={styles.loginBox}>
        <h2 className={styles.title}>Admin Login</h2>
        <form className={styles.form} onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
