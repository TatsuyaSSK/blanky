import * as functions from 'firebase-functions';
import { auth, firestore } from 'firebase-admin';
import { db } from './index';

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

export const deleteUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete((user) => {
    return db.doc(`users/${user.uid}`).delete();
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

function createSampleData(user: auth.UserRecord) {
  const problemId = db.collection('problems').doc().id;
  return db.doc(`problems/${user.uid}/random/${problemId}`).set({
    problemId,
    title: 'blankyへようこそ！',
    englishText:
      'blanky is a service that allows you to create your own original English questions just by uploading English sentences.',
    japaneseText: '和訳文',
    blankIndexes: [3, 5, 11, 14],
    correctAnswerRate: 0,
    createdAt: firestore.Timestamp.now(),
    type: 'random',
    uid: user.uid,
  });
}
