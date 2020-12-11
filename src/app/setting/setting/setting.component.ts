import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { WithdrawalComponent } from '../withdrawal/withdrawal.component';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  questionNum: number;

  constructor(private authService: AuthService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.questionNum = 12;
  }

  openWithdrawalDialog() {
    const dialogRef = this.dialog.open(WithdrawalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
