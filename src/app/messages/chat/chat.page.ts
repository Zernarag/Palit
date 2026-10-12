import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { CONVERSATIONS, Conversation } from '../../data/content';
import { BackNavigationService } from '../../data/navigation';

interface ChatMessage { from: 'me' | 'them'; text: string; }

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, IonContent],
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  private readonly backNavigation = inject(BackNavigationService);
  conversation!: Conversation;
  draft = '';
  messages: ChatMessage[] = [];
  private readonly seeds: Record<string, ChatMessage[]> = {
    store: [
      { from: 'them', text: 'Hi Juan! Welcome to Palit Official Store. How can we help today?' },
      { from: 'me', text: 'Is the Palm Buds Pro available in white?' },
      { from: 'them', text: 'Yes! We have White, Black, and Mango Orange in stock.' },
    ],
    support: [{ from: 'them', text: 'Your refund has been approved and will reflect in 3–5 business days.' }],
    courier: [{ from: 'them', text: "I'm on my way, ETA 20 mins." }],
  };

  constructor(private readonly route: ActivatedRoute, private readonly router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('conversationId') ?? 'store';
    this.conversation = CONVERSATIONS.find((item) => item.id === id) ?? CONVERSATIONS[0];
    this.messages = [...this.seeds[this.conversation.id]];
  }

  send(): void {
    const text = this.draft.trim();
    if (!text) return;
    this.messages.push({ from: 'me', text });
    this.draft = '';
  }

  back(): void { this.backNavigation.back('/tabs/messages'); }
}