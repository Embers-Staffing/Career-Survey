import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

// Debug environment variables
console.log('Environment Variables Check:', {
  apiKey: !!import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: !!import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: !!import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: !!import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: !!import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: !!import.meta.env.VITE_FIREBASE_APP_ID
});

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Debug actual config (without exposing sensitive data)
console.log('Firebase Config Check:', {
  hasApiKey: !!firebaseConfig.apiKey,
  hasAuthDomain: !!firebaseConfig.authDomain,
  hasProjectId: !!firebaseConfig.projectId,
  hasStorageBucket: !!firebaseConfig.storageBucket,
  hasMessagingSenderId: !!firebaseConfig.messagingSenderId,
  hasAppId: !!firebaseConfig.appId,
  authDomainEndsWithFirebaseapp: firebaseConfig.authDomain?.endsWith('firebaseapp.com') || false
});

// Validate config
if (!firebaseConfig.apiKey) {
  throw new Error('Firebase API Key is missing');
}

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error);
  throw error;
}

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);

// Log auth state for debugging
auth.onAuthStateChanged((user) => {
  console.log('Auth state changed:', user ? 'User logged in' : 'No user');
  if (user) {
    console.log('User email:', user.email);
    console.log('User ID:', user.uid);
  }
});

// Test auth configuration
auth.useDeviceLanguage();
console.log('Auth domain:', auth.config.authDomain);
console.log('API key valid:', !!auth.config.apiKey); 