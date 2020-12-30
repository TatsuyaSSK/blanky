import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Problem } from '../interfaces/problem';
import { AuthService } from './auth.service';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class ProblemService {
  constructor(private db: AngularFirestore, private authService: AuthService) {}

  createProblem(
    problem: Omit<
      Problem,
      'japaneseText' | 'blankIndexes' | 'correctAnswerRate' | 'createdAt'
    >,
    type: string
  ) {
    const problemId = this.db.createId();
    this.db
      .doc<Problem>(`problems/${this.authService.uid}/${type}/${problemId}`)
      .set({
        ...problem,
        japaneseText: '和訳文',
        blankIndexes: [1, 3, 5],
        correctAnswerRate: 0,
        createdAt: firebase.default.firestore.Timestamp.now(),
      });
  }
}
