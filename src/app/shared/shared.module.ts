import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { CardsComponent } from './cards/cards.component';
import { CardComponent } from './card/card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [CardsComponent, CardComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule,
    MatMenuModule,
  ],
  exports: [CardsComponent, MatIconModule],
})
export class SharedModule {}
