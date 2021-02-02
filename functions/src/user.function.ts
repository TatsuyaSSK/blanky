import * as functions from 'firebase-functions';
import Stripe from 'stripe';
import { stripe } from './utils/client';
import { auth, firestore } from 'firebase-admin';
import { db, bucket } from './index';

export const createUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate(async (user: auth.UserRecord) => {
    // stripe顧客作成
    const customer: Stripe.Customer = await stripe.customers.create({
      name: user.displayName,
      email: user.email,
    });

    // サンプルデータ作成
    const problemId = db.collection('problems').doc().id;
    const sampleData = await db
      .doc(`problems/${user.uid}/random/${problemId}`)
      .set({
        problemId,
        title: 'blankyへようこそ！',
        englishText:
          'blanky is a service that allows you to create your own original English questions just by uploading English sentences.',
        japaneseText: '和訳文',
        blankIndexes: [3, 5, 11, 14],
        correctAnswerRate: 0,
        createdAt: firestore.Timestamp.now(),
        type: 'random',
      });
    console.log(sampleData);

    // サンプルデータ作成→和訳文更新→algoliaにサンプルデータ作成

    // userデータ作成
    return db.doc(`users/${user.uid}`).set({
      name: user.displayName,
      avatarURL: user.photoURL,
      email: user.email,
      createdAt: new Date(),
      stripeId: customer.id,
      uid: user.uid,
    });
  });

export const deleteUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete(async (user) => {
    // stripe顧客削除
    let stripeId = '';
    let problemId = '';
    await db
      .doc(`users/${user.uid}`)
      .get()
      .then((doc) => {
        stripeId = doc.data()?.stripeId;
        problemId = doc.data()?.problemId;
      });
    const deleteStripeUser = await stripe.customers.del(stripeId);
    console.log(deleteStripeUser);

    // userのプロフィール画像削除
    const deleteUserImage = await bucket.deleteFiles({
      prefix: `users/${user.uid}`,
    });
    console.log(deleteUserImage);

    // userの問題削除
    const deleteUserProblem = await db
      .doc(`problems/${user.uid}/random/${problemId}`)
      .delete();
    console.log(`start to delete user data: ${deleteUserProblem}`);

    // 問題削除→algoliaの問題データ削除

    // userのデータ削除
    return db.doc(`users/${user.uid}`).delete();
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
