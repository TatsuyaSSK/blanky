import { Component, OnInit } from '@angular/core';
import { StripeService } from 'src/app/services/stripe.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent implements OnInit {
  constructor(private stripeService: StripeService) {}

  ngOnInit(): void {}

  redirectToCheckout() {
    this.stripeService.redirectToCheckout();
  }
}
