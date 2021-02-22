import { Algolia } from './utils/algolia';
import * as functions from 'firebase-functions';

const algolia = new Algolia();

export const deleteAlgoliaProblem = functions
  .region('asia-northeast1')
  .firestore.document('problems/{uid}/{type}/{problemId}')
  .onDelete((snap) => {
    const data = snap.data();

    if (data) {
      return algolia.removeRecord('blanky_prod', data.problemId, 'problemId');
    } else {
      return;
    }
  });

export const updateAlgoliaProblem = functions
  .region('asia-northeast1')
  .firestore.document('problems/{uid}/{type}/{problemId}')
  .onUpdate((change) => {
    const data = change.after.data();
    return algolia.saveRecord({
      indexName: 'blanky_prod',
      largeConcentKey: 'englishText',
      isUpdate: true,
      data,
      idKey: 'problemId',
    });
  });
