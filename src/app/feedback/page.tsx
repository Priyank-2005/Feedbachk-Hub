// File: src/app/feedback/page.tsx
'use client';

import { useState } from 'react';
import styles from '../../styles/feedback.module.css';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function FeedbackPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      toast.error('Message is required');
      return;
    }

    setSubmitting(true); // ✅ FIXED

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Feedback submitted successfully!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        toast.error(data.error || 'Failed to submit feedback');
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error('Submission Error:', error);
    } finally {
      setSubmitting(false); // ✅ FIXED
    }
  };

  return (
    <main className={styles.main}>
      <Toaster position="top-center" />
      <h2 className={styles.title}>Submit Your Feedback</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Name (optional)"
          value={name}
          onChange={e => setName(e.target.value)}
          className={styles.input}
        />
        <input
          type="email"
          placeholder="Email (optional)"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={styles.input}
        />
        <textarea
          placeholder="Your feedback *"
          value={message}
          onChange={e => setMessage(e.target.value)}
          className={styles.textarea}
          required
        ></textarea>
        <button type="submit" className={styles.button} disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </main>
  );
}
