import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Problem } from 'src/app/interfaces/problem';
import { ProblemService } from 'src/app/services/problem.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  valid: boolean;

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(40)]],
    englishText: ['', [Validators.required, Validators.maxLength(1000)]],
    types: this.fb.group({
      random: [false],
      noun: [false],
      verb: [false],
      adjective: [false],
      adverb: [false],
      preposition: [false],
    }),
  });

  get titleControl() {
    return this.form.get('title') as FormControl;
  }

  get sentenceControl() {
    return this.form.get('englishText') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private problemService: ProblemService
  ) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      this.validateTypes();
    });
  }

  submit() {
    const types: { [key: string]: boolean } = this.form.get('types').value;
    const selectedTypes: string[] = Object.keys(types).reduce((lis, key) => {
      if (types[key]) {
        lis.push(key);
      }
      return lis;
    }, []);
    const title: string = this.form.get('title').value;
    const englishText: string = this.form.get('englishText').value;
    const problem: Omit<
      Problem,
      | 'problemId'
      | 'japaneseText'
      | 'blankIndexes'
      | 'correctAnswerRate'
      | 'createdAt'
    > = {
      title,
      englishText,
    };
    selectedTypes.forEach((type) => {
      this.problemService.createProblem(problem, type);
    });
  }

  validateTypes() {
    this.valid = false;
    Object.values(this.form.value.types).forEach((value) => {
      if (value) {
        this.valid = true;
      }
    });
  }
}
