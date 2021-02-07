import * as admin from 'firebase-admin';
admin.initializeApp();
export const db = admin.firestore();
export const bucket = admin.storage().bucket();

export * from './user.function';
export * from './problem.function';
export * from './problem-search.function';
export * from './sendmail.function';
