import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with explicit database URL
const db = getFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
  host: 'firestore.googleapis.com',
  ssl: true,
  databaseURL: `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)`,
});

// Log initialization details
console.log('Firebase initialized with config:', {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain,
  databaseURL: `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)`
});

// Verify database connection
try {
  const dbTest = getFirestore();
  console.log('Database connection test:', dbTest ? 'Successful' : 'Failed');
} catch (error) {
  console.error('Database connection error:', error);
}

export { db }; 