import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { WithdrawalComponent } from '../withdrawal/withdrawal.component';
import { User } from '../../interfaces/user';
import { CropComponent } from '../crop/crop.component';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  questionNum: number;
  user$: Observable<User> = this.authService.user$;
  isUpdated = false;
  userName = new FormControl('', Validators.required);

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.questionNum = 12;
    this.isUpdated = false;
    this.user$.subscribe((user) => {
      this.userName.setValue(user.name);
    });
  }

  nameChanged() {
    this.isUpdated = true;
  }

  updateUserName() {
    const newName = this.userName.value;
    this.userService.updateUserName(this.authService.uid, newName).then(() => {
      this.snackBar.open('ユーザー名が更新されました', null, {
        duration: 2000,
      });
    });
  }

  openCropDialog(event: any): void {
    const dialogRef = this.dialog.open(CropComponent, {
      data: { event },
    });
  }

  openWithdrawalDialog() {
    const dialogRef = this.dialog.open(WithdrawalComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.snackBar.open('退会しました', null, {
        duration: 2000,
      });
    });
  }
}
