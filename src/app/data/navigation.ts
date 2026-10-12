import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class BackNavigationService {
  constructor(private readonly location: Location, private readonly router: Router) {}

  back(fallbackUrl: string): void {
    const state = this.location.getState() as { navigationId?: number } | null;
    if (typeof state?.navigationId === 'number' && state.navigationId > 1) {
      this.location.back();
      return;
    }
    void this.router.navigateByUrl(fallbackUrl);
  }
}