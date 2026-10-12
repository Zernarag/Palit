import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonBadge,
} from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  home,
  hammerOutline,
  hammer,
  addCircleOutline,
  addCircle,
  chatbubbleOutline,
  chatbubble,
  personOutline,
  person,
} from 'ionicons/icons';
import { getCartCount } from '../data/cart';

interface TabDef {
  id: 'home' | 'auction' | 'upload' | 'messages' | 'profile';
  label: string;
  icon: string;
  iconActive: string;
  badge?: 'cart' | 'messages';
}

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonBadge,
  ],
})
export class TabsPage {
  cartCount = 0;
  messagesCount = 0;

  constructor(private router: Router) {
    addIcons({
      homeOutline, home,
      hammerOutline, hammer,
      addCircleOutline, addCircle,
      chatbubbleOutline, chatbubble,
      personOutline, person,
    });
  }

  ionViewWillEnter(): void {
    this.refreshBadges();
  }

  private refreshBadges(): void {
    this.cartCount = getCartCount();
    // Placeholder — replace with real unread count from your data layer
    this.messagesCount = 2;
  }

  goToCart(event: Event): void {
    event.stopPropagation();
    this.router.navigateByUrl('/cart');
  }
}