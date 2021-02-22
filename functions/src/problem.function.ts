import * as functions from 'firebase-functions';
import { db } from './index';
const firebaseTools = require('firebase-tools');

const projectId = 'blanky-prod';

const { Translate } = require('@google-cloud/translate').v2;
const translateInstance = new Translate({ projectId });

async function translate(englishText: string, language: string) {
  const [translation] = await translateInstance.translate(
    englishText,
    language
  );
  return translation;
}

export const translateText = functions
  .region('asia-northeast1')
  .firestore.document(`problems/{uid}/{type}/{problemId}`)
  .onCreate((snap, context) => {
    const newValue = snap.data();
    if (
      newValue.title === 'blankyへようこそ！' &&
      newValue.englishText ===
        'blanky is a service that allows you to create your own original English questions just by uploading English sentences.'
    ) {
      return db
        .doc(
          `problems/${context.params.uid}/${context.params.type}/${context.params.problemId}`
        )
        .update({
          japaneseText:
            'blankyは、英語の文章をアップロードするだけであなただけのオリジナルの英語問題を作成することができるサービスです。',
        });
    } else {
      const englishText = newValue.englishText;
      return translate(englishText, 'ja').then((translation) => {
        return db
          .doc(
            `problems/${context.params.uid}/${context.params.type}/${context.params.problemId}`
          )
          .update({
            japaneseText: translation,
          });
      });
    }
  });

export const deleteUserProblems = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete(async (user) => {
    const path = `problems/${user.uid}`;
    const token = await functions.config().fb.token;
    return firebaseTools.firestore.delete(path, {
      project: process.env.GCLOUD_PROJECT,
      recursive: true,
      yes: true,
      token,
    });
  });
