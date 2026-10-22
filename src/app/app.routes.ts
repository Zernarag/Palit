import { Routes } from '@angular/router';
import { TABS_ROUTES } from './tabs/tabs.routes';

export const routes: Routes = [
  // ---------- AUTH ----------
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  { path: 'splash',           loadComponent: () => import('./auth/splash/splash.page').then(m => m.SplashPage) },
  { path: 'onboarding',       loadComponent: () => import('./auth/onboarding/onboarding.page').then(m => m.OnboardingPage) },
  { path: 'login',            loadComponent: () => import('./auth/login/login.page').then(m => m.LoginPage) },
  { path: 'signup',           loadComponent: () => import('./auth/signup/signup.page').then(m => m.SignupPage) },
  { path: 'otp',              loadComponent: () => import('./auth/otp/otp.page').then(m => m.OtpPage) },
  { path: 'forgot-password',  loadComponent: () => import('./auth/forgot-password/forgot-password.page').then(m => m.ForgotPasswordPage) },

  // ---------- TABS (main app shell) ----------
  { path: 'home',             redirectTo: 'tabs/home', pathMatch: 'full' },
  { path: 'messages',         redirectTo: 'tabs/messages', pathMatch: 'full' },
  { path: 'profile',          redirectTo: 'tabs/profile', pathMatch: 'full' },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then(m => m.TabsPage),
    children: TABS_ROUTES,
  },

  // ---------- SHOP ----------
  { path: 'categories',                     loadComponent: () => import('./shop/categories/categories.page').then(m => m.CategoriesPage) },
  { path: 'product-listing/:categoryId',    loadComponent: () => import('./shop/product-listing/product-listing.page').then(m => m.ProductListingPage) },
  { path: 'product/:id',                    loadComponent: () => import('./shop/product-detail/product-detail.page').then(m => m.ProductDetailPage) },
  { path: 'product-detail/:id',             redirectTo: 'product/:id' },
  { path: 'flash-sale',                     loadComponent: () => import('./shop/flash-sale/flash-sale.page').then(m => m.FlashSalePage) },
  { path: 'reviews/:productId',             loadComponent: () => import('./shop/reviews/reviews.page').then(m => m.ReviewsPage) },
  { path: 'search',                         loadComponent: () => import('./shop/search/search.page').then(m => m.SearchPage) },
  { path: 'search-results',                 loadComponent: () => import('./shop/search-results/search-results.page').then(m => m.SearchResultsPage) },
  { path: 'wishlist',                       loadComponent: () => import('./shop/wishlist/wishlist.page').then(m => m.WishlistPage) },
  { path: 'swap-create/product/:productId',  loadComponent: () => import('./swap/swap-create/swap-create.page').then(m => m.SwapCreatePage) },
  { path: 'swap-create/from-swaps',          loadComponent: () => import('./swap/swap-create/swap-create.page').then(m => m.SwapCreatePage) },
  { path: 'swap-create/from-profile',        loadComponent: () => import('./swap/swap-create/swap-create.page').then(m => m.SwapCreatePage) },
  { path: 'swaps/from-profile',              loadComponent: () => import('./swap/swap-requests/swap-requests.page').then(m => m.SwapRequestsPage) },
  { path: 'swaps',                           loadComponent: () => import('./swap/swap-requests/swap-requests.page').then(m => m.SwapRequestsPage) },

  // ---------- AUCTION ----------
  { path: 'auction-detail/:id',             loadComponent: () => import('./auction/auction-detail/auction-detail.page').then(m => m.AuctionDetailPage) },

  // ---------- CHECKOUT ----------
  { path: 'cart',                           loadComponent: () => import('./checkout/cart/cart.page').then(m => m.CartPage) },
  { path: 'coupons',                        loadComponent: () => import('./checkout/coupons/coupons.page').then(m => m.CouponsPage) },
  { path: 'address',                        loadComponent: () => import('./checkout/address/address.page').then(m => m.AddressPage) },
  { path: 'delivery-options',               loadComponent: () => import('./checkout/delivery-options/delivery-options.page').then(m => m.DeliveryOptionsPage) },
  { path: 'payment-method',                 loadComponent: () => import('./checkout/payment-method/payment-method.page').then(m => m.PaymentMethodPage) },
  { path: 'checkout',                       loadComponent: () => import('./checkout/checkout/checkout.page').then(m => m.CheckoutPage) },
  { path: 'payment-confirmation',           loadComponent: () => import('./checkout/payment-confirmation/payment-confirmation.page').then(m => m.PaymentConfirmationPage) },
  { path: 'order-confirmation',             loadComponent: () => import('./checkout/order-confirmation/order-confirmation.page').then(m => m.OrderConfirmationPage) },

  // ---------- ORDERS ----------
  { path: 'order-tracking/:orderId',        loadComponent: () => import('./orders/order-tracking/order-tracking.page').then(m => m.OrderTrackingPage) },
  { path: 'order-history',                  loadComponent: () => import('./orders/order-history/order-history.page').then(m => m.OrderHistoryPage) },
  { path: 'order-details/:orderId',         loadComponent: () => import('./orders/order-details/order-details.page').then(m => m.OrderDetailsPage) },

  // ---------- MESSAGES ----------
  { path: 'notifications',                  loadComponent: () => import('./profile/profile-tool.page').then(m => m.ProfileToolPage), data: { screen: 'notifications' } },
  { path: 'edit-profile',                   loadComponent: () => import('./profile/profile-tool.page').then(m => m.ProfileToolPage), data: { screen: 'edit-profile' } },
  { path: 'chat/:conversationId',           loadComponent: () => import('./messages/chat/chat.page').then(m => m.ChatPage) },

  // ---------- PROFILE SUB-PAGES ----------
  { path: 'settings',                       loadComponent: () => import('./profile/profile-tool.page').then(m => m.ProfileToolPage), data: { screen: 'settings' } },
  { path: 'rewards',                        loadComponent: () => import('./profile/profile-tool.page').then(m => m.ProfileToolPage), data: { screen: 'rewards' } },
  { path: 'help-center',                    loadComponent: () => import('./profile/profile-tool.page').then(m => m.ProfileToolPage), data: { screen: 'help-center' } },

  { path: '**', redirectTo: 'splash' },
];