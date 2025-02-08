import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  query, 
  limit, 
  doc, 
  getDoc,
  initializeFirestore,
  persistentLocalCache,
  persistentSingleTabManager
} from 'firebase/firestore';
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

// Initialize Firestore with new persistence settings
let db;
try {
  db = initializeFirestore(app, {
    cache: persistentLocalCache({
      tabManager: persistentSingleTabManager()
    })
  });
  console.log('Firestore initialized successfully');
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
    
    // Test Firestore access
    try {
      const responsesRef = collection(db, 'responses');
      const q = query(responsesRef, limit(1));
      getDocs(q)
        .then((querySnapshot) => {
          console.log('Firestore read successful, found', querySnapshot.size, 'documents');
          querySnapshot.forEach((doc) => {
            console.log('Document data:', doc.data());
          });
        })
        .catch((error) => {
          console.error('Firestore read error:', error);
        });
    } catch (error) {
      console.error('Firestore query setup error:', error);
    }
  }
});

export { db, auth };

// Test auth configuration
auth.useDeviceLanguage();
console.log('Auth domain:', auth.config.authDomain);
console.log('API key valid:', !!auth.config.apiKey); 