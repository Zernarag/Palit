import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { BackNavigationService } from '../../data/navigation';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent],
})
export class ForgotPasswordPage {
  private readonly backNavigation = inject(BackNavigationService);
  email = '';

  constructor(private router: Router) {}

  back(): void {
    this.backNavigation.back('/login');
  }

  sendReset(): void {
    this.router.navigate(['/otp'], { queryParams: { flow: 'reset' } });
  }
}