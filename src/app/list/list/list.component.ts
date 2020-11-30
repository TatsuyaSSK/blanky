import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  form = this.fb.group({
    keyward: ['', [
      Validators.required,
      Validators.maxLength(20)
    ]],
    sort: ['', [
      Validators.required
    ]],
  });

  submit(){
    console.log(this.form.value)
  }

  get keywardControl(){
    return this.form.get('keyward') as FormControl
  }

  get sortControl(){
    return this.form.get('sort') as FormControl
  }

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

  }

}
