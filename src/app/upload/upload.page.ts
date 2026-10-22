import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { CATEGORIES, PRODUCTS, VARIANTS_BY_CAT, Product } from '../data/products';
import { AUCTIONS, AUCTION_CATEGORIES } from '../data/auctions';

type ListingType = 'fixed' | 'auction';

interface UploadDraft {
  type: ListingType;
  photos: string[];
  title: string;
  category: string;
  condition: string;
  description: string;

  /* Fixed price */
  price: number | null;
  quantity: number;

  /* Auction */
  startingBid: number | null;
  reserve: number | null;
  durationDays: number;
  enableBuyNow: boolean;

  /* Shared */
  pickupOnly: boolean;
  openForSwap: boolean;
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent],
})
export class UploadPage {
  categories = CATEGORIES;

  conditions = [
    'Brand New',
    'Like New',
    'Used — Good',
    'Used — Fair',
    'For Parts / Not Working',
  ];

  durations = [
    { value: 1, label: '1 day' },
    { value: 3, label: '3 days' },
    { value: 5, label: '5 days' },
    { value: 7, label: '7 days' },
  ];

  draft: UploadDraft = {
    type: 'fixed',
    photos: [],
    title: '',
    category: 'electronics',
    condition: 'Used — Good',
    description: '',
    price: null,
    quantity: 1,
    startingBid: null,
    reserve: null,
    durationDays: 3,
    enableBuyNow: false,
    pickupOnly: false,
    openForSwap: false,
  };

  MAX_PHOTOS = 4;

  constructor(private router: Router) {}

  ionViewWillEnter(): void {
    /* Reset back to a clean form each time the tab is opened. */
    this.resetDraft();
  }

  /* ==================== LISTING TYPE ==================== */
  setType(type: ListingType): void {
    this.draft.type = type;
  }

  get typeHint(): string {
    if (this.draft.type === 'fixed')
      return 'Sell instantly at a set price — appears on Home & Search.';
    if (this.draft.type === 'auction')
      return 'Buyers bid over a set duration — appears in the Auction tab.';
    return 'Buyers bid over a set duration — appears in the Auction tab.';
  }

  /* ==================== PHOTOS ==================== */
  onPhotosSelected(event: any): void {
    const files: FileList = event.target.files;
    if (!files || !files.length) return;

    const remaining = this.MAX_PHOTOS - this.draft.photos.length;
    const selected = Array.from(files).slice(0, remaining);

    let pending = selected.length;
    selected.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.draft.photos.push(e.target.result);
        pending--;
      };
      reader.onerror = () => { pending--; };
      reader.readAsDataURL(file);
    });

    /* Clear the input so the same file can be picked again later. */
    event.target.value = '';
  }

  removePhoto(i: number, e: Event): void {
    e.stopPropagation();
    this.draft.photos.splice(i, 1);
  }

  get emptyPhotoSlots(): number[] {
    const remaining = this.MAX_PHOTOS - this.draft.photos.length;
    return Array.from({ length: Math.max(0, remaining) }, (_, i) => i);
  }

  /* ==================== SUBMIT ==================== */
  get canSubmit(): boolean {
    if (!this.draft.title.trim() || !this.draft.photos.length) return false;

    if (this.draft.type === 'fixed') {
      return !!this.draft.price && this.draft.price > 0 &&
        Number.isInteger(this.draft.quantity) && this.draft.quantity > 0;
    }

    return !!this.draft.startingBid && this.draft.startingBid > 0;
  }

  submit(): void {
    if (!this.draft.title.trim()) return;
    if (!this.draft.photos.length) return;

    if (this.draft.type === 'fixed') {
      this.submitFixed();
    } else {
      this.submitAuction();
    }
  }

  private submitFixed(): void {
    if (
      !this.draft.photos.length ||
      !this.draft.price ||
      this.draft.price <= 0 ||
      !Number.isInteger(this.draft.quantity) ||
      this.draft.quantity <= 0
    ) return;

    const id = 'p' + Date.now();
    PRODUCTS.unshift({
      id,
      name: this.draft.title,
      cat: this.draft.category,
      price: this.draft.price,
      rating: 5.0,
      reviews: 0,
      sold: 0,
      stock: this.draft.quantity,
      badge: { cls: 'badge-new', txt: 'NEW' },
      desc: this.draft.description || 'No description provided.',
      mall: false,
      swapAvailable: this.draft.openForSwap,
      img: this.draft.photos[0],
      variants: VARIANTS_BY_CAT[this.draft.category] || ['Standard'],
    });

    this.resetDraft();
    this.router.navigateByUrl('/tabs/home');
  }

  private submitAuction(): void {
    if (!this.draft.photos.length || !this.draft.startingBid || this.draft.startingBid <= 0) return;

    const id = 'a' + Date.now();
    const catOk = AUCTION_CATEGORIES.some((c) => c.id === this.draft.category);

    AUCTIONS.unshift({
      id,
      name: this.draft.title,
      cat: catOk ? this.draft.category : 'home',
      condition: this.draft.condition,
      store: 'Your Listing — Pending Verification',
      startingBid: this.draft.startingBid,
      reserve: this.draft.reserve || 0,
      reserveMet: !this.draft.reserve,
      buyNow: this.draft.enableBuyNow ? Math.round(this.draft.startingBid * 4) : null,
      endTime: Date.now() + this.draft.durationDays * 86400e3,
      bids: [],
      currentBid: this.draft.startingBid,
      bidCount: 0,
      desc: this.draft.description || 'No description provided.',
      img: this.draft.photos[0],
    });

    this.resetDraft();
    this.router.navigateByUrl('/tabs/auction');
  }

  /* ==================== RESET ==================== */
  resetDraft(): void {
    this.draft = {
      type: 'fixed',
      photos: [],
      title: '',
      category: 'electronics',
      condition: 'Used — Good',
      description: '',
      price: null,
      quantity: 1,
      startingBid: null,
      reserve: null,
      durationDays: 3,
      enableBuyNow: false,
      pickupOnly: false,
      openForSwap: false,
    };
  }
}