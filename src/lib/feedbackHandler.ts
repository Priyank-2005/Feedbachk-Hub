import fs from 'fs';
import path from 'path';
import { Feedback } from '@/types/feedback';

const filePath = path.join(process.cwd(), 'data', 'feedback.json');

export function getAllFeedback(): Feedback[] {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

export function saveFeedback(feedback: Feedback) {
  const data = getAllFeedback();
  data.push(feedback);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function deleteFeedback(id: string) {
  const data = getAllFeedback();
  const filtered = data.filter(item => item.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2));
}
