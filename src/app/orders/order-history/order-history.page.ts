import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { getOrders, Order, PRODUCTS, findProduct, formatPrice } from '../../data';
import { BackNavigationService } from '../../data/navigation';

type Filter = 'all' | 'to-pay' | 'to-ship' | 'to-receive' | 'completed' | 'returns';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent],
})
export class OrderHistoryPage {
  private readonly backNavigation = inject(BackNavigationService);
  filter: Filter = 'all';
  orders: Order[] = [];

  filters: { id: Filter; label: string }[] = [
    { id: 'all',        label: 'All' },
    { id: 'to-pay',     label: 'To Pay' },
    { id: 'to-ship',    label: 'To Ship' },
    { id: 'to-receive', label: 'To Receive' },
    { id: 'completed',  label: 'Completed' },
    { id: 'returns',    label: 'Returns' },
  ];

  formatPrice = formatPrice;
  findProduct = findProduct;

  constructor(private router: Router) {}

  ionViewWillEnter(): void {
    this.applyFilter();
  }

  setFilter(f: Filter): void {
    this.filter = f;
    this.applyFilter();
  }

  private applyFilter(): void {
    const all = getOrders();
    switch (this.filter) {
      case 'to-pay':     this.orders = all.filter(o => o.status === 'To Pay'); break;
      case 'to-ship':    this.orders = all.filter(o => o.status === 'To Ship'); break;
      case 'to-receive': this.orders = all.filter(o => o.status === 'To Receive'); break;
      case 'completed':  this.orders = all.filter(o => o.status === 'Delivered'); break;
      case 'returns':    this.orders = []; break;
      default:           this.orders = all;
    }
  }

  statusClass(status: string): string {
    switch (status) {
      case 'Delivered':  return 'badge-new';
      case 'To Ship':    return 'badge-best';
      case 'To Receive': return 'badge-best';
      case 'To Pay':     return 'badge-sale';
      default:           return 'badge-best';
    }
  }

  openOrder(id: string): void {
    this.router.navigate(['/order-details', id]);
  }

  back(): void {
    this.backNavigation.back('/tabs/profile');
  }

  goShopping(): void {
    this.router.navigateByUrl('/tabs/home');
  }
}