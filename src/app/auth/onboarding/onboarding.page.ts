import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

interface Slide {
  image: string;
  secondaryImage: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  body: string;
  badge: string;
}

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent],
})
export class OnboardingPage {
  slides: Slide[] = [
    {
      image: 'assets/items/p1.jpg',
      secondaryImage: 'assets/items/p6.jpg',
      imageAlt: 'Wireless headphones from a local marketplace listing',
      eyebrow: 'NEARBY FINDS',
      title: 'Discover Local Finds',
      body: 'Thousands of products from trusted sellers near you, all in one app.',
      badge: 'Made for your neighborhood',
    },
    {
      image: 'assets/items/p16.jpg',
      secondaryImage: 'assets/items/p3.jpg',
      imageAlt: 'Pink running shoe from a limited-time product deal',
      eyebrow: 'LIMITED-TIME DEALS',
      title: 'Good finds. Better prices.',
      body: 'Grab limited-time discounts before they run out — new drops every day.',
      badge: 'Fresh deals, every day',
    },
    {
      image: 'assets/items/p5.jpg',
      secondaryImage: 'assets/items/p9.jpg',
      imageAlt: 'Crossbody bag available from a local seller',
      eyebrow: 'FROM SELLER TO DOORSTEP',
      title: 'Shop nearby. Track every step.',
      body: 'Watch your order move from packed to your doorstep in real time.',
      badge: 'Delivery updates included',
    },
  ];

  index = 0;

  constructor(private router: Router) {}

  get isLast(): boolean {
    return this.index === this.slides.length - 1;
  }

  next(): void {
    if (!this.isLast) {
      this.index++;
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  skip(): void {
    this.router.navigateByUrl('/login');
  }

  goto(i: number): void {
    this.index = i;
  }
}