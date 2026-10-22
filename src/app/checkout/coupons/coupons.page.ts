import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

import { IconComponent } from '../../components/icon/icon.component';
import { CartService } from '../../data/cart';
import { CheckoutService } from '../../data/checkout';
import { COUPONS } from '../../data/coupons';
import { peso } from '../../data/format';
import { BackNavigationService } from '../../data/navigation';

@Component({
  selector: 'app-coupons',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IconComponent],
  templateUrl: './coupons.page.html',
  styleUrls: ['./coupons.page.scss'],
})
export class CouponsPage {
  private readonly backNavigation = inject(BackNavigationService);
  private readonly router = inject(Router);
  readonly cart = inject(CartService);
  readonly checkout = inject(CheckoutService);
  readonly coupons = COUPONS;
  readonly peso = peso;
  couponInput = '';

  back(): void { this.backNavigation.back('/checkout'); }
  continue(): void { this.router.navigateByUrl('/address'); }
  eligible(minSpend: number): boolean { return this.cart.checkoutSubtotal() >= minSpend; }

  apply(code = this.couponInput): void {
    this.checkout.applyCoupon(code);
    if (!this.checkout.couponError()) this.couponInput = '';
  }

  removeCoupon(): void {
    this.cart.removeCoupon();
    this.checkout.clearCouponError();
  }
}