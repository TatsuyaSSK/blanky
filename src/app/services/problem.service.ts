import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Problem } from '../interfaces/problem';
import { AuthService } from './auth.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import * as pos from 'parts-of-speech';
@Injectable({
  providedIn: 'root',
})
export class ProblemService {
  constructor(private db: AngularFirestore, private authService: AuthService) {}

  countWords(englishText: string) {
    return englishText.split(' ').filter((word) => word !== '').length;
  }

  createBlankIndexesbyRandom(textLength: number, ratio = 0.2) {
    const blankIndexes: number[] = [];
    for (let i = 0; i < textLength + 1; i++) {
      if (Math.random() <= ratio) {
        blankIndexes.push(i);
      }
    }
    return blankIndexes;
  }

  createBlankIndexesbyPartOfSpeech(
    englishText: string,
    type: string
  ): number[] {
    const blankIndexes: number[] = [];
    let tags: string[] = [];
    switch (type) {
      case 'noun':
        tags = ['NN', 'NNP', 'NNPS', 'NNS'];
        break;
      case 'verb':
        tags = ['VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ'];
        break;
      case 'adjective':
        tags = ['JJ', 'JJR', 'JJS'];
        break;
      case 'adverb':
        tags = ['RB', 'RBR', 'RBS'];
        break;
      case 'preposition':
        tags = ['IN'];
        break;

      default:
        console.log('type is not matched');
    }
    const partsOfSpeech = pos;
    const englishWords = new partsOfSpeech.Lexer().lex(englishText);
    const tagger = new partsOfSpeech.Tagger();
    const taggedWords = tagger.tag(englishWords);
    const taggedWordsDeleted = taggedWords.filter(
      (taggedWord) => taggedWord[1] !== '.' && taggedWord[1] !== ','
    );

    for (let i = 0; i < taggedWordsDeleted.length; i++) {
      const taggedWord = taggedWordsDeleted[i];
      const tag = taggedWord[1];
      if (tags.includes(tag)) {
        blankIndexes.push(i);
      }
    }
    return blankIndexes;
  }

  async createProblem(
    problem: Omit<
      Problem,
      | 'problemId'
      | 'japaneseText'
      | 'blankIndexes'
      | 'correctAnswerRate'
      | 'createdAt'
    >
  ) {
    let blankIndexes: number[];
    const problemId = this.db.createId();
    if (problem.type === 'random') {
      blankIndexes = this.createBlankIndexesbyRandom(
        this.countWords(problem.englishText)
      );
    } else {
      blankIndexes = this.createBlankIndexesbyPartOfSpeech(
        problem.englishText,
        problem.type
      );
    }
    this.db
      .doc<Problem>(
        `problems/${this.authService.uid}/${problem.type}/${problemId}`
      )
      .set({
        problemId,
        ...problem,
        japaneseText: '和訳文',
        blankIndexes,
        correctAnswerRate: 0,
        createdAt: firebase.default.firestore.Timestamp.now(),
      });
  }

  getProblemsbyType(type: string): Observable<Problem[]> {
    return this.db
      .collection<Problem>(`problems/${this.authService.uid}/${type}`, (ref) =>
        ref.orderBy('createdAt', 'desc')
      )
      .valueChanges();
  }

  getProblembyProblemId(type: string, problemId: string): Observable<Problem> {
    return this.db
      .doc<Problem>(`problems/${this.authService.uid}/${type}/${problemId}`)
      .valueChanges();
  }

  updateCorrectAnswerRate(
    correctAnswerRate: number,
    type: string,
    problemId: string
  ) {
    return this.db
      .doc<Problem>(`problems/${this.authService.uid}/${type}/${problemId}`)
      .update({
        correctAnswerRate,
      });
  }

  deleteProblem(uid: string, type: string, problemId: string) {
    this.db.doc<Problem>(`problems/${uid}/${type}/${problemId}`).delete();
  }
}
