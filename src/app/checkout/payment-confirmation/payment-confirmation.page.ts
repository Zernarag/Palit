import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

import { IconComponent } from '../../components/icon/icon.component';
import { CartService } from '../../data/cart';
import { CheckoutService } from '../../data/checkout';
import { peso } from '../../data/format';
import { BackNavigationService } from '../../data/navigation';

@Component({
  selector: 'app-payment-confirmation',
  standalone: true,
  imports: [CommonModule, IonContent, IconComponent],
  templateUrl: './payment-confirmation.page.html',
  styleUrls: ['./payment-confirmation.page.scss'],
})
export class PaymentConfirmationPage {
  private readonly backNavigation = inject(BackNavigationService);
  private readonly router = inject(Router);
  readonly cart = inject(CartService);
  readonly checkout = inject(CheckoutService);
  readonly peso = peso;

  back(): void { this.backNavigation.back('/checkout'); }

  confirm(): void {
    if (!this.cart.checkoutLines().length) {
      this.router.navigateByUrl('/cart');
      return;
    }
    const order = this.checkout.confirmPayment();
    if (order) this.router.navigateByUrl('/order-confirmation');
  }
}