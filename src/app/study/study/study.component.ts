import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss'],
})
export class StudyComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  display: boolean;
  buttonValid: boolean;

  form = this.fb.group({
    one: [''],
    two: [''],
    three: [''],
    four: [''],
  });

  checkAnswer() {
    this.display = true;
    this.buttonValid = true;
    console.log(this.form.value);
  }

  ngOnInit(): void {
    this.display = false;
    this.buttonValid = false;
  }
}
