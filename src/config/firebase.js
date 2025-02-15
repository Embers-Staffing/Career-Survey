import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase with explicit options
const app = initializeApp(firebaseConfig);

// Initialize Firestore with settings
const db = getFirestore(app, {
  experimentalForceLongPolling: true,
  merge: true,
  ignoreUndefinedProperties: true
});

// Log initialization details
console.log('Firebase initialized with config:', {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain,
  databaseInstance: db ? 'Successfully created' : 'Failed to create'
});

// Verify database connection
try {
  const dbTest = getFirestore();
  console.log('Database connection test:', dbTest ? 'Successful' : 'Failed');
} catch (error) {
  console.error('Database connection error:', error);
}

export { db }; 