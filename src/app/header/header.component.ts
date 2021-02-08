import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { StripeService } from '../services/stripe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$: Observable<User> = this.authService.user$;
  isPremium: boolean;

  constructor(
    private authService: AuthService,
    private StripeService: StripeService
  ) {}

  ngOnInit(): void {
    this.StripeService.getUserSubsription().subscribe((data) => {
      if (data.length === 0) {
        this.isPremium = false;
      } else {
        this.isPremium = true;
      }
    });
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
