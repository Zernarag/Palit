import { Component, HostBinding } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { IonApp, IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  @HostBinding('class.app-main-ui') isMainUi = false;

  constructor(router: Router) {
    this.updateMainUi(router.url);
    router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.updateMainUi(event.urlAfterRedirects));
  }

  private updateMainUi(url: string): void {
    const path = url.split(/[?#]/, 1)[0];
    this.isMainUi = !/^\/(splash|onboarding|login|signup|otp|forgot-password)(\/|$)/.test(path);
  }
}
