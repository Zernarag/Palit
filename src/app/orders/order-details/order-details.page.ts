import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { CartService } from '../../data/cart';
import { BackNavigationService } from '../../data/navigation';
import {
  getOrders,
  Order,
  findProduct,
  formatPrice,
} from '../../data';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent],
})
export class OrderDetailsPage implements OnInit {
  private readonly backNavigation = inject(BackNavigationService);
  order!: Order;

  formatPrice = formatPrice;
  findProduct = findProduct;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cart: CartService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('orderId');
    this.order = getOrders().find((o) => o.id === id) || getOrders()[0];
  }

  /* ---------- Actions ---------- */
  trackOrder(): void {
    this.router.navigate(['/order-tracking', this.order.id]);
  }

  requestReturn(): void {
    /* hook up native dialog later */
  }

  buyAgain(): void {
    this.order.items.forEach((line) => {
      this.cart.add(line.id, line.qty, line.variant);
    });
    this.router.navigateByUrl('/cart');
  }

  downloadInvoice(): void {
    /* hook up Capacitor Filesystem later */
  }

  back(): void {
    this.backNavigation.back('/order-history');
  }
}