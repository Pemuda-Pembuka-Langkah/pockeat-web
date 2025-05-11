import * as admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app';

// Initialize Firebase Admin SDK
// This loads the service account credentials from environment variables or a file
const initializeFirebaseAdmin = () => {
  // Check if Firebase Admin is already initialized
  if (getApps().length === 0) {
    try {
      // Method 1: Using service account JSON directly in environment variable
      if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
        try {
          const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
          
          admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: process.env.FIREBASE_DATABASE_URL,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          });
        } catch (error) {
          console.error('Error parsing FIREBASE_SERVICE_ACCOUNT_JSON:', error);
          throw error;
        }
      }
      // Method 2: Using service account Path to JSON file (easier for development)
      else if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
        try {
          // This will be used when you have a local service account JSON file
          const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
          
          admin.initializeApp({
            credential: admin.credential.cert(serviceAccountPath),
            databaseURL: process.env.FIREBASE_DATABASE_URL,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          });
        } catch (error) {
          console.error('Error loading service account from path:', error);
          throw error;
        }
      }
      // Method 3: Fallback to application default credentials
      else {
        admin.initializeApp({
          credential: admin.credential.applicationDefault(),
        });
      }
      
      console.log('Firebase Admin SDK initialized successfully');
    } catch (error) {
      console.error('Firebase Admin SDK initialization error:', error);
      throw error;
    }
  }
  
  return admin;
};

// Export the Firebase Admin instance
const firebaseAdmin = initializeFirebaseAdmin();

// Export common services for easier imports elsewhere
export const auth = firebaseAdmin.auth();
export const firestore = firebaseAdmin.firestore();
export const storage = firebaseAdmin.storage();

export default firebaseAdmin;
