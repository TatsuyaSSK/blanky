import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();
const projectId = 'blanky-2fc41';

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
  });
