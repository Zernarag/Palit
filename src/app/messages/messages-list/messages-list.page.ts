import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { CONVERSATIONS } from '../../data/content';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  imports: [CommonModule, RouterLink, IonContent],
  templateUrl: './messages-list.page.html',
  styleUrls: ['./messages-list.page.scss'],
})
export class MessagesListPage {
  readonly conversations = CONVERSATIONS;
  readonly previews: Record<string, string> = {
    store: 'Yes, available in Sunset Orange!',
    support: 'Your refund has been approved.',
    courier: "I'm on my way, ETA 20 mins.",
  };
  readonly unread: Record<string, number> = { store: 0, support: 1, courier: 1 };

  constructor(private readonly router: Router) {}

  open(id: string): void { this.router.navigate(['/chat', id]); }
}