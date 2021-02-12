import { Component, OnInit } from '@angular/core';
import { StripeService } from 'src/app/services/stripe.service';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent implements OnInit {
  sessionId;
  constructor(private stripeService: StripeService) {}

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

  async redirectToCheckout() {
    if (this.sessionId) {
      const stripe = await loadStripe(environment.stripe.publicKey);
      stripe.redirectToCheckout({ sessionId: this.sessionId });
    } else {
      alert('もう一度お試しください');
    }
  }
}
