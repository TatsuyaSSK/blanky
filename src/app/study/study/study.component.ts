import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Problem } from 'src/app/interfaces/problem';
import { ProblemService } from 'src/app/services/problem.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss'],
})
export class StudyComponent implements OnInit {
  problem: Problem = {
    problemId: '',
    title: '',
    englishText: '',
    japaneseText: '',
    blankIndexes: [],
    correctAnswerRate: 0,
    createdAt: firebase.default.firestore.Timestamp.now(),
  };

  englishTextList: string[] = [];
  answerList: string[] = [];
  wordLengthList: number[] = [];
  blankList: boolean[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private problemService: ProblemService
  ) {}
  display: boolean;

  ngOnInit(): void {
    const type = this.route.snapshot.paramMap.get('type');
    const problemId = this.route.snapshot.paramMap.get('problemId');

    this.problemService
      .getProblembyProblemId(type, problemId)
      .subscribe((problem) => {
        this.problem = problem;
        this.createBlankProblem(problem.englishText, problem.blankIndexes);
      });

    this.display = false;
  }

  checkAnswer() {
    this.display = true;
  }

  createBlankProblem(englishText: string, blankIndexes: Array<number>) {
    this.englishTextList = englishText.split(' ').filter((word) => word !== '');
    this.wordLengthList = [...Array(this.englishTextList.length)].map(
      (_, i) => i
    );
    this.blankList = [...Array(this.englishTextList.length)].map(
      (_, i) => false
    );
    blankIndexes.forEach((index) => (this.blankList[index] = true));
    blankIndexes.forEach((index) =>
      this.answerList.push(this.englishTextList[index])
    );
  }

  onSubmit(event: any) {
    console.log(event.target.relief.value);
  }
}
