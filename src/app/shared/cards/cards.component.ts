import { Component, OnInit, Input } from '@angular/core';
import { ProblemService } from 'src/app/services/problem.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  @Input() problems;
  @Input() type;
  @Input() isQuery;
  @Input() result;

  constructor() {}

  ngOnInit(): void {}
}
