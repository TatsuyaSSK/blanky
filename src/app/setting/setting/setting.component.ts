import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  questionNum: number;

  constructor() { }

  ngOnInit(): void {
    this.questionNum = 12;
  }

}
