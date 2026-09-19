import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDsJRg76lOzMOThlYRkjAiCyYtVqZpDHwI',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'perfumestore-2006.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'perfumestore-2006',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'perfumestore-2006.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '58660354',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:58660354:web:a6ef79ff5b3d5b6d1df91b',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-V138TNVPD0',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app, 'asia-east1');
export default app;
