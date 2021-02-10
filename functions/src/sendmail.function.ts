import * as functions from 'firebase-functions';
import { sendEmail } from './utils/sendgrid';
import { db } from './index';

export const welcomeEmail = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate((user) => {
    if (user.email) {
      return sendEmail({
        to: user.email,
        templateId: 'd-b8d37070fbbe468398d4b91ab6aa089c',
        dynamicTemplateData: {
          subject: 'blankyへようこそ！',
          name: user.displayName,
        },
      });
    } else {
      return null;
    }
  });

export const startSubscriptionEmail = functions
  .region('asia-northeast1')
  .firestore.document(`customers/{uid}/subscriptions/{subscriptionsId}`)
  .onCreate((snap, context) => {
    const data = snap.data();
    if (data.status === 'active') {
      return db
        .doc(`users/${context.params.uid}`)
        .get()
        .then((user) => {
          return sendEmail({
            to: user.data()?.email,
            templateId: 'd-f441894439bc4787b3668423e4114f5f',
            dynamicTemplateData: {
              subject: 'プレミアムプランに変更されました',
              plan: 'プレミアムプラン',
            },
          });
        });
    } else {
      return null;
    }
  });

export const restartSubscriptionEmail = functions
  .region('asia-northeast1')
  .firestore.document(`customers/{uid}/subscriptions/{subscriptionsId}`)
  .onUpdate((snap, context) => {
    const data = snap.after.data();
    if (data.status === 'active' && data.cancel_at_period_end) {
      return db
        .doc(`users/${context.params.uid}`)
        .get()
        .then((user) => {
          return sendEmail({
            to: user.data()?.email,
            templateId: 'd-f441894439bc4787b3668423e4114f5f',
            dynamicTemplateData: {
              subject: 'プレミアムプランに変更されました',
              plan: 'プレミアムプラン',
            },
          });
        });
    } else {
      return null;
    }
  });

export const stopSubscriptionEmail = functions
  .region('asia-northeast1')
  .firestore.document(`customers/{uid}/subscriptions/{subscriptionsId}`)
  .onUpdate((snap, context) => {
    const data = snap.after.data();
    if (data.status === 'active' && data.canceled_at_period_end) {
      return db
        .doc(`users/${context.params.uid}`)
        .get()
        .then((user) => {
          return sendEmail({
            to: user.data()?.email,
            templateId: 'd-5678181464fe40bcafd6272414776823',
            dynamicTemplateData: {
              subject: 'プレミアムプランが解約されました',
              plan: 'プレミアムプラン',
              cancel_at: data.cancel_at,
            },
          });
        });
    } else {
      return null;
    }
  });

export const farewellEmail = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete((user) => {
    if (user.email) {
      return sendEmail({
        to: user.email,
        templateId: 'd-f277afeff42a460187957615df4b89ec',
        dynamicTemplateData: {
          subject: 'blankyを退会しました',
          name: user.displayName,
        },
      });
    } else {
      return null;
    }
  });
