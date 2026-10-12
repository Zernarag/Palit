import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IconComponent } from '../icon/icon.component';
import { StarsComponent } from '../icon/stars.component';
import { WishlistService } from '../../data/wishlist';
import { Product } from '../../data/products';
import { discountPct, peso } from '../../data/format';

@Component({
  selector: 'app-product-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [IconComponent, StarsComponent],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  private readonly router = inject(Router);
  private readonly toastCtrl = inject(ToastController);
  readonly wishlist = inject(WishlistService);
  readonly peso = peso;
  readonly discountPct = discountPct;

  open(): void { this.router.navigate(['/product-detail', this.product.id]); }

  async toggleHeart(ev: Event): Promise<void> {
    ev.stopPropagation();
    const added = this.wishlist.toggle(this.product.id);
    const t = await this.toastCtrl.create({
      message: added ? 'Added to wishlist' : 'Removed from wishlist',
      duration: 1200, position: 'bottom',
    });
    await t.present();
  }

}
