import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Problem } from 'src/app/interfaces/problem';
import { ProblemService } from 'src/app/services/problem.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StripeService } from 'src/app/services/stripe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  valid: boolean;
  isPremium: boolean;
  createdQuestionNum: number;
  currentCreatedQuestionNum: number;

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
    private problemService: ProblemService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    private stripeService: StripeService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      this.validateTypes();
      this.countCheckNum();
    });
    this.stripeService.getUserSubsription().subscribe((data) => {
      if (data.length === 0) {
        this.isPremium = false;
      } else {
        this.isPremium = true;
      }
    });
    this.authService.user$.subscribe((user) => {
      this.createdQuestionNum = user.createdQuestionNum;
      this.currentCreatedQuestionNum = user.createdQuestionNum;
    });
  }

  async submit() {
    const types: { [key: string]: boolean } = this.form.get('types').value;
    const selectedTypes: string[] = Object.keys(types).reduce((lis, key) => {
      if (types[key]) {
        lis.push(key);
      }
      return lis;
    }, []);
    const title: string = this.form.get('title').value;
    const englishText: string = this.form.get('englishText').value;
    const uid = this.authService.uid;
    await selectedTypes.forEach((type) => {
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
        type,
        uid,
      };
      this.problemService.createProblem(problem);
    });
    this.userService.updateUserCreatedQuestionNum(
      uid,
      this.currentCreatedQuestionNum
    );
    this.router.navigateByUrl('/');
    this.snackBar.open('問題を作成しました', null, {
      duration: 2000,
    });
  }

  countCheckNum() {
    this.currentCreatedQuestionNum = this.createdQuestionNum;
    Object.values(this.form.value.types).forEach((value) => {
      if (value) {
        this.currentCreatedQuestionNum += 1;
      }
    });

    if (this.isPremium === true) {
      if (this.currentCreatedQuestionNum > 10) {
        this.valid = false;
      }
    } else {
      if (this.currentCreatedQuestionNum > 3) {
        this.valid = false;
      }
    }
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
