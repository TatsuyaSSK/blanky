import { Component, OnInit } from '@angular/core';
import { StripeService } from 'src/app/services/stripe.service';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';
import { LoadingService } from '../../services/loading.service';
@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent implements OnInit {
  sessionId;
  constructor(
    private stripeService: StripeService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.stripeService.addCheckoutSession().then((ref) => {
      ref.onSnapshot((snap) => {
        const { error, sessionId } = snap.data();
        if (error) {
          alert(`エラーが発生しました: ${error.message}`);
        }
        if (sessionId) {
          this.sessionId = sessionId;
        }
      });
    });
  }

  redirectToCheckout() {
    this.loadingService.isLoading = true;
    this.stripeService.addCheckoutSession().then((ref) => {
      ref.onSnapshot((snap) => {
        const { error, sessionId } = snap.data();
        if (error) {
          alert(`エラーが発生しました: ${error.message}`);
        }
        if (sessionId) {
          const stripe = loadStripe(environment.stripe.publicKey);
          stripe.then((stripe) => {
            this.loadingService.isLoading = false;
            stripe.redirectToCheckout({ sessionId: this.sessionId });
          });
        }
      });
    });
  }
}
