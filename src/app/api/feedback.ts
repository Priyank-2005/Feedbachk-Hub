// File: src/pages/api/feedback.ts

import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

const feedbackFilePath = path.join(process.cwd(), 'data', 'feedback.json');

// Ensure 'data' folder exists
if (!fs.existsSync(path.dirname(feedbackFilePath))) {
  fs.mkdirSync(path.dirname(feedbackFilePath));
}

// Read feedback entries from file
const getFeedbackData = () => {
  try {
    const data = fs.readFileSync(feedbackFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

// Save feedback to file
const saveFeedbackData = (data: any) => {
  fs.writeFileSync(feedbackFilePath, JSON.stringify(data, null, 2));
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const newFeedback = {
      id: Date.now().toString(),
      name: name || 'Anonymous',
      email: email || 'Not provided',
      message,
      date: new Date().toISOString(),
    };

    const existingFeedback = getFeedbackData();
    existingFeedback.push(newFeedback);
    saveFeedbackData(existingFeedback);

    return res.status(201).json({ success: true, feedback: newFeedback });
  }

  if (req.method === 'GET') {
    const feedback = getFeedbackData();
    return res.status(200).json({ feedback });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
