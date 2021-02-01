import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting/setting.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CropComponent } from './crop/crop.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [SettingComponent, WithdrawalComponent, CropComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    ImageCropperModule,
    MatSnackBarModule,
  ],
})
export class SettingModule {}
