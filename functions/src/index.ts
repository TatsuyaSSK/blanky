import * as admin from 'firebase-admin';
admin.initializeApp();

export * from './user.function';
export { translateText } from './problem.function';
export * from './problem-search.function';
