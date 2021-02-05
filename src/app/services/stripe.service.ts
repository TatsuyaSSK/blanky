import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  customerPortalUrl: string;

  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    private fns: AngularFireFunctions,
    private NgZone: NgZone
  ) {}

  async redirectToCheckout() {
    const docRef = await this.db
      .collection('customers')
      .doc(this.authService.uid)
      .collection('checkout_sessions')
      .add({
        price: environment.stripe.price,
        tax_rates: [environment.stripe.tax_rates],
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        alert(`エラーが発生しました: ${error.message}`);
      }
      if (sessionId) {
        const stripe = await loadStripe(environment.stripe.publicKey);
        stripe.redirectToCheckout({ sessionId });
      }
    });
  }

  getUserSubsription() {
    return this.db
      .collection('customers')
      .doc(this.authService.uid)
      .collection('subscriptions', (ref) =>
        ref.where('status', 'in', ['trialing', 'active'])
      )
      .valueChanges();
  }

  async redirectToCustomerPortal() {
    const functionRef = firebase
      .app()
      .functions('asia-northeast1')
      .httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink');
    const { data } = await functionRef({ returnUrl: window.location.origin });
    window.location.assign(data.url);
  }
}
