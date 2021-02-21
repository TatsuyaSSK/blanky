import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudyRoutingModule } from './study-routing.module';
import { StudyComponent } from './study/study.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AnswerComponent } from './answer/answer.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [StudyComponent, AnswerComponent],
  imports: [
    CommonModule,
    StudyRoutingModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
})
export class StudyModule {}
