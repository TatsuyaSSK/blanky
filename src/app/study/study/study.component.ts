import { Component, OnInit } from '@angular/core';
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
  answerDict: { [key: number]: string } = {};
  wordIndexList: number[] = [];
  wordLengthList: number[] = [];
  blankList: boolean[] = [];
  blankIndexes: number[];
  filledDict: { [key: number]: string } = {};
  problemNum: number;
  correctAnswerRate: number;
  correctAnswerNum = 0;
  type: string;
  problemId: string;
  display: boolean;

  constructor(
    private route: ActivatedRoute,
    private problemService: ProblemService
  ) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type');
    this.problemId = this.route.snapshot.paramMap.get('problemId');

    this.problemService
      .getProblembyProblemId(this.type, this.problemId)
      .subscribe((problem) => {
        this.problem = problem;
        this.createBlankProblem(problem.englishText, problem.blankIndexes);
      });

    this.display = false;
  }

  createBlankProblem(englishText: string, blankIndexes: Array<number>) {
    this.blankIndexes = blankIndexes;
    this.problemNum = blankIndexes.length;
    this.englishTextList = englishText.split(' ').filter((word) => word !== '');
    this.wordLengthList = this.englishTextList.map((word) => {
      return word.length;
    });
    this.wordIndexList = [...Array(this.englishTextList.length)].map(
      (_, i) => i
    );
    this.blankList = [...Array(this.englishTextList.length)].map(
      (_, i) => false
    );
    blankIndexes.forEach((index) => {
      this.blankList[index] = true;
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

  setFilledDict() {
    for (let i = 0; i < this.problemNum; i++) {
      const value = document.forms['problems'].elements[i].value;
      if (value === '') {
        this.filledDict[this.blankIndexes[i]] = '---';
      } else {
        this.filledDict[this.blankIndexes[i]] = value.replace(/^\s+|\s+$/g, '');
      }
    }
  }

  calculateCorrectAnswerRate(
    filledDict: { [key: number]: string },
    answerDict: { [key: number]: string }
  ) {
    this.correctAnswerNum = 0;
    for (const key in filledDict) {
      if (filledDict[key] === answerDict[key]) {
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
    this.setFilledDict();
    this.calculateCorrectAnswerRate(this.filledDict, this.answerDict);
    this.updateCorrectAnswerRate(
      this.correctAnswerRate,
      this.type,
      this.problemId
    );
    this.display = true;
  }

  onTransitioned(isClicked: boolean) {
    isClicked ? (this.display = false) : (this.display = true);
  }
}
