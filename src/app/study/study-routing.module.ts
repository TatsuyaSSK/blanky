import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnswerComponent } from './answer/answer.component';
import { StudyComponent } from './study/study.component';

const routes: Routes = [
  {
    path: '',
    component: StudyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudyRoutingModule {}
