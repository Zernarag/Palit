import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

import { IconComponent } from '../../components/icon/icon.component';
import { CheckoutService } from '../../data/checkout';
import { peso } from '../../data/format';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule, IonContent, IconComponent],
  templateUrl: './order-confirmation.page.html',
  styleUrls: ['./order-confirmation.page.scss'],
})
export class OrderConfirmationPage {
  private readonly router = inject(Router);
  readonly checkout = inject(CheckoutService);
  readonly peso = peso;

  continueShopping(): void {
    this.checkout.reset();
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }
}