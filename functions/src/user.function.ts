import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { db, bucket } from './index';
const firebaseTools = require('firebase-tools');

export const createUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate(async (user) => {
    await createSampleData(user);
    return db.doc(`users/${user.uid}`).set({
      name: user.displayName,
      avatarURL: user.photoURL,
      email: user.email,
      createdAt: new Date(),
      createdQuestionNum: 0,
      uid: user.uid,
    });
  });

export const deleteAfUser = functions
  .region('asia-northeast1')
  .https.onCall((data, context) => {
    return admin.auth().deleteUser(data);
  });

export const deleteUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete((user) => {
    const promise1 = deleteUserImage(user);
    const promise2 = deleteUserData(user);
    const promise3 = deleteCustomerData(user);
    return Promise.all([promise1, promise2, promise3]);
  });

export const resetCreatedQuestionNum = functions
  .region('asia-northeast1')
  .pubsub.schedule('0 0 * * *')
  .timeZone('Asia/Tokyo')
  .onRun((context) => {
    return db
      .collection('users')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          return db.doc(`users/${doc.data().uid}`).update({
            createdQuestionNum: 0,
          });
        });
      });
  });

function createSampleData(user: admin.auth.UserRecord) {
  const problemId = db.collection('problems').doc().id;
  return db.doc(`problems/${user.uid}/random/${problemId}`).set({
    problemId,
    title: 'blankyへようこそ！',
    englishText:
      'blanky is a service that allows you to create your own original English questions just by uploading English sentences.',
    japaneseText: '和訳文',
    blankIndexes: [3, 5, 11, 14],
    correctAnswerRate: 0,
    createdAt: admin.firestore.Timestamp.now(),
    type: 'random',
    uid: user.uid,
  });
}

function deleteUserImage(user: admin.auth.UserRecord) {
  return bucket.deleteFiles({
    prefix: `users/${user.uid}`,
  });
}

function deleteUserData(user: admin.auth.UserRecord) {
  return db.doc(`users/${user.uid}`).delete();
}

async function deleteCustomerData(user: admin.auth.UserRecord) {
  const path = `customers/${user.uid}`;
  const token = await functions.config().fb.token;
  return firebaseTools.firestore.delete(path, {
    project: process.env.GCLOUD_PROJECT,
    recursive: true,
    yes: true,
    token,
  });
}
