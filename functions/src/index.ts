import * as admin from 'firebase-admin';
admin.initializeApp();

export { createUser, deleteUser } from './user.function';
export { translateText } from './problem.function';
export * from './problem-search.function';
