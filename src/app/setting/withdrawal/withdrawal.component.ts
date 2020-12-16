import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.scss'],
})
export class WithdrawalComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  withdrawal() {
    this.authService.withdrawal();
  }
}
