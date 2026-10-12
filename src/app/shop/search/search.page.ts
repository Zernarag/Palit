import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { BackNavigationService } from '../../data/navigation';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent],
})
export class SearchPage {
  private readonly backNavigation = inject(BackNavigationService);
  query = '';
  recent = ['earbuds', 'tote bag', 'vitamin c serum', 'running shoes'];
  trending = [
    'wireless earbuds',
    'tote bag',
    'vitamin c serum',
    'desk lamp',
    'running shoes',
    'ceramic mug set',
  ];

  constructor(private router: Router) {}

  onEnter(): void {
    const q = this.query.trim();
    if (!q) return;
    this.router.navigate(['/search-results'], { queryParams: { q } });
  }

  runSearch(q: string): void {
    this.router.navigate(['/search-results'], { queryParams: { q } });
  }

  clearRecent(): void { this.recent = []; }

  back(): void { this.backNavigation.back('/tabs/home'); }
  goTo(path: string): void { this.router.navigate([path]); }
}