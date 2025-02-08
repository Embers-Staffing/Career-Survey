import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence, collection, getDocs, query, limit, doc, getDoc } from 'firebase/firestore';
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
  authDomainEndsWithFirebaseapp: firebaseConfig.authDomain?.endsWith('firebaseapp.com') || false,
  projectIdMatches: firebaseConfig.projectId === 'career-survey-ec41a'
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

// Initialize Firestore
let db;
try {
  db = getFirestore(app);
  console.log('Firestore initialized successfully');
  
  // Enable offline persistence
  enableIndexedDbPersistence(db)
    .then(() => {
      console.log('Firestore persistence enabled');
    })
    .catch((err) => {
      console.error('Firestore persistence error:', err);
    });
} catch (error) {
  console.error('Firestore initialization error:', error);
  throw error;
}

// Initialize Auth
const auth = getAuth(app);

// Log auth state for debugging
auth.onAuthStateChanged((user) => {
  console.log('Auth state changed:', user ? 'User logged in' : 'No user');
  if (user) {
    console.log('User email:', user.email);
    console.log('User ID:', user.uid);
    
    // Test Firestore access with specific document
    const testDocRef = doc(db, 'responses', 'Hs0jUS0glqNbLTR5Wbvv');
    getDoc(testDocRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          console.log('Test document exists:', docSnap.data());
        } else {
          console.log('Test document does not exist');
        }
      })
      .catch(error => console.error('Firestore read test failed:', error));
  }
});

export { db, auth };

// Test auth configuration
auth.useDeviceLanguage();
console.log('Auth domain:', auth.config.authDomain);
console.log('API key valid:', !!auth.config.apiKey); 