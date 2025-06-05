import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBE1SaZ_t97p-MlYERol3KxSBbyuP_sIg8",
  authDomain: "base-de-datos-2edb6.firebaseapp.com",
  projectId: "base-de-datos-2edb6",
  storageBucket: "base-de-datos-2edb6.firebasestorage.app",
  messagingSenderId: "264604820551",
  appId: "1:264604820551:web:ff46ca587897fe7f947d62",
  measurementId: "G-4S39DRN2T3"
};

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
export const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
  } else if (err.code === 'unimplemented') {
    console.warn('The current browser doesn\'t support offline persistence');
  }
});

// Enable Firestore logging in development
if (process.env.NODE_ENV === 'development') {
  console.log('Firestore initialized');
}