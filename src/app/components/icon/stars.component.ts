import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconComponent } from './icon.component';

/** Five SVG stars, filled up to the rounded rating. */
@Component({
  selector: 'app-stars',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `@for (n of [1, 2, 3, 4, 5]; track n) { <app-icon name="star" [filled]="n <= filled" /> }`,
  styles: [`:host { display: inline-flex; gap: 1px; color: var(--star); font-size: 12px; vertical-align: middle; }`],
  host: { role: 'img', '[attr.aria-label]': '"Rated " + rating + " out of 5"' },
})
export class StarsComponent {
  @Input() rating = 0;
  get filled(): number { return Math.round(this.rating); }
}
