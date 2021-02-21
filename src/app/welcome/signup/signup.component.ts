import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<SignupComponent>
  ) {}

  ngOnInit(): void {}

  login() {
    this.dialogRef.close();
    this.authService.login();
  }
}
