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
  .onCreate(async (snap, context) => {
    const data = snap.data();
    if (data.status === 'active') {
      await db
        .doc(`users/${context.params.uid}`)
        .get()
        .then((user) => {
          return sendEmail({
            to: user.data()?.email,
            templateId: 'd-31035badd7cc4654a4c059308e1eb894',
            dynamicTemplateData: {
              subject: 'プレミアムプランに登録しました',
              plan: 'プレミアムプラン',
            },
          });
        });
    }
  });

export const stopSubscriptionEmail = functions
  .region('asia-northeast1')
  .firestore.document(`customers/{uid}/subscriptions/{subscriptionsId}`)
  .onUpdate(async (snap, context) => {
    const data = snap.after.data();
    if (data.status !== 'canceled' && data.canceled_at !== 'null') {
      await db
        .doc(`users/${context.params.uid}`)
        .get()
        .then((user) => {
          return sendEmail({
            to: user.data()?.email,
            templateId: 'd-2eaa7c53a9864ee88ccfc4fbc4799afe',
            dynamicTemplateData: {
              subject: 'プレミアムプランが解約されました',
              plan: 'プレミアムプラン',
              cancel_at: data.cancel_at,
            },
          });
        });
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
