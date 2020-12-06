import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
}
