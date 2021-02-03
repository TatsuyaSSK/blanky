export interface Problem {
  problemId: string;
  title: string;
  englishText: string;
  japaneseText: string;
  blankIndexes: Array<number>;
  correctAnswerRate: number;
  createdAt: firebase.default.firestore.Timestamp;
  type: string;
  uid: string;
}
