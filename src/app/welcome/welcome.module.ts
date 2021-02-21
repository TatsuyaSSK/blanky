import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeroComponent } from './hero/hero.component';
import { UseComponent } from './use/use.component';
import { PlansComponent } from './plans/plans.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [WelcomeComponent, HeroComponent, UseComponent, PlansComponent, SignupComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class WelcomeModule {}
