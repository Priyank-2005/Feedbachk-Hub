// File: src/app/api/admin/delete/route.ts
import { db } from '@/lib/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Feedback ID is required' }, { status: 400 });
  }

  try {
    await deleteDoc(doc(db, 'feedback', id));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Delete error:', err);
    return NextResponse.json({ error: 'Failed to delete feedback' }, { status: 500 });
  }
}
