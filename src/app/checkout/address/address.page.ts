import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

import { IconComponent } from '../../components/icon/icon.component';
import { CheckoutService } from '../../data/checkout';
import { ADDRESSES } from '../../data/checkout';
import { BackNavigationService } from '../../data/navigation';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule, IonContent, IconComponent],
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage {
  private readonly backNavigation = inject(BackNavigationService);
  private readonly router = inject(Router);
  readonly checkout = inject(CheckoutService);
  readonly addresses = ADDRESSES;

  back(): void { this.backNavigation.back('/checkout'); }
  continue(): void { this.router.navigateByUrl('/delivery-options'); }
}