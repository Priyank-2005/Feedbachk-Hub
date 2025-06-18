'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/admin.module.css';
import toast, { Toaster } from 'react-hot-toast';

type Feedback = {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
};

export default function AdminDashboard() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const router = useRouter();

  const limit = 5;

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('admin_logged_in');
    if (!isLoggedIn) {
      router.push('/admin/login');
    } else {
      fetchPageData(page);
    }
  }, [page]);

  const fetchPageData = async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/feedback?limit=${limit}&page=${pageNum}`);
      const data = await res.json();

      if (res.ok && Array.isArray(data.feedbacks)) {
        setFeedbacks(data.feedbacks);
        setHasNextPage(data.feedbacks.length === limit);
      } else {
        toast.error('Failed to load feedbacks');
      }
    } catch (err) {
      toast.error('Error fetching feedbacks');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this feedback?');
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/admin/delete?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Feedback deleted!');
        fetchPageData(page); // refresh after deletion
      } else {
        toast.error('Delete failed');
      }
    } catch {
      toast.error('Error deleting feedback');
    }
  };

  return (
    <main className={styles.main}>
      <Toaster position="top-center" />
      <div className={styles.dashboardBox}>
        <h2 className={styles.title}>Feedback Dashboard</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5}>Loading...</td>
                </tr>
              ) : feedbacks.length === 0 ? (
                <tr>
                  <td colSpan={5}>No feedback found.</td>
                </tr>
              ) : (
                feedbacks.map(fb => (
                  <tr key={fb.id}>
                    <td>{fb.name}</td>
                    <td>{fb.email}</td>
                    <td>{fb.message}</td>
                    <td>{new Date(fb.date).toLocaleString()}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(fb.id)}
                        className={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            ◀ Prev
          </button>
          <span>Page {page}</span>
          <button
            onClick={() => setPage(prev => (hasNextPage ? prev + 1 : prev))}
            disabled={!hasNextPage}
          >
            Next ▶
          </button>
        </div>
      </div>
    </main>
  );
}
