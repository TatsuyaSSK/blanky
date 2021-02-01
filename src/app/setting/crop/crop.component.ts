import { Component, Inject, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crop',
  templateUrl: './crop.component.html',
  styleUrls: ['./crop.component.scss'],
})
export class CropComponent implements OnInit {
  imageChangedEvent = '';
  croppedImage = '';
  imageSelecter: any;

  isLoading: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { event: any },
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.imageChangedEvent = this.data.event;
  }

  imageCropped(imageChangedEvent: ImageCroppedEvent) {
    this.croppedImage = imageChangedEvent.base64;
  }

  updateAvatar() {
    if (this.croppedImage) {
      this.userService
        .updateAvatar(this.authService.uid, this.croppedImage)
        .then(() => {
          this.router.navigateByUrl('/setting');
          this.snackBar.open('プロフィール画像が更新されました', null, {
            duration: 2000,
          });
        });
    }
  }
}
