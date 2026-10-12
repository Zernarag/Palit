import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { PRODUCTS, Product, SAMPLE_REVIEWS, starStr } from '../../data';
import { BackNavigationService } from '../../data/navigation';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent],
})
export class ReviewsPage implements OnInit {
  private readonly backNavigation = inject(BackNavigationService);
  product!: Product;
  reviews = SAMPLE_REVIEWS;
  starStr = starStr;

  qa = [
    { q: 'Is this authentic / original?', a: 'Yes, all items sold by Palit Official Store are 100% authentic with warranty.' },
    { q: 'Do you ship to Ilocos region?', a: 'Yes! We ship nationwide, including Villasis and nearby areas, in 2-4 business days.' },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('productId');
    this.product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
  }

  back(): void { this.backNavigation.back(`/product-detail/${this.product.id}`); }
}