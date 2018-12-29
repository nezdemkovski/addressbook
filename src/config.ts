import dotenv from 'dotenv';

dotenv.config();

export const PORT: number | string = process.env.PORT || 3000;

// MongoDB
export const MONGO_URL: string = process.env.MONGO_URL || '';
export const JWT_SECRET: string = process.env.JWT_SECRET || '';

// Firebase
export const FIREBASE_DB_URL: string = process.env.FIREBASE_DB_URL || '';
export const FIREBASE_PROJECT_ID: string =
  process.env.FIREBASE_PROJECT_ID || '';
export const FIREBASE_CLIENT_EMAIL: string =
  process.env.FIREBASE_CLIENT_EMAIL || '';
export const FIREBASE_PRIVATE_KEY: string = process.env.FIREBASE_PRIVATE_KEY
  ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  : '';
