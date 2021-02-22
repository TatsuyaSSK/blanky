import { Component, OnInit } from '@angular/core';
import { StripeService } from 'src/app/services/stripe.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  isPremium: boolean;
  customerPortalUrl: string;

  constructor(
    private stripeService: StripeService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.stripeService.getUserSubsription().subscribe((data) => {
      if (data.length === 0) {
        this.isPremium = false;
      } else {
        this.isPremium = true;
      }
    });

    this.stripeService.getCustomerPortalUrl().then((url: any) => {
      if (url) {
        this.customerPortalUrl = url;
      }
    });
  }

  redirectToCustomerPortal() {
    this.loadingService.isLoading = true;
    this.stripeService.getCustomerPortalUrl().then((url: any) => {
      this.loadingService.isLoading = false;
      window.location.assign(url);
    });
  }
}
