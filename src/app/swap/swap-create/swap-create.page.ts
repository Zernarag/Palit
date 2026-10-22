import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { addSwapRequest, CURRENT_USER, LISTING_SELLER } from '../../data/swaps';
import { PRODUCTS, Product } from '../../data/products';
import { BackNavigationService } from '../../data/navigation';

@Component({
	selector: 'app-swap-create',
	templateUrl: './swap-create.page.html',
	styleUrls: ['./swap-create.page.scss'],
	standalone: true,
	imports: [CommonModule, FormsModule, IonContent],
})
export class SwapCreatePage implements OnInit {
	private readonly backNavigation = inject(BackNavigationService);
	readonly products = PRODUCTS.filter((product) => product.swapAvailable);
	requestedProductId = '';
	title = '';
	description = '';
	terms = '';
	photos: string[] = [];
	readonly maxPhotos = 4;

	constructor(private route: ActivatedRoute, private router: Router) {}

	ngOnInit(): void {
		const productId = this.route.snapshot.paramMap.get('productId');
		if (productId && this.products.some((product) => product.id === productId)) {
			this.requestedProductId = productId;
		}
	}

	get requestedProduct(): Product | undefined {
		return this.products.find((product) => product.id === this.requestedProductId);
	}

	get isProductTargetFixed(): boolean {
		return !!this.route.snapshot.paramMap.get('productId') && !!this.requestedProduct;
	}

	get canSubmit(): boolean {
		return !!this.requestedProduct && !!this.title.trim() && !!this.description.trim();
	}

	onPhotosSelected(event: Event): void {
		const input = event.target as HTMLInputElement;
		const files = input.files ? Array.from(input.files) : [];
		const remaining = this.maxPhotos - this.photos.length;

		files
			.filter((file) => file.type.startsWith('image/'))
			.slice(0, remaining)
			.forEach((file) => {
				const reader = new FileReader();
				reader.onload = () => {
					if (typeof reader.result === 'string') {
						this.photos = [...this.photos, reader.result];
					}
				};
				reader.readAsDataURL(file);
			});

		input.value = '';
	}

	removePhoto(index: number): void {
		this.photos = this.photos.filter((_, photoIndex) => photoIndex !== index);
	}

	submit(): void {
		const product = this.requestedProduct;
		if (!product || !this.canSubmit) return;

		addSwapRequest({
			offeredItemId: 'swap-item-' + Date.now(),
			requestedItemId: product.id,
			photos: this.photos,
			title: this.title.trim(),
			description: this.description.trim(),
			terms: this.terms.trim(),
			requestedBy: CURRENT_USER,
			offeredBy: LISTING_SELLER,
		});

		this.router.navigateByUrl('/swaps');
	}

	cancel(): void {
		this.back();
	}

	back(): void {
		const routePath = this.route.snapshot.routeConfig?.path;
		const productId = this.route.snapshot.paramMap.get('productId');
		const fallbackUrl = routePath === 'swap-create/from-profile'
			? '/tabs/profile'
			: productId
				? `/product/${productId}`
				: '/swaps';
		this.backNavigation.back(fallbackUrl);
	}
}
