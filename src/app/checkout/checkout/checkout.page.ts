import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

import { CartService } from '../../data/cart';
import { CheckoutService } from '../../data/checkout';
import { IconComponent } from '../../components/icon/icon.component';
import { peso } from '../../data/format';
import { BackNavigationService } from '../../data/navigation';

@Component({
  selector: 'app-checkout',
  standalone: true,
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  imports: [CommonModule, IonContent, IconComponent],
})
export class CheckoutPage {
  private readonly backNavigation = inject(BackNavigationService);
  private readonly router = inject(Router);
  readonly cart = inject(CartService);
  readonly checkout = inject(CheckoutService);
  readonly peso = peso;

  back(): void { this.backNavigation.back('/cart'); }
  goCart(): void { this.router.navigateByUrl('/cart'); }
  editCoupons(): void { this.router.navigateByUrl('/coupons'); }
  editAddress(): void { this.router.navigateByUrl('/address'); }
  editPayment(): void { this.router.navigateByUrl('/payment-method'); }
  continueShopping(): void {
    this.checkout.reset();
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }

  continueToPayment(): void {
    if (this.checkout.canContinue()) this.router.navigateByUrl('/payment-confirmation');
    else this.router.navigateByUrl('/payment-method');
  }
}
