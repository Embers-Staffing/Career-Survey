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

// Test Firestore access with better error handling
const testFirestoreAccess = async (user) => {
  try {
    console.log('Testing Firestore access...');
    
    // First try to read the test collection
    const testRef = collection(db, 'test');
    const testQuery = query(testRef, limit(1));
    const testSnapshot = await getDocs(testQuery);
    console.log('Test collection read successful');

    // Then try to read responses
    const responsesRef = collection(db, 'responses');
    const q = query(responsesRef, limit(1));
    const querySnapshot = await getDocs(q);
    console.log('Responses read successful, found', querySnapshot.size, 'documents');
    
    querySnapshot.forEach((doc) => {
      console.log('Document ID:', doc.id);
      console.log('Document exists:', doc.exists());
      if (doc.exists()) {
        const data = doc.data();
        console.log('Document data:', {
          userId: data.userId,
          submittedAt: data.submittedAt,
          // Log other non-sensitive fields
        });
      }
    });
  } catch (error) {
    console.error('Firestore access error:', error.code, error.message);
    if (error.code === 'permission-denied') {
      console.error('Permission denied. Please check Firestore rules.');
    }
  }
};

// Update the auth state change handler
auth.onAuthStateChanged((user) => {
  console.log('Auth state changed:', user ? 'User logged in' : 'No user');
  if (user) {
    console.log('User email:', user.email);
    console.log('User ID:', user.uid);
    testFirestoreAccess(user);
  }
});

export { db, auth };

// Test auth configuration
auth.useDeviceLanguage();
console.log('Auth domain:', auth.config.authDomain);
console.log('API key valid:', !!auth.config.apiKey); 