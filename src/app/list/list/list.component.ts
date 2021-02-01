import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Problem } from 'src/app/interfaces/problem';
import { ProblemService } from 'src/app/services/problem.service';
import { SearchService } from 'src/app/services/search.service';
import { SearchIndex } from 'algoliasearch/lite';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  index: SearchIndex = this.searchService.index.dev_blanky_service;
  result: {
    nbHits: number;
    hits: any[];
  };
  isQuery: boolean;

  query = new FormControl('');

  typeDict: { [key: string]: string } = {
    ランダム: 'random',
    名詞: 'noun',
    動詞: 'verb',
    形容詞: 'adjective',
    副詞: 'adverb',
    前置詞: 'preposition',
  };

  type = 'random';

  problems: Problem[];

  sorts: any[] = [
    { value: 'nothing', viewValue: '条件なし' },
    { value: 'new', viewValue: '新着順' },
    { value: 'accuracy', viewValue: '正答率順' },
  ];

  constructor(
    private fb: FormBuilder,
    private problemService: ProblemService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.problemService.getProblemsbyType('random').subscribe((problems) => {
      this.problems = problems;
    });
    this.type = 'random';
    this.isQuery = false;
  }

  setProblemsbyType($event) {
    this.isQuery = false;
    this.query.setValue('');
    this.type = this.typeDict[$event['tab'].textLabel];
    this.problemService.getProblemsbyType(this.type).subscribe((problems) => {
      this.problems = problems;
    });
  }

  search(event: any) {
    if (event.target.value) {
      this.isQuery = true;
      this.index
        .search(event.target.value, { filters: `type:${this.type}` })
        .then((result) => {
          this.result = result;
        });
    } else {
      this.isQuery = false;
    }
  }
}
