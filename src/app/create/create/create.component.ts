import { Component, OnInit, } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  valid: boolean;

  form = this.fb.group({
    title: ['', [
      Validators.required,
      Validators.maxLength(40)
    ]],
    sentence: ['', [
      Validators.required,
      Validators.maxLength(1000)
    ]],
    types: this.fb.group(
      {
        random: [false],
        noun: [false],
        verb: [false],
        adjective: [false],
        adverb: [false],
       preposition: [false]
      })
  });

  get titleControl(){
    return this.form.get('title') as FormControl
  }

  get sentenceControl(){
    return this.form.get('sentence') as FormControl
  }

  submit(){
    console.log(this.form.value)
  }

  validateTypes() {
    this.valid = false;
    Object.values(this.form.value.types).forEach(value => {
      if (value) {
        this.valid = true;
      }
    });
  }

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(value => {
      this.validateTypes();
    })
  }

}
