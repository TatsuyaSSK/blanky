import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.scss'],
})
export class WithdrawalComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private afn: AngularFireFunctions,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  withdrawal() {
    const callable = this.afn.httpsCallable('deleteAfUser');
    return callable(this.authService.uid)
      .toPromise()
      .then(() => {
        this.router.navigateByUrl('/');
        this.authService.afAuth.signOut().then(() => {
          this.snackBar.open('退会しました', null, {
            duration: 2000,
          });
        });
      });
  }
}
