// src/utils/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDmgSWZ4flTW8Evo-yA-ns77Bk7dyo9QnQ",
  authDomain: "feedback-hub-94b08.firebaseapp.com",
  projectId: "feedback-hub-94b08",
  storageBucket: "feedback-hub-94b08.firebasestorage.app",
  messagingSenderId: "524680230319",
  appId: "1:524680230319:web:ab61566a6cc18a52066b5a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
