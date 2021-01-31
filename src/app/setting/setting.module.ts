import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting/setting.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [SettingComponent, WithdrawalComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
  ],
})
export class SettingModule {}
