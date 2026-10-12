import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonFooter, IonHeader, IonToolbar } from '@ionic/angular';
import { CartService } from '../../data/cart';
import { WishlistService } from '../../data/wishlist';
import { PRODUCTS, Product, formatPrice } from '../../data';
import { BackNavigationService } from '../../data/navigation';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonFooter, IonHeader, IonToolbar],
})
export class ProductDetailPage implements OnInit {
  private readonly backNavigation = inject(BackNavigationService);
  product!: Product;
  related: Product[] = [];
  qty = 1;
  variantIndex = 0;
  cartCount = 0;

  formatPrice = formatPrice;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cart: CartService,
    private wishlist: WishlistService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
    this.related = PRODUCTS.filter((p) => p.cat === this.product.cat && p.id !== this.product.id);
  }

  ionViewWillEnter(): void { this.cartCount = this.cart.count(); }

  get discountPct(): number {
    if (!this.product.old) return 0;
    return Math.round((1 - this.product.price / this.product.old) * 100);
  }
  get selectedVariant(): string { return this.product.variants[this.variantIndex]; }
  get isWished(): boolean { return this.wishlist.has(this.product.id); }

  selectVariant(i: number): void { this.variantIndex = i; }
  changeQty(d: number): void { this.qty = Math.max(1, this.qty + d); }
  toggleHeart(): void { this.wishlist.toggle(this.product.id); }
  share(): void { /* native share via Capacitor later */ }

  addToCartNow(): void {
    this.cart.add(this.product.id, this.qty, this.selectedVariant);
    this.cartCount = this.cart.count();
  }
  buyNow(): void {
    this.cart.add(this.product.id, this.qty, this.selectedVariant);
    this.router.navigate(['/checkout']);
  }
  openRelated(id: string): void { this.router.navigate(['/product-detail', id]); }
  openReviews(): void { this.router.navigate(['/reviews', this.product.id]); }
  back(): void { this.backNavigation.back('/tabs/home'); }
}