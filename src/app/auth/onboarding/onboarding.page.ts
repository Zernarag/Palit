import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

interface Slide {
  icon: string;   // SVG symbol id
  title: string;
  body: string;
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
      icon: 'icon-shopping-bag',
      title: 'Discover Local Finds',
      body: 'Thousands of products from trusted sellers near you, all in one app.',
    },
    {
      icon: 'icon-bolt',
      title: 'Flash Deals Daily',
      body: 'Grab limited-time discounts before they run out — new drops every day.',
    },
    {
      icon: 'icon-truck',
      title: 'Fast, Tracked Delivery',
      body: 'Watch your order move from packed to your doorstep in real time.',
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