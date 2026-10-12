import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

import { IconComponent } from '../../components/icon/icon.component';
import { CheckoutService } from '../../data/checkout';
import { DELIVERY_OPTIONS, GIFT_WRAP_FEE } from '../../data/checkout';
import { peso } from '../../data/format';
import { BackNavigationService } from '../../data/navigation';

@Component({
  selector: 'app-delivery-options',
  standalone: true,
  imports: [CommonModule, IonContent, IconComponent],
  templateUrl: './delivery-options.page.html',
  styleUrls: ['./delivery-options.page.scss'],
})
export class DeliveryOptionsPage {
  private readonly backNavigation = inject(BackNavigationService);
  private readonly router = inject(Router);
  readonly checkout = inject(CheckoutService);
  readonly options = DELIVERY_OPTIONS;
  readonly giftWrapFee = GIFT_WRAP_FEE;
  readonly peso = peso;

  back(): void { this.backNavigation.back('/address'); }
  continue(): void { this.router.navigateByUrl('/payment-method'); }
}