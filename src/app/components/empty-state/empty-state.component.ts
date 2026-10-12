import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class EmptyStateComponent {
  /** SVG symbol id, e.g. 'icon-cart', 'icon-heart' */
  @Input() icon = 'icon-archive';

  @Input() title = 'Nothing here yet';

  @Input() body = '';

  /** Optional CTA button */
  @Input() ctaLabel = '';
  @Output() cta = new EventEmitter<void>();

  onCta(): void {
    this.cta.emit();
  }
}