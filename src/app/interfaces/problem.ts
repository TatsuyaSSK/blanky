export interface Problem {
  title: string;
  englishText: string;
  japaneseText: string;
  blankIndexes: Array<number>;
  correctAnswerRate: number;
  createdAt: firebase.default.firestore.Timestamp;
}
