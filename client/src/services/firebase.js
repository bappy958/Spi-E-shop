import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

export const isFirebaseConfigured = Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId
);

if (!isFirebaseConfigured) {
    console.error(
        '[Firebase] Missing Vite env vars. Create client/.env with VITE_FIREBASE_* values from Firebase Console (Project settings -> Your apps -> Web app).'
    );
}

// Initialize Firebase
const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;

if (app) {
    console.log('[Firebase] App initialized successfully');
}

// Initialize Firebase Authentication and get a reference to the service
export const auth = app ? getAuth(app) : null;

if (auth) {
    console.log('[Firebase] Auth service initialized');
}

export default app;
