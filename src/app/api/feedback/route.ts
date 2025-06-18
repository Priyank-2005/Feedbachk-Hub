import { db } from '@/lib/firebase';
import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  addDoc,
} from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '5', 10);

  try {
    const feedbackRef = collection(db, 'feedback');

    // Get all feedbacks ordered by date (newest first)
    const allSnapshot = await getDocs(query(feedbackRef, orderBy('date', 'desc')));
    const allDocs = allSnapshot.docs;

    // Manual pagination logic
    const startIndex = (page - 1) * limit;
    const paginatedDocs = allDocs.slice(startIndex, startIndex + limit);

    const feedbacks = paginatedDocs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: (doc.data().date as Timestamp)?.toDate().toISOString(),
    }));

    return NextResponse.json({ feedbacks });
  } catch (err) {
    console.error('Error fetching feedbacks:', err);
    return NextResponse.json({ error: 'Failed to fetch feedbacks' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!message || message.trim() === '') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const feedbackRef = collection(db, 'feedback');
    await addDoc(feedbackRef, {
      name: name || 'Anonymous',
      email: email || 'N/A',
      message,
      date: Timestamp.now(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error saving feedback:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
