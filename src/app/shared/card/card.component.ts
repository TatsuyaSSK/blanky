import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProblemService } from 'src/app/services/problem.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() problem;
  @Input() type;

  constructor(
    private problemService: ProblemService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  deleteProblem() {
    this.problemService.deleteProblem(
      this.authService.uid,
      this.type,
      this.problem.problemId
    );
  }
}
