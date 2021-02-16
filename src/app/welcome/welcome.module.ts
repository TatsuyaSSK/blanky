import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeroComponent } from './hero/hero.component';
import { UseComponent } from './use/use.component';
import { PlansComponent } from './plans/plans.component';

@NgModule({
  declarations: [WelcomeComponent, HeroComponent, UseComponent, PlansComponent],
  imports: [CommonModule, WelcomeRoutingModule],
})
export class WelcomeModule {}
