import { Routes } from '@angular/router';

export const TABS_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('../shop/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'auction',
    loadComponent: () =>
      import('../auction/auction-list/auction-list.page').then(
        (m) => m.AuctionListPage
      ),
  },
  {
    path: 'upload',
    loadComponent: () =>
      import('../upload/upload.page').then((m) => m.UploadPage),
  },
  {
    path: 'messages',
    loadComponent: () =>
      import('../messages/messages-list/messages-list.page').then(
        (m) => m.MessagesListPage
      ),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('../profile/profile.page').then((m) => m.ProfilePage),
  },
];