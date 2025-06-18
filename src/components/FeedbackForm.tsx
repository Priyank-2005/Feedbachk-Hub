'use client';
import { useState } from 'react';

export default function FeedbackForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message) return alert('Message is required');
    const res = await fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name (optional)" value={formData.name} onChange={handleChange} />
      <input type="email" name="email" placeholder="Email (optional)" value={formData.email} onChange={handleChange} />
      <textarea name="message" placeholder="Your feedback..." required value={formData.message} onChange={handleChange} />
      <button type="submit">Submit</button>
      {submitted && <p>✅ Feedback submitted!</p>}
    </form>
  );
}
