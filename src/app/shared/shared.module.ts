import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { CardsComponent } from './cards/cards.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [CardsComponent, CardComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [CardsComponent],
})
export class SharedModule {}
