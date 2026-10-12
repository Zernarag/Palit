import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { IconComponent } from '../components/icon/icon.component';
import { BackNavigationService } from '../data/navigation';
import { FAQS, NOTIFICATIONS, REWARD_ITEMS, saveUserProfile, USER } from '../data/content';

type ToolScreen = 'settings' | 'edit-profile' | 'rewards' | 'notifications' | 'help-center';
type NotificationFilter = 'all' | 'orders' | 'promos' | 'chat';

@Component({
  selector: 'app-profile-tool',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IconComponent],
  templateUrl: './profile-tool.page.html',
  styleUrls: ['./profile-tool.page.scss'],
})
export class ProfileToolPage {
  private readonly backNavigation = inject(BackNavigationService);
  readonly screen: ToolScreen;
  readonly faqs = FAQS;
  readonly rewards = REWARD_ITEMS;
  readonly notifications = NOTIFICATIONS.map((item) => ({ ...item }));
  readonly user = USER;
  notificationFilter: NotificationFilter = 'all';
  points = USER.points;
  profileDraft = { name: USER.name, email: USER.email };
  pushNotifications = true;
  darkMode = false;
  language = 'English';
  feedback = '';

  constructor(route: ActivatedRoute, private readonly router: Router) {
    const screen = route.snapshot.data['screen'] as ToolScreen | undefined;
    this.screen = screen ?? 'settings';
  }

  get title(): string {
    return {
      settings: 'Settings',
      'edit-profile': 'Edit profile',
      rewards: 'Rewards & Points',
      notifications: 'Notifications',
      'help-center': 'Help Center',
    }[this.screen];
  }

  get pointsPercent(): number { return Math.min(100, this.points / 30); }

  get visibleNotifications() {
    return this.notifications.filter((item) => {
      if (this.notificationFilter === 'all') return true;
      const category = /order|delivery/i.test(item.title) ? 'orders'
        : /message|seller|chat/i.test(item.title) ? 'chat' : 'promos';
      return category === this.notificationFilter;
    });
  }

  back(): void {
    this.backNavigation.back(this.screen === 'notifications' ? '/tabs/home' : '/tabs/profile');
  }
  navigate(path: string): void { this.router.navigateByUrl(path); }

  markAllRead(): void {
    this.notifications.forEach((item) => item.unread = false);
  }

  saveProfile(): void {
    const name = this.profileDraft.name.trim();
    const email = this.profileDraft.email.trim();
    if (!name || !email) {
      this.feedback = 'Enter your name and email address.';
      return;
    }
    saveUserProfile({ name, email });
    this.router.navigateByUrl('/tabs/profile');
  }

  redeem(cost: number, name: string): void {
    if (this.points < cost) {
      this.feedback = 'You need more points to redeem this reward.';
      return;
    }
    this.points -= cost;
    this.feedback = `${name} redeemed. It has been added to your coupons.`;
  }

  openSupportChat(): void { this.router.navigate(['/chat', 'support']); }
}