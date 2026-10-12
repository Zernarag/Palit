import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController, IonContent } from '@ionic/angular';

import { CartService } from '../../data/cart';
import { IconComponent } from '../../components/icon/icon.component';
import { peso } from '../../data/format';
import { BackNavigationService } from '../../data/navigation';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  imports: [CommonModule, IonContent, IconComponent],
})
export class CartPage {
  private readonly backNavigation = inject(BackNavigationService);
  private readonly router = inject(Router);
  private readonly alertCtrl = inject(AlertController);
  readonly cart = inject(CartService);
  readonly peso = peso;

  back(): void { this.backNavigation.back('/tabs/home'); }
  startShopping(): void { this.router.navigateByUrl('/tabs/home'); }
  openProduct(id: string): void { this.router.navigate(['/product-detail', id]); }
  checkout(): void { this.router.navigateByUrl('/checkout'); }

  async confirmClear(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Clear cart?',
      message: 'This removes every item from your cart.',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Clear', role: 'destructive', handler: () => this.cart.clear() },
      ],
    });
    await alert.present();
  }
}
