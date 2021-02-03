import * as functions from 'firebase-functions';
import Stripe from 'stripe';
import { stripe } from './utils/client';
import { auth, firestore } from 'firebase-admin';
import { db, bucket } from './index';
const firebaseTools = require('firebase-tools');

export const createUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate(async (user: auth.UserRecord) => {
    const customer: Stripe.Customer = await createStripeCustomer(user);
    const promise1 = createSampleData(user);
    const promise2 = createUserData(user, customer);
    return Promise.all([promise1, promise2])
      .then(() => {
        console.log('新規登録は正常に実行されました');
      })
      .catch(() => {
        console.log('新規登録に失敗しました');
      });
  });

export const deleteUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete((user) => {
    const promise1 = deleteStripeCustomer(user);
    const promise2 = deleteUserImage(user);
    const promise3 = deleteUserProblems(user);
    const promise4 = deleteUserData(user);
    return Promise.all([promise1, promise2, promise3, promise4])
      .then(() => {
        console.log('退会処理は正常に実行されました');
      })
      .catch(() => {
        console.log('退会処理に失敗しました');
      });
  });

export const updateStripeUser = functions
  .region('asia-northeast1')
  .firestore.document(`users/{uid}`)
  .onUpdate((change) => {
    const data = change.after.data();
    return stripe.customers.update(data.stripeId, {
      name: data.name,
    });
  });

function createStripeCustomer(user: auth.UserRecord) {
  return stripe.customers.create({
    name: user.displayName,
    email: user.email,
  });
}

function createSampleData(user: auth.UserRecord) {
  const problemId = db.collection('problems').doc().id;
  const sampleData = db.doc(`problems/${user.uid}/random/${problemId}`).set({
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
  console.log(sampleData);
}

function createUserData(user: auth.UserRecord, customer: Stripe.Customer) {
  return db.doc(`users/${user.uid}`).set({
    name: user.displayName,
    avatarURL: user.photoURL,
    email: user.email,
    createdAt: new Date(),
    stripeId: customer.id,
    uid: user.uid,
  });
}

function deleteStripeCustomer(user: auth.UserRecord) {
  let stripeId = '';
  return db
    .doc(`users/${user.uid}`)
    .get()
    .then((doc) => {
      stripeId = doc.data()?.stripeId;
    })
    .then(() => {
      return stripe.customers.del(stripeId);
    });
}

function deleteUserImage(user: auth.UserRecord) {
  return bucket.deleteFiles({
    prefix: `users/${user.uid}`,
  });
}

async function deleteUserProblems(user: auth.UserRecord) {
  const path = `problems/${user.uid}`;
  const token = await functions.config().fb.token;
  return firebaseTools.firestore.delete(path, {
    project: process.env.GCLOUD_PROJECT,
    recursive: true,
    yes: true,
    token,
  });
}

function deleteUserData(user: auth.UserRecord) {
  return db.doc(`users/${user.uid}`).delete();
}
