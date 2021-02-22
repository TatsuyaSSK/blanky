import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';

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
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {}

  withdrawal() {
    this.loadingService.isLoading = true;
    const callable = this.afn.httpsCallable('deleteAfUser');
    return callable(this.authService.uid)
      .toPromise()
      .then(() => {
        this.loadingService.isLoading = false;
        this.router.navigateByUrl('/');
        this.authService.afAuth.signOut().then(() => {
          this.snackBar.open('退会しました', null, {
            duration: 2000,
          });
        });
      });
  }
}
