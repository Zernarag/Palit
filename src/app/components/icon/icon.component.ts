import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type IconName =
  | 'home' | 'gavel' | 'plus-circle' | 'chat' | 'user' | 'back' | 'bell' | 'cart'
  | 'search' | 'heart' | 'share' | 'trash' | 'close' | 'pin' | 'truck' | 'card' | 'check' | 'logo'
  | 'phone' | 'shirt' | 'sparkle' | 'basket' | 'ball' | 'toy' | 'book' | 'wallet' | 'cash' | 'bank'
  | 'ticket' | 'bolt' | 'bag' | 'question' | 'star' | 'settings' | 'edit';

/** Inline SVG icons taken from the prototype's sprite (+ a few extras). */
@Component({
  selector: 'app-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (name === 'logo') {
      <svg class="logo" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M9 19c1-6.5 6.8-11.5 14.5-11.5 6 0 11.2 3.1 13.7 7.8"/>
        <path d="M31 8.5l6.7 6-7.4 3.3"/>
        <path d="M39 29c-1 6.5-6.8 11.5-14.5 11.5-6 0-11.2-3.1-13.7-7.8"/>
        <path d="M17 39.5l-6.7-6 7.4-3.3"/>
      </svg>
    } @else {
      <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"
           [style.fill]="filled ? 'currentColor' : 'none'">
        @switch (name) {
          @case ('home') { <path d="M3 11.5L12 4l9 7.5M5.5 10v9a1 1 0 001 1H9.5a1 1 0 001-1v-4a1 1 0 011-1h1a1 1 0 011 1v4a1 1 0 001 1H17.5a1 1 0 001-1v-9"/> }
          @case ('gavel') { <path d="M13.5 3.8l6.7 6.7M10.9 6.4l6.7 6.7M3.3 20.7h9M6.8 17.2l4.6-4.6 3.1 3.1-4.6 4.6-3.1-3.1z"/> }
          @case ('plus-circle') { <circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/> }
          @case ('chat') { <path d="M4 5h16v11H8.5l-4.5 4V5z"/> }
          @case ('user') { <circle cx="12" cy="8.2" r="3.6"/><path d="M4.4 20c1.4-3.9 4.6-6.1 7.6-6.1s6.2 2.2 7.6 6.1"/> }
          @case ('back') { <path d="M15 5l-7 7 7 7"/> }
          @case ('bell') { <path d="M6 9.5a6 6 0 0112 0v4.5l1.6 3H4.4L6 14V9.5z"/><path d="M10 20a2 2 0 004 0"/> }
          @case ('cart') { <path d="M3 4h2l2.4 12.2a2 2 0 002 1.8h7.2a2 2 0 002-1.8L20 8H6"/><circle cx="9.5" cy="20.4" r="1.3"/><circle cx="17" cy="20.4" r="1.3"/> }
          @case ('search') { <circle cx="10.3" cy="10.3" r="6.3"/><path d="M20 20l-4.85-4.85"/> }
          @case ('heart') { <path d="M12 20.6s-6.6-4.15-9.1-8.2C1.1 9.6 1.95 6.5 4.75 5.45c1.95-.73 4 .04 4.95 1.8.95-1.76 3-2.53 4.95-1.8 2.8 1.05 3.65 4.15 1.85 6.95-2.5 4.05-9.1 8.2-9.1 8.2z"/> }
          @case ('share') { <path d="M12 15V4M8 8l4-4 4 4M5 12v7a1 1 0 001 1h12a1 1 0 001-1v-7"/> }
          @case ('trash') { <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a1 1 0 001 1h8a1 1 0 001-1l1-12M9 7V4h6v3"/> }
          @case ('close') { <path d="M6 6l12 12M18 6L6 18"/> }
          @case ('pin') { <path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/> }
          @case ('truck') { <path d="M2 6h11v10H2zM13 9h4l3 3v4h-7"/><circle cx="6.5" cy="17.5" r="1.6"/><circle cx="16.5" cy="17.5" r="1.6"/> }
          @case ('card') { <rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19"/> }
          @case ('check') { <path d="M5 12.5l4.5 4.5L19 7.5"/> }
          @case ('phone') { <rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/> }
          @case ('shirt') { <path d="M8.5 3.5L3 6.5l2 4 2.5-1V20h9V9.5l2.5 1 2-4-5.5-3c-.5 1.5-1.8 2.5-3.5 2.5S9 5 8.5 3.5z"/> }
          @case ('sparkle') { <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z"/> }
          @case ('basket') { <path d="M3 9h18l-1.8 10a1.5 1.5 0 01-1.5 1.2H6.3A1.5 1.5 0 014.8 19L3 9zM8 9l3-5M16 9l-3-5"/> }
          @case ('ball') { <circle cx="12" cy="12" r="9"/><path d="M12 7.5l4 3-1.5 4.5h-5L8 10.5l4-3zM12 3v4.5M16 10.5l4.5-1.5M14.5 15l2.5 4M9.5 15L7 19M8 10.5L3.5 9"/> }
          @case ('toy') { <rect x="3" y="12" width="8" height="8" rx="1"/><rect x="13" y="12" width="8" height="8" rx="1"/><rect x="8" y="4" width="8" height="8" rx="1"/> }
          @case ('book') { <path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2V5zM4 19a2 2 0 012-2h13"/> }
          @case ('wallet') { <path d="M3 7.5A2.5 2.5 0 015.5 5H18v3M3 7.5V18a2 2 0 002 2h14a1 1 0 001-1V9a1 1 0 00-1-1H5.5A2.5 2.5 0 013 7.5z"/><circle cx="16.5" cy="14" r="1.2"/> }
          @case ('cash') { <rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.8"/><path d="M6 9.5v.1M18 14.5v.1"/> }
          @case ('bank') { <path d="M3 9.5L12 4l9 5.5H3zM5.5 12v6M10 12v6M14 12v6M18.5 12v6M3 20.5h18"/> }
          @case ('ticket') { <path d="M3 7h18v3a2 2 0 000 4v3H3v-3a2 2 0 000-4V7z"/><path d="M14 7v10" stroke-dasharray="2 2"/> }
          @case ('bolt') { <path d="M13 2.5L5 13.5h6L10 21.5l8-11h-6l1-8z"/> }
          @case ('bag') { <path d="M5 8h14l-1 12H6L5 8zM9 8V6.5a3 3 0 016 0V8"/> }
          @case ('question') { <circle cx="12" cy="12" r="9"/><path d="M9.3 9.3a2.7 2.7 0 115.1 1.2c-.6 1.1-2 1.3-2 2.8M12 17.2v.1"/> }
          @case ('star') { <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L12 16.9 6.7 19.7l1.1-5.9L3.5 9.7l5.9-.8L12 3.5z"/> }
          @case ('settings') { <path d="M10 2.5h4l.6 2.6c.7.2 1.4.6 2 1l2.5-.9 2 3.5-1.9 1.8a8 8 0 010 2l1.9 1.8-2 3.5-2.5-.9c-.6.4-1.3.8-2 1l-.6 2.6h-4l-.6-2.6c-.7-.2-1.4-.6-2-1l-2.5.9-2-3.5 1.9-1.8a8 8 0 010-2L2.9 8.7l2-3.5 2.5.9c.6-.4 1.3-.8 2-1L10 2.5z"/><circle cx="12" cy="12" r="3.2"/> }
          @case ('edit') { <path d="M4 16.5V20h3.5L19 8.5 15.5 5 4 16.5zM13.5 7l3.5 3.5"/> }
        }
      </svg>
    }
  `,
  styles: [`
    :host { display: inline-flex; line-height: 0; }
    .logo { width: 1em; height: 1em; fill: none; stroke: currentColor; stroke-width: 4.4; stroke-linecap: round; stroke-linejoin: round; }
    .icon { width: 1em; height: 1em; }
  `],
})
export class IconComponent {
  @Input({ required: true }) name!: IconName;
  @Input() filled = false;
}
