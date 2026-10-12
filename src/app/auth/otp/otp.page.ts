import { Component, inject, OnInit, OnDestroy, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { BackNavigationService } from '../../data/navigation';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent],
})
export class OtpPage implements OnInit, OnDestroy {
  private readonly backNavigation = inject(BackNavigationService);
  digits: string[] = ['', '', '', '', '', ''];
  secondsLeft = 28;
  isPasswordReset = false;
  private timer: any;

  @ViewChildren('otpBox') otpBoxes!: QueryList<ElementRef<HTMLInputElement>>;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.isPasswordReset = this.route.snapshot.queryParamMap.get('flow') === 'reset';
  }

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  startTimer(): void {
    this.secondsLeft = 28;
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.secondsLeft > 0) this.secondsLeft--;
      else clearInterval(this.timer);
    }, 1000);
  }

  get timerLabel(): string {
    const m = String(Math.floor(this.secondsLeft / 60)).padStart(2, '0');
    const s = String(this.secondsLeft % 60).padStart(2, '0');
    return `${m}:${s}`;
  }

  onInput(i: number, event: any): void {
    const val = (event.target.value || '').replace(/\D/g, '').slice(-1);
    this.digits[i] = val;
    event.target.value = val;

    if (val && i < 5) {
      const boxes = this.otpBoxes.toArray();
      boxes[i + 1].nativeElement.focus();
    }
  }

  onKeyDown(i: number, event: KeyboardEvent): void {
    if (event.key === 'Backspace' && !this.digits[i] && i > 0) {
      const boxes = this.otpBoxes.toArray();
      boxes[i - 1].nativeElement.focus();
    }
  }

  resend(): void {
    if (this.secondsLeft > 0) return;
    this.startTimer();
  }

  verify(): void {
    // Prototype: accept any input
    this.router.navigateByUrl(this.isPasswordReset ? '/login' : '/home', { replaceUrl: true });
  }

  changeMobile(): void {
    this.router.navigateByUrl(this.isPasswordReset ? '/forgot-password' : '/signup');
  }

  back(): void {
    this.backNavigation.back(this.isPasswordReset ? '/forgot-password' : '/signup');
  }
}