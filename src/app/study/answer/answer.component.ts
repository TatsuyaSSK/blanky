import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
})
export class AnswerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() wordIndexList;
  @Input() blankList;
  @Input() englishTextList;
  @Input() filledDict;
  @Input() answerDict;
  @Input() wordLengthList;
  @Input() correctAnswerRate;
  @Input() problemNum;
  @Input() correctAnswerNum;

  @Output() transitioned = new EventEmitter<boolean>();

  transition(isClicked: boolean) {
    this.transitioned.emit(isClicked);
  }
}
