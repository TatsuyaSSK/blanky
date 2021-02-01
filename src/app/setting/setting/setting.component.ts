import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { WithdrawalComponent } from '../withdrawal/withdrawal.component';
import { User } from '../../interfaces/user';
import { CropComponent } from '../crop/crop.component';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  questionNum: number;
  user$: Observable<User> = this.authService.user$;
  isUpdated = false;

  constructor(private authService: AuthService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.questionNum = 12;
    this.isUpdated = false;
  }

  openCropDialog(event: any): void {
    const dialogRef = this.dialog.open(CropComponent, {
      data: { event },
    });
  }

  openWithdrawalDialog() {
    const dialogRef = this.dialog.open(WithdrawalComponent);
  }
}
