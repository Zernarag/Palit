import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  imports: [IonContent, CommonModule, FormsModule]
})
export class SplashPage implements OnInit {

  private readonly router = inject(Router);

  ngOnInit() {
    setTimeout(() => this.router.navigateByUrl('/onboarding', { replaceUrl: true }), 1800);
  }

}
