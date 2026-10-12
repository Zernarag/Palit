import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { getOrders, Order } from '../../data';
import { BackNavigationService } from '../../data/navigation';

interface TimelineStep {
  label: string;
  date: string;
  state: 'done' | 'now' | 'pending';
}

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.page.html',
  styleUrls: ['./order-tracking.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent],
})
export class OrderTrackingPage implements OnInit, OnDestroy {
  private readonly backNavigation = inject(BackNavigationService);
  order!: Order;
  timeline: TimelineStep[] = [];
  now = Date.now();

  private ticker: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('orderId');
    this.order = getOrders().find((o) => o.id === id) || getOrders()[0];
    this.timeline = this.buildTimeline();
    this.ticker = setInterval(() => (this.now = Date.now()), 30000);
  }

  ngOnDestroy(): void {
    if (this.ticker) clearInterval(this.ticker);
  }

  private buildTimeline(): TimelineStep[] {
    const status = this.order?.status ?? 'To Ship';

    /* Map order status → progress index */
    const progressByStatus: Record<string, number> = {
      'To Pay':     0,
      'To Ship':    1,
      'To Receive': 3,
      'Delivered':  4,
    };

    const current = progressByStatus[status] ?? 0;

    const steps: { label: string; date: string }[] = [
      { label: 'Order Placed',    date: 'Aug 8, 10:14 AM' },
      { label: 'Packed',          date: 'Aug 8, 1:02 PM'  },
      { label: 'Shipped',         date: 'Aug 8, 4:40 PM'  },
      { label: 'Out for Delivery', date: 'Aug 9, 9:05 AM' },
      { label: 'Delivered',       date: ''                },
    ];

    return steps.map((s, i) => {
      let state: 'done' | 'now' | 'pending' = 'pending';
      if (i < current) state = 'done';
      else if (i === current) state = 'now';
      return { ...s, state };
    });
  }

  callRider(): void {
    /* hook up to Capacitor later */
  }

  chatCourier(): void {
    this.router.navigate(['/chat', 'courier']);
  }

  back(): void {
    this.backNavigation.back(`/order-details/${this.order.id}`);
  }
}