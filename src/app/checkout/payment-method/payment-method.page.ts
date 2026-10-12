import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

import { IconComponent } from '../../components/icon/icon.component';
import { CheckoutService } from '../../data/checkout';
import { PAYMENT_METHODS } from '../../data/checkout';
import { BackNavigationService } from '../../data/navigation';

@Component({
  selector: 'app-payment-method',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IconComponent],
  templateUrl: './payment-method.page.html',
  styleUrls: ['./payment-method.page.scss'],
})
export class PaymentMethodPage {
  private readonly backNavigation = inject(BackNavigationService);
  private readonly router = inject(Router);
  readonly checkout = inject(CheckoutService);
  readonly methods = PAYMENT_METHODS;
  attemptedContinue = false;

  back(): void { this.backNavigation.back('/delivery-options'); }
  continue(): void {
    this.attemptedContinue = true;
    if (this.checkout.canContinue()) this.router.navigateByUrl('/checkout');
  }
}