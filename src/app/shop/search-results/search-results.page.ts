import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { WishlistService } from '../../data/wishlist';
import { PRODUCTS, Product, formatPrice, starStr } from '../../data';
import { BackNavigationService } from '../../data/navigation';

interface SortMode { id: string; label: string; fn: (a: Product, b: Product) => number; }

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.page.html',
  styleUrls: ['./search-results.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent],
})
export class SearchResultsPage implements OnInit {
  private readonly backNavigation = inject(BackNavigationService);
  query = 'earbuds';
  results: Product[] = [];
  sortMode = 'popular';
  showFilters = false;

  filterMinPrice: number | null = null;
  filterMaxPrice: number | null = null;
  filterMinRating = 0;

  minPriceInput: number | null = null;
  maxPriceInput: number | null = null;

  sortModes: SortMode[] = [
    { id: 'popular',    label: 'Popular',             fn: (a, b) => b.sold - a.sold },
    { id: 'newest',     label: 'Newest',              fn: (a, b) => (b.id > a.id ? 1 : -1) },
    { id: 'price-asc',  label: 'Price: Low to High',  fn: (a, b) => a.price - b.price },
    { id: 'price-desc', label: 'Price: High to Low',  fn: (a, b) => b.price - a.price },
    { id: 'rating',     label: 'Top Rated',           fn: (a, b) => b.rating - a.rating },
  ];

  formatPrice = formatPrice;
  starStr = starStr;

  constructor(private route: ActivatedRoute, private router: Router, private wishlist: WishlistService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.query = params['q'] || 'earbuds';
      this.applySearch();
    });
  }

  get currentSort(): SortMode {
    return this.sortModes.find((m) => m.id === this.sortMode) || this.sortModes[0];
  }

  get activeFilterCount(): number {
    let n = 0;
    if (this.filterMinPrice !== null) n++;
    if (this.filterMaxPrice !== null) n++;
    if (this.filterMinRating > 0) n++;
    return n;
  }

  applySearch(): void {
    const q = this.query.toLowerCase();
    let list = PRODUCTS.filter((p) => p.name.toLowerCase().includes(q) || p.cat.includes(q));
    if (!list.length) list = PRODUCTS.filter((p) => p.rating >= 4.7).slice(0, 6);

    if (this.filterMinPrice !== null) list = list.filter((p) => p.price >= this.filterMinPrice!);
    if (this.filterMaxPrice !== null) list = list.filter((p) => p.price <= this.filterMaxPrice!);
    if (this.filterMinRating > 0) list = list.filter((p) => p.rating >= this.filterMinRating);

    list = [...list].sort(this.currentSort.fn);
    this.results = list;
  }

  cycleSort(): void {
    const idx = this.sortModes.findIndex((m) => m.id === this.sortMode);
    this.sortMode = this.sortModes[(idx + 1) % this.sortModes.length].id;
    this.applySearch();
  }

  toggleFilters(): void { this.showFilters = !this.showFilters; }

  setRating(r: number): void {
    this.filterMinRating = this.filterMinRating === r ? 0 : r;
  }

  applyFilters(): void {
    this.filterMinPrice = this.minPriceInput;
    this.filterMaxPrice = this.maxPriceInput;
    this.showFilters = false;
    this.applySearch();
  }

  clearFilters(): void {
    this.filterMinPrice = null;
    this.filterMaxPrice = null;
    this.filterMinRating = 0;
    this.minPriceInput = null;
    this.maxPriceInput = null;
    this.applySearch();
  }

  isWished(id: string): boolean { return this.wishlist.has(id); }
  onHeart(id: string, e: Event): void { e.stopPropagation(); this.wishlist.toggle(id); }

  openProduct(id: string): void { this.router.navigate(['/product-detail', id]); }
  goTo(path: string): void { this.router.navigate([path]); }
  back(): void { this.backNavigation.back('/search'); }
}