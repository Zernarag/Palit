import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BackNavigationService } from '../../data/navigation';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: 'signup.page.html',
  styleUrls: ['signup.page.scss'],
})
export class SignupPage {
  private readonly backNavigation = inject(BackNavigationService);
  fullName = '';
  mobile = '';
  email = '';
  password = '';
  agree = true;
  submitting = false;

  constructor(private router: Router) {}

  goBack(): void { this.backNavigation.back('/login'); }

  createAccount(): void {
    if (this.submitting) return;
    this.submitting = true;
    // Simulate account creation — swap with real API.
    setTimeout(() => {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    }, 600);
  }
}