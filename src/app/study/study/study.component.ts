import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Problem } from 'src/app/interfaces/problem';
import { ProblemService } from 'src/app/services/problem.service';
import * as firebase from 'firebase';
import { FormArray, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

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
    type: '',
    uid: '',
  };

  englishTextList: string[] = [];
  answerList: string[] = [];
  wordLengthList: number[] = [];
  blankList: number[] = [];
  blankIndexes: number[];
  isBlankList: number[] = [];
  filledDict: { [key: number]: string } = {};
  answerDict: { [key: number]: string } = {};
  problemNum: number;
  correctAnswerRate: number;
  correctAnswerNum = 0;
  type: string;
  problemId: string;
  display: boolean;
  fills: FormArray = new FormArray([]);
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private problemService: ProblemService
  ) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type');
    this.problemId = this.route.snapshot.paramMap.get('problemId');

    this.subscription = this.problemService
      .getProblembyProblemId(this.type, this.problemId)
      .subscribe((problem) => {
        this.problem = problem;
        this.createBlankProblem(problem.englishText, problem.blankIndexes);
        this.setFormControl(this.blankIndexes);
      });

    this.display = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createBlankProblem(englishText: string, blankIndexes: Array<number>) {
    this.blankIndexes = blankIndexes;
    this.problemNum = blankIndexes.length;
    this.englishTextList = englishText.split(' ').filter((word) => word !== '');
    this.wordLengthList = this.englishTextList.map((word) => {
      return word.length;
    });
    this.blankList = [...Array(this.englishTextList.length)].map(
      (_, i) => null
    );
    this.isBlankList = [...Array(this.englishTextList.length)].map(
      (_, i) => null
    );
    blankIndexes.forEach((index, i) => {
      this.isBlankList[index] = i + 1;
      this.blankList[index] = i;
    });

    blankIndexes.forEach((index) => {
      const end = this.englishTextList[index].slice(-1);
      if (end === ',' || end === '.') {
        this.answerList.push(
          this.englishTextList[index].slice(
            0,
            this.englishTextList[index].length - 1
          )
        );
      } else {
        this.answerList.push(this.englishTextList[index]);
      }
    });

    for (let i = 0; i < this.blankIndexes.length; i++) {
      this.answerDict[this.blankIndexes[i]] = this.answerList[i];
    }
  }

  setFormControl(blankIndexes: number[]) {
    blankIndexes.forEach((index) => {
      this.fills.push(new FormControl(''));
    });
  }

  calculateCorrectAnswerRate() {
    this.fills.value.map((value, i) => {
      if (value === '') {
        this.filledDict[this.blankIndexes[i]] = '';
      } else {
        this.filledDict[this.blankIndexes[i]] = value.replace(/^\s+|\s+$/g, '');
      }
    });

    this.correctAnswerNum = 0;

    for (const key in this.filledDict) {
      if (this.filledDict[key] === this.answerDict[key]) {
        this.correctAnswerNum += 1;
      }
    }
    this.correctAnswerRate = Math.floor(
      (this.correctAnswerNum / this.problemNum) * 100
    );
  }

  updateCorrectAnswerRate(
    correctAnswerRate: number,
    type: string,
    problemId: string
  ) {
    this.problemService.updateCorrectAnswerRate(
      correctAnswerRate,
      type,
      problemId
    );
  }

  onSubmit() {
    this.calculateCorrectAnswerRate();
    this.updateCorrectAnswerRate(
      this.correctAnswerRate,
      this.type,
      this.problemId
    );
    this.fills = new FormArray([]);
    this.display = true;
  }

  onTransitioned(isClicked: boolean) {
    isClicked ? (this.display = false) : (this.display = true);
  }
}
