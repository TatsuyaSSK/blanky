import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CropComponent } from '../crop/crop.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user$: Observable<User> = this.authService.user$;
  userName = new FormControl('', Validators.required);
  isUpdated = false;

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
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
}
