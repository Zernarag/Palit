import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

/** When the exit fade starts / when we navigate (ms). Must match splash.page.scss timeline. */
const EXIT_AT = 3000;
const NAVIGATE_AT = 3320;
const REDUCED_EXIT_AT = 1000;
const REDUCED_NAVIGATE_AT = 1200;

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  imports: [IonContent, CommonModule, FormsModule]
})
export class SplashPage implements OnInit, OnDestroy {

  private readonly router = inject(Router);
  private timers: ReturnType<typeof setTimeout>[] = [];

  /** Triggers the fade-out just before navigating away. */
  leaving = false;

  ngOnInit() {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    this.timers.push(
      setTimeout(() => (this.leaving = true), reduced ? REDUCED_EXIT_AT : EXIT_AT),
      setTimeout(() => this.go(), reduced ? REDUCED_NAVIGATE_AT : NAVIGATE_AT),
    );
  }

  /** Tap anywhere to skip. */
  skip(): void {
    this.leaving = true;
    this.clearTimers();
    this.timers.push(setTimeout(() => this.go(), 250));
  }

  ngOnDestroy(): void { this.clearTimers(); }

  private go(): void {
    this.router.navigateByUrl('/onboarding', { replaceUrl: true });
  }

  private clearTimers(): void {
    this.timers.forEach(clearTimeout);
    this.timers = [];
  }
}
