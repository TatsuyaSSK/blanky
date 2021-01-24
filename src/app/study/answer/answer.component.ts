import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
})
export class AnswerComponent implements OnInit {
  @Input() blankList;
  @Input() englishTextList;
  @Input() filledDict;
  @Input() answerDict;
  @Input() wordLengthList;
  @Input() correctAnswerRate;
  @Input() problemNum;
  @Input() correctAnswerNum;
  @Input() isBlankList;

  @Output() transitioned = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  transition(isClicked: boolean) {
    this.transitioned.emit(isClicked);
  }
}
