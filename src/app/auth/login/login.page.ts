import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  email = '';
  password = '';
  remember = true;
  showPassword = false;
  submitting = false;

  constructor(private router: Router) {}

  togglePassword(): void { this.showPassword = !this.showPassword; }

  doLogin(): void { 
    if (this.submitting) return;
    this.submitting = true;
    setTimeout(() => {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    }, 500);
  }

  loginWith(provider: 'google' | 'facebook'): void {
    console.log('Login with', provider);
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }
}