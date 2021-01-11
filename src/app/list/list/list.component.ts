import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Problem } from 'src/app/interfaces/problem';
import { ProblemService } from 'src/app/services/problem.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  typeDict: { [key: string]: string } = {
    ランダム: 'random',
    名詞: 'noun',
    動詞: 'verb',
    形容詞: 'adjective',
    副詞: 'adverb',
    前置詞: 'preposition',
  };

  problems: Problem[];

  sorts: any[] = [
    { value: 'nothing', viewValue: '条件なし' },
    { value: 'new', viewValue: '新着順' },
    { value: 'accuracy', viewValue: '正答率順' },
  ];

  form = this.fb.group({
    keyward: ['', []],
    sort: [''],
  });

  submit() {
    console.log(this.form.value);
  }

  get keywardControl() {
    return this.form.get('keyward') as FormControl;
  }

  get sortControl() {
    return this.form.get('sort') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private problemService: ProblemService
  ) {}

  ngOnInit(): void {
    this.problemService.getProblemsbyType('random').subscribe((problems) => {
      this.problems = problems;
    });
  }

  setProblemsbyType($event) {
    const type = this.typeDict[$event['tab'].textLabel];
    this.problemService.getProblemsbyType(type).subscribe((problems) => {
      this.problems = problems;
    });
  }
}
