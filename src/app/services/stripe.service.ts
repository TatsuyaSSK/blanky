import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { AngularFireFunctions } from '@angular/fire/functions';
import firebase from 'firebase/app';
@Injectable({
  providedIn: 'root',
})
export class StripeService {
  customerPortalUrl: string;

  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    private afn: AngularFireFunctions
  ) {}

  addCheckoutSession() {
    const docRef = this.db
      .collection('customers')
      .doc(this.authService.uid)
      .collection('checkout_sessions')
      .add({
        price: environment.stripe.price,
        tax_rates: [environment.stripe.tax_rates],
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    return docRef;
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

  async getCustomerPortalUrl() {
    const functionRef = firebase
      .app()
      .functions('asia-northeast1')
      .httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink');
    const { data } = await functionRef({ returnUrl: window.location.origin });
    return data.url;
  }
}
