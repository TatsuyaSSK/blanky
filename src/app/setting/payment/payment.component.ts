import { Component, OnInit } from '@angular/core';
import { StripeService } from 'src/app/services/stripe.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  isPremium: boolean;
  customerPortalUrl: string;

  constructor(private stripeService: StripeService) {}

  ngOnInit(): void {
    this.stripeService.getUserSubsription().subscribe((data) => {
      if (data.length === 0) {
        this.isPremium = false;
      } else {
        this.isPremium = true;
      }
    });

    this.stripeService.getCustomerPortalUrl().then((url) => {
      this.customerPortalUrl = url;
    });
  }

  redirectToCustomerPortal() {
    window.location.assign(this.customerPortalUrl);
  }
}
