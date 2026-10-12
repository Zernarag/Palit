import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { IconComponent } from '../components/icon/icon.component';
import { USER } from '../data/content';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, IonContent, IconComponent],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  readonly user = USER;

  constructor(private readonly router: Router) {}

  logout(): void { this.router.navigateByUrl('/login', { replaceUrl: true }); }
}