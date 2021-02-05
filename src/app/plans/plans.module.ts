import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlansRoutingModule } from './plans-routing.module';
import { PlansComponent } from './plans/plans.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [PlansComponent],
  imports: [CommonModule, PlansRoutingModule, MatButtonModule],
})
export class PlansModule {}
