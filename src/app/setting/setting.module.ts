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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { ProfileComponent } from './profile/profile.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [SettingComponent, WithdrawalComponent, CropComponent, ProfileComponent, PaymentComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    ImageCropperModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatTabsModule,
  ],
})
export class SettingModule {}
