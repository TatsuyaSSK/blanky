import { Algolia } from './utils/algolia';
import * as functions from 'firebase-functions';

const algolia = new Algolia();

export const deleteProblem = functions
  .region('asia-northeast1')
  .firestore.document('problems/{uid}/{type}/{problemId}')
  .onDelete((snap) => {
    const data = snap.data();

    if (data) {
      return algolia.removeRecord(
        'dev_blanky_service',
        data.problemId,
        'problemId'
      );
    } else {
      return;
    }
  });

export const updateProblem = functions
  .region('asia-northeast1')
  .firestore.document('problems/{uid}/{type}/{problemId}')
  .onUpdate((change) => {
    const data = change.after.data();
    return algolia.saveRecord({
      indexName: 'dev_blanky_service',
      largeConcentKey: 'englishText',
      isUpdate: true,
      data,
      idKey: 'problemId',
    });
  });
